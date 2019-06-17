myApp.factory("$employeeService", ['$http', function ($http) {
    var baseUrl = "/ajax/employee/";

    function getContent(url, onSuccess, onError) {
        return $http({
            method: "GET",
            url: url
        }).then(function (response) {
            if (typeof onSuccess === 'function' && response.data.status === "SUCCESS") {
                onSuccess(response.data);
            } else {
                if (typeof onError === 'function') {

                    if (!response.data) {
                        response.data = {};
                    }

                    if (!response.data.data) {
                        response.data.data = {};
                    }

                    if (!response.data.data.errors) {
                        response.data.data.errors = {};
                    }
                    onError(response.data);
                }
            }

        }, function (response) {
            if (typeof onError === 'function') {

                if (!response.data) {
                    response.data = {};
                }

                if (!response.data.data) {
                    response.data.data = {};
                }

                if (!response.data.data.errors) {
                    response.data.data.errors = {};
                }
                onError(response.data);
            }
        });
    }

    function doAction(url, data, onSuccess, onError) {
        return $http({
            method: "POST",
            url: url,
            data: data
        }).then(function (response) {
            if (typeof onSuccess === 'function' && response.data.status === "SUCCESS") {
                onSuccess(response.data);
            } else {
                if (typeof onError === 'function') {
                    if (!response.data) {
                        response.data = {};
                    }

                    if (!response.data.data) {
                        response.data.data = {};
                    }

                    if (!response.data.data.errors) {
                        response.data.data.errors = {};
                    }
                    onError(response.data);
                }
            }

        }, function (response) {
            if (typeof onError === 'function') {

                if (!response.data) {
                    response.data = {};
                }

                if (!response.data.data) {
                    response.data.data = {};
                }

                if (!response.data.data.errors) {
                    response.data.data.errors = {};
                }

                onError(response.data);
            }
        });
    }

    function doUploadFile(url, data, onSuccess, onError) {
        return $http({
            method: "POST",
            url: url,
            data: data,
            transformRequest: angular.identity,
            transformResponse: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        }).then(function (response) {
            if (typeof onSuccess === 'function' && response.data.status === "SUCCESS") {
                onSuccess(response.data);
            } else {
                if (typeof onError === 'function') {
                    if (!response.data) {
                        response.data = {};
                    }

                    if (!response.data.data) {
                        response.data.data = {};
                    }

                    if (!response.data.data.errors) {
                        response.data.data.errors = {};
                    }
                    onError(response.data);
                }
            }

        }, function (response) {
            if (typeof onError === 'function') {

                if (!response.data) {
                    response.data = {};
                }

                if (!response.data.data) {
                    response.data.data = {};
                }

                if (!response.data.data.errors) {
                    response.data.data.errors = {};
                }

                onError(response.data);
            }
        });
    }

    return {
        getAllEmployee: function (onSuccess, onError) {
            getContent(baseUrl, onSuccess, onError);
        },
        countAllEmployee: function (onSuccess, onError) {
            var url = baseUrl + "count";
            getContent(url, onSuccess, onError)
        },
        getPaginateEmployee: function (position, pageSize, onSuccess, onError) {
            var url = baseUrl + "paginate/" + position + "/" + pageSize + "";
            getContent(url, onSuccess, onError)
        },
        insertEmployee: function (data, onSuccess, onError) {
            doAction(baseUrl, data, onSuccess, onError);
        },
        updateEmployee: function (data, onSuccess, onError) {
            var url = baseUrl + "update";
            doAction(url, data, onSuccess, onError);
        },
        deleteEmployee: function (data, onSuccess, onError) {
            var url = baseUrl + "delete";
            doAction(url, data, onSuccess, onError)
        },
        findByCodeAndName: function (data, onSuccess, onError) {
            var url = baseUrl + "find";
            doAction(url, data, onSuccess, onError)
        },
        uploadFile: function (data, onSuccess, onError) {
            var url = baseUrl + "upload";

            doUploadFile(url, data, onSuccess, onError)
        }
    }
}]);