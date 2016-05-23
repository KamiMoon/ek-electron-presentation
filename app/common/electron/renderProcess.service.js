/**
    Eric Kizaki, 2016
    AngularJS wrapper service over Electron render process.

    Requires that the main process has code to respond to these events.
    See main.js.
**/
(function() {
    'use strict';

    //Electron imports - requires Electron!
    const ipc = require('electron').ipcRenderer;

    angular.module('ek-angular-electron', []);

    angular.module('ek-angular-electron').service('RenderProcess', function() {

    this.openWindow = function(options) {
        ipc.send('openWindow', options);
    };

    this.broadcastToAllWindows = function(key, value) {
        ipc.send('broadcastToAllWindows', key, value);
    };

    this.on = function(event, callback) {
        ipc.on(event, callback);
    };
});


})();