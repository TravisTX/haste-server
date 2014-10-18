'use strict';

pasteApp.controller('PasteController',
    ['$scope', '$log', '$state', '$stateParams', '$location', '$anchorScroll', '$timeout', 'PasteService',
    function ($scope, $log, $state, $stateParams, $location, $anchorScroll, $timeout, PasteService) {
        var self = this;
        $scope.paste = {};
        $scope.paste.isNew = true;
        $scope.paste.pasteKey = $stateParams.pasteKey;
        $scope.paste.pasteFormat = $stateParams.format;
        $scope.paste.pasteContent = "";
        $scope.paste.location = $location;
        
        self.Init = function () {
            $anchorScroll.yOffset = 100;   // always scroll by 100 extra pixels
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
                    $timeout(function() {
                        $scope.paste.AutoScroll();
                    });
                });
            }
        };
        
        $scope.paste.AutoScroll = function() {
            $anchorScroll();
        };
        
        $scope.paste.SavePaste = function() {
            PasteService.SavePaste($scope.paste.pasteContent)
            .then(function (data) {
                $state.go('paste', {'pasteKey': data.key, 'format': $scope.paste.pasteFormat});
            });
        };
        
        $scope.paste.ClickLineNumber = function(lineNumber) {
            var newHash = 'L' + lineNumber;
            if ($location.hash() !== newHash) {
              // set the $location.hash to `newHash` and
              // $anchorScroll will automatically scroll to it
              $location.hash(newHash);
            } else {
              // call $anchorScroll() explicitly,
              // since $location.hash hasn't changed
              $anchorScroll();
            }
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