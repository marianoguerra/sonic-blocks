from PyQt5.QtCore import QUrl, QTimer, QIODevice
from PyQt5.QtWidgets import QApplication
from PyQt5.QtNetwork import (QNetworkAccessManager,
                             QNetworkReply,
                             QNetworkRequest)
from PyQt5.QtWebKitWidgets import QWebView
from PyQt5 import QtWebKit

from pythonosc import osc_message_builder
from pythonosc import udp_client

import os
import sys
import json
import time
import mimetypes
from io import StringIO

class NetworkAccessManager(QNetworkAccessManager):

    def __init__(self, parent=None):
        super().__init__(parent=parent)

    def createRequest(self, operation, request, device):
        if request.url().scheme() == 'http':
            return Reply(self, operation, request, device)
        return super().createRequest(operation, request, device)

class Reply(QNetworkReply):

    def __init__(self, parent, operation, request, device):
        super().__init__(parent=parent)
        self.setRequest(request)
        self.setOperation(operation)
        self.setUrl(request.url())
        self.bytes_read = 0
        self.content = b''
        self.device = device

        # give webkit time to connect to the finished and readyRead signals
        QTimer.singleShot(200, self.load_content)

    def load_content(self):
        _base_path = 'apps/sbs/priv/assets'
        file_path = self.request().url().path()

        if file_path == "/":
            file_path = "/index.html"

        if self.operation() == QNetworkAccessManager.PostOperation:
            data = json.loads(self.device.readAll().data().decode('utf-8'))
            code = data.get('code')
            port = data.get('port')
            host = data.get('host')
            type_ = data.get('type')
            id_ = data.get('id')

            if type_ == '/run-code':
                client = udp_client.UDPClient(host, port)
                msg = osc_message_builder.OscMessageBuilder(address=type_)
                msg.add_arg(id_)
                msg.add_arg(code)
                msg = msg.build()
                client.send(msg)

            self.content = b'{"ok": true}'
            content_type = "application/json"
        else:
            content_type, encoding = mimetypes.guess_type(file_path)
            full_path = _base_path + file_path
            self.content = open(full_path, 'rb').read()

        self.open(QIODevice.ReadOnly | QIODevice.Unbuffered)
        self.setAttribute(QNetworkRequest.HttpStatusCodeAttribute, 200)
        self.setHeader(QNetworkRequest.ContentLengthHeader, len(self.content))
        self.setHeader(QNetworkRequest.ContentTypeHeader, content_type)
        self.readyRead.emit()
        self.finished.emit()

    def abort(self):
        pass

    def isSequential(self):
        return True

    def bytesAvailable(self):
        ba = len(self.content) - self.bytes_read + super().bytesAvailable()
        return ba

    def readData(self, size):
        if self.bytes_read >= len(self.content):
            return None
        data = self.content[self.bytes_read:self.bytes_read + size]
        self.bytes_read += len(data)
        return data

    def manager(self):
        return self.parent()

if __name__ == '__main__':
    app = QApplication(sys.argv)

    gs = QtWebKit.QWebSettings.globalSettings()
    gs.setAttribute(QtWebKit.QWebSettings.PluginsEnabled, True)
    gs.setAttribute(QtWebKit.QWebSettings.JavascriptEnabled, True)
    gs.setAttribute(QtWebKit.QWebSettings.AutoLoadImages, True)
    gs.setAttribute(QtWebKit.QWebSettings.JavascriptCanOpenWindows, True)
    gs.setAttribute(QtWebKit.QWebSettings.DeveloperExtrasEnabled, True)
    gs.setAttribute(QtWebKit.QWebSettings.LocalContentCanAccessRemoteUrls, True)

    wv = QWebView()
    enam = NetworkAccessManager()
    wv.page().setNetworkAccessManager(enam)
    wv.show()
    wv.setUrl(QUrl("http://localhost/"))
    app.exec()
