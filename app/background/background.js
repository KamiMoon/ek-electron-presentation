/**
	Eric Kizaki

	Background tasks to run such as open a Database, spawns Web Worker etc.

	We do not want these tasks to be kickoffed after each window opening.
	Also it has nothing to do with AngularJS or other UI windows.
	We want these to only run once when the app starts.
**/
(function() {
    'use strict';

    var databaseWorker = new Worker("./database/database.worker.js");

    databaseWorker.onmessage = function(event) {
        console.log('Message received from worker: ' + event.data);

    };

    databaseWorker.postMessage(['Hello World']);

})();
