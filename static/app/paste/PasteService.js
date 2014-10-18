'use strict';

pasteApp.factory('PasteService',
    ['$log', '$http', '$q',
    function ($log, $http, $q) {
        return {
            GetPaste: function (pasteId) {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: "/documents/" + pasteId
                })
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject(data);
                });
                return deferred.promise;            
            },
            
            SavePaste: function (pasteContent) {
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    url: "/documents",
                    data: pasteContent
                })
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject(data);
                });
                return deferred.promise;            
            }
        };
    }]
);