/*globals document, window, Blockly, qwest, console*/
(function () {
    'use strict';
    var workspace;

    function byId(id) {
        return document.getElementById(id);
    }

    function runCode() {
        var code = Blockly.JavaScript.workspaceToCode(workspace),
            guiId = "gui-id",
            host = "localhost",
            port = 4557;

        qwest.post('/cmd',
                   {type: "/run-code", code: code, host: host, port: port, id: guiId},
                   {dataType: 'json'})
        .then(function(xhr, response) {
            console.log(response);
        })
        .catch(function(e, xhr, response) {
            console.error(e, response);
        }); 
    }

    function init() {
        var wsId = 'blocklyDiv',
            cont = byId(wsId),
            runBtn = byId('run-code'),
            toolbox = byId('toolbox');

        workspace = Blockly.inject(wsId, {media: './media/', toolbox: toolbox});
        cont.style.height = (window.innerHeight - 100) + "px";

        runBtn.addEventListener('click', runCode);
    }

    init();
}());
