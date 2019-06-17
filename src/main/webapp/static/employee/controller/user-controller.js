myApp.controller("UserController", ['$scope', function ($scope) {
    $scope.users = [{
        "fullName": "Luu Quang Tien",
        "userName": "tienlq",
        "password": "123456",
        "gender": "Male",
        "isPublic": true
    }];

    $scope.showPopUpAddUser = function () {
        $scope.userInsert = {
            "fullName": "",
            "userName": "",
            "password": "",
            "gender": "male",
            "isPublic": true
        };
        $scope.isShowDialog = true;
    };
    $scope.gender = [
        {
            "id": "male",
            "name": "Male"
        },
        {
            "id": "female",
            "name": "Female"
        }
    ];
    $scope.closePopup = function () {
        closePopUp();
    };
    $scope.doAddUser = function () {
        $scope.users.push($scope.userInsert);
        closePopUp();
    };

    function closePopUp() {
        $scope.isShowDialog = false;
    }
}]);