/*globals document, window, Blockly, qwest, console*/
(function () {
    'use strict';
    var workspace,
        guiId = "gui-id";

    function byId(id) {
        return document.getElementById(id);
    }

    function getInputText(id) {
        return byId(id).value;
    }

    function getHost() {
        return getInputText("conf-host");
    }

    function getPort() {
        return parseInt(getInputText("conf-port"), 10);
    }

    function sendCommand(command) {
        return qwest.post('/cmd', command , {dataType: 'json'})
            .then(function(xhr, response) {
                console.log(response);
            })
            .catch(function(e, xhr, response) {
                console.error(e, response);
            }); 
    }

    function runCode() {
        var code = Blockly.JavaScript.workspaceToCode(workspace),
            host = getHost(),
            port = getPort();

        if (port !== port) {
            window.alert("Invalid port value");
            return;
        }

        return sendCommand({type: "/run-code", code: code,
                           host: host, port: port, id: guiId});
    }

    function stopAll() {
        var host = getHost(),
            port = getPort();

        if (port !== port) {
            window.alert("Invalid port value");
            return;
        }

        return sendCommand({type: "/stop-all-jobs",
                           host: host, port: port, id: guiId});
    }

    function init() {
        var wsId = 'blocklyDiv',
            cont = byId(wsId),
            runBtn = byId('run-code'),
            stopBtn = byId('stop-all'),
            toolbox = byId('toolbox');

        workspace = Blockly.inject(wsId, {media: './media/', toolbox: toolbox});
        cont.style.height = (window.innerHeight - 100) + "px";

        runBtn.addEventListener('click', runCode);
        stopBtn.addEventListener('click', stopAll);
    }

    init();
}());
