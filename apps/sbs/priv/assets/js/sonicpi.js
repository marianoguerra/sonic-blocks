/*globals document, window, Blockly, qwest, console*/
(function () {
    'use strict';
    var workspace,
        guiId = "gui-id";

    function byId(id) {
        return document.getElementById(id);
    }

    function toArray(obj) {
        return Array.prototype.slice.call(obj);
    }

    function byClass(cls) {
        return toArray(document.getElementsByClassName(cls));
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

    function show(node) {
        node.style.display = 'block';
    }

    function hide(node) {
        node.style.display = 'none';
    }

    function showId(id) {
        show(byId(id));
    }

    function hideId(id) {
        hide(byId(id));
    }

    function toggleIds(show, hide) {
        hideId(hide);
        showId(show);
    }

    function showClass(cls) {
        byClass(cls).forEach(show);
    }

    function hideClass(cls) {
        byClass(cls).forEach(hide);
    }

    function toggleCode() {
        var code = Blockly.JavaScript.workspaceToCode(workspace),
            codeTa = byId('code-text'),
            codeBtn = byId('show-code');

        if (codeBtn.innerHTML === 'Show Code') {
            hideClass('blocklyToolboxDiv');
            toggleIds('code-area', 'blocklyDiv');
            codeTa.textContent = code;
            codeBtn.innerHTML = "Hide Code";
        } else {
            toggleIds('blocklyDiv', 'code-area');
            showClass('blocklyToolboxDiv');
            codeTa.textContent = '';
            codeBtn.innerHTML = "Show Code";
        }
    }

    function hideCode() {
        var codeBtn = byId('show-code');
    }

    function init() {
        var wsId = 'blocklyDiv',
            taId = 'codeArea',
            cont = byId(wsId),
            runBtn = byId('run-code'),
            stopBtn = byId('stop-all'),
            codeBtn = byId('show-code'),
            toolbox = byId('toolbox');

        workspace = Blockly.inject(wsId, {media: './media/', toolbox: toolbox});
        cont.style.height = (window.innerHeight - 100) + "px";

        runBtn.addEventListener('click', runCode);
        stopBtn.addEventListener('click', stopAll);
        codeBtn.addEventListener('click', toggleCode);
    }

    init();
}());
