'use strict';

cbApp.controller('LoginController',
    ['$scope', '$log', 'CurrentUserService', '$state', 'ToastrService', 'SettingsService',
function LoginController($scope, $log, CurrentUserService, $state, ToastrService, SettingsService) {
        $scope.login = {};
        $scope.username = '';
        $scope.password = '';
        $scope.loginPromise = null;
        $scope.login.loginFailed = false;
        $scope.login.focus = true;

        $scope.LoginUser = function () {
            $scope.login.loginFailed = false;
            $scope.loginPromise = $scope.Login($scope.username, $scope.password)
                .then(function () {
                    $scope.Redirect();
                })
                .catch(function (data) {
                    $scope.login.loginFailed = true;
                });
        };


        $scope.Init = function () {
            if (CurrentUserService.State.IsAuthenticated) {
                $scope.Redirect();
            } else {
                $state.reload();
            }
        };

        $scope.Redirect = function () {
            if (CurrentUserService.Redirect &&
            (!CurrentUserService.Redirect.forUser || CurrentUserService.Redirect.forUser == CurrentUserService.State.CurrentUser.DisplayName)) {
                var name = CurrentUserService.Redirect.state.name;
                var params = CurrentUserService.Redirect.params;
                CurrentUserService.Redirect = undefined;

                $state.go(name, params);
                return;
            }
            $state.go(SettingsService.Settings.CustomLandingPage || 'calendar');
        };

        $scope.Init();
    }]
);