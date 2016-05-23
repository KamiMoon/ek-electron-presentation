(function() {
    'use strict';

    //we can't use HTML5 pushstate naviagation because we have no server
    angular.module('exampleApp').component('app', {
        templateUrl: 'components/app.html',
        controller: function(LINKS, RenderProcess) {
            this.linkOptions = LINKS;

            this.openWindow = function(linkOptions) {
                RenderProcess.openWindow(linkOptions);
            };
        }
    });

})();
