'use strict';

pasteApp.controller('BaseController',
    ['$scope', '$log', '$location',
    function ($scope, $log, $location) {
        var self = this;
        $scope.base = {};
        //$scope.base.language = '';

        self.Init = function () {
        };

        self.Init();
    }]
);