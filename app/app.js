(function() {

    'use strict';

    //we can't use HTML5 pushstate naviagation because we have no server
    angular.module('exampleApp', ['ngRoute', 'dragDrop', 'ek-angular-electron'])
        .constant('LINKS', [{
            url: '/userList',
            title: 'Users',
            templateUrl: 'windows/userList/userList.html',
            controller: 'UserListController',
            controllerAs: 'vm',
            width: 200,
            height: 600
        }, {
            url: '/attendeeList',
            title: 'Attendees',
            templateUrl: 'windows/attendeeList/attendeeList.html',
            controller: 'AttendeeListController',
            controllerAs: 'vm',
            width: 400,
            height: 600
        }, {
            url: '/',
            title: 'Home',
            template: '<app></app>',
            width: 800,
            height: 600
        }])
        .config(function($routeProvider, LINKS) {

            LINKS.forEach(link => {
                if (link.url === '/') {
                    $routeProvider.otherwise(link);
                } else {
                    $routeProvider.when(link.url, link);
                }
            });

        });
})();

/* Globals */
function safeApply(scope, fn) {
    (scope.$$phase || scope.$root.$$phase) ? fn(): scope.$apply(fn);
}
