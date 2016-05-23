/**
    Eric Kizaki, 2016
    HTML5 drag and drop based off:
    https://parkji.co.uk/2013/08/11/native-drag-and-drop-in-angularjs.html

    Modified by Eric Kizaki 2016 to NOT appendChild - only pass data
**/
(function() {

    'use strict';


    angular.module('dragDrop', []);

    angular.module('dragDrop').directive('draggable', function() {
        return function(scope, element, attrs) {
            // this gives us the native JS object
            var el = element[0];

            el.draggable = true;

            el.addEventListener(
                'dragstart',
                function(e) {
                    e.dataTransfer.effectAllowed = 'move';

                    e.dataTransfer.setData('text/plain', attrs.draggableData);
                    this.classList.add('drag');
                    return false;
                },
                false
            );

            el.addEventListener(
                'dragend',
                function(e) {
                    this.classList.remove('drag');
                    return false;
                },
                false
            );
        };
    });

    angular.module('dragDrop').directive('droppable', function() {
        return {
            scope: {
                drop: '&'
            },
            link: function(scope, element) {
                // again we need the native object
                var el = element[0];

                el.addEventListener(
                    'dragover',
                    function(e) {
                        e.dataTransfer.dropEffect = 'move';
                        // allows us to drop
                        if (e.preventDefault) e.preventDefault();
                        this.classList.add('over');
                        return false;
                    },
                    false
                );

                el.addEventListener(
                    'dragenter',
                    function(e) {
                        this.classList.add('over');
                        return false;
                    },
                    false
                );

                el.addEventListener(
                    'dragleave',
                    function(e) {
                        this.classList.remove('over');
                        return false;
                    },
                    false
                );

                el.addEventListener(
                    'drop',
                    function(e) {
                        // Stops some browsers from redirecting.
                        if (e.stopPropagation) e.stopPropagation();

                        this.classList.remove('over');

                        //Eric Kizaki 2016 - Removed append child - just give the controller the data

                        //var binId = this.id;

                        var data = e.dataTransfer.getData('text/plain');


                        //var item = document.getElementById(e.dataTransfer.getData('Text'));
                        //this.appendChild(item);

                        // call the passed drop function
                        scope.$apply(function(scope) {
                            var fn = scope.drop();
                            if ('undefined' !== typeof fn) {
                                fn(data);
                            }
                        });

                        return false;
                    },
                    false
                );
            }
        };
    });

})();
