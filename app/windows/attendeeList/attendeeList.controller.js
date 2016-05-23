(function() {
    'use strict';

    angular.module('exampleApp').controller('AttendeeListController', function(RenderProcess) {
        var vm = this;
        vm.attendeeList = [];

        vm.remove = function(index, name) {
            vm.attendeeList.splice(index, 1);

            RenderProcess.broadcastToAllWindows('attendeeList-removed', name);
        };

        vm.handleDrop = function(name) {

            if (!_.some(vm.attendeeList, { name: name })) {
                vm.attendeeList.push({
                    name: name
                });
                RenderProcess.broadcastToAllWindows('attendeeList-registered', name);
            }

        };
    });

})();
