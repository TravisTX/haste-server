'use strict';

pasteApp.controller('PasteController',
    ['$scope', '$log', '$state', '$stateParams', 'PasteService',
    function ($scope, $log, $state, $stateParams, PasteService) {
        var self = this;
        $scope.paste = {};
        $scope.paste.isNew = true;
        $scope.paste.pasteKey = $stateParams.pasteKey;
        $scope.paste.pasteFormat = $stateParams.format;
        $scope.paste.pasteContent = "";
        
        self.Init = function () {
            $scope.paste.LoadPaste();
        };
        
        $scope.paste.LoadPaste = function() {
            if ($scope.paste.pasteKey) {
                $scope.paste.isNew = false;
                PasteService.GetPaste($scope.paste.pasteKey)
                .then(function (data) {
                    $scope.paste.pasteData = data;
                    $scope.paste.pasteContent = data.data;
                    $scope.paste.lineCount = data.data.split("\n").length;
                });
            }
        };
        
        $scope.paste.SavePaste = function() {
            PasteService.SavePaste($scope.paste.pasteContent)
            .then(function (data) {
                $log.debug(data);
                $state.go('paste', {'pasteKey': data.key, 'format': $scope.paste.pasteFormat});
            });
        };
        
        $scope.paste.GetNumber = function(num) {
            return new Array(num);   
        };
        
        $scope.$watch('paste.pasteFormat', function(newValue, oldValue) {
            if (!$scope.paste.isNew) {
                $state.go('paste', {'format': newValue});
            }
        });


        self.Init();
    }]
);