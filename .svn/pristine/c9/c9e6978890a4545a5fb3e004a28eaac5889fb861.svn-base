myApp.service('userService', ['$http', function ($http) {
    return {
        fetchGet: function (url) {
            return $http({
                method: "GET",
                url: url
            }).then(
                function (resource) {
                    return resource.data;

                },
                function (err) {
                    return err;
                }
            );
        },

        fetchPost: function (url, user) {
            return $http({
                method: "POST",
                url: url,
                data: user
            })
        },


        fetchDelete: function (url, id) {
            return $http({
                method: "DELETE",
                url: url + id,

            })
        }
    }
}]);
