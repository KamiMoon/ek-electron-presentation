(function() {
    'use strict';

    angular.module('exampleApp').controller('UserListController', function($scope, RenderProcess) {
        var vm = this;

        vm.userList = [{
            name: 'Freddy Krueger'
        }, {
            name: 'Michael Myers'
        }, {
            name: 'Jason Voorhees'
        }];

        RenderProcess.on('attendeeList-registered', function(event, name) {

            safeApply($scope, function() {
                _.remove(vm.userList, user => {
                    return user.name === name;
                });
            });

        });

        RenderProcess.on('attendeeList-removed', function(event, name) {
            if (!_.some(vm.userList, { name: name })) {
                safeApply($scope, function() {
                    vm.userList.push({
                        name: name
                    });
                });
            }
        });

    });

})();
