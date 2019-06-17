myApp.controller("EmployeeController", ['$filter', '$scope', '$employeeService', 'toastr', function ($filter, $scope, $employeeService, toastr) {
    $scope.employeeConfigsValidate = validationConfig.simpleEmployee.doInsert;
    $scope.pageSize = 2;
    initCurrentPage();

    $scope.options = [
        {
            val: 1,
            text: 1
        },
        {
            val: 2,
            text: 2
        },
        {
            val: 3,
            text: 3
        },
        {
            val: 4,
            text: 4
        }
    ];

    getPaginateEmployee();

    function getPaginateEmployee() {
        $employeeService.getPaginateEmployee(
            $scope.position,
            $scope.pageSize,
            function onSuccess(response) {
                $scope.users = response.data.employees;
                countAllEmployee();
            }, function onError(response) {

            })
    }

    function initCurrentPage() {
        $scope.currentPage = 1;
        $scope.position = 0;
    }

    function countAllEmployee() {
        $employeeService.countAllEmployee(
            function onSuccess(response) {
                $scope.totalEmployee = response.data.totalEmployee;
                paginate();
            }, function onError(response) {

            });
    }

    function paginate() {
        $scope.totalPage = Math.ceil($scope.totalEmployee / $scope.pageSize);
        $scope.pageArray = [];
        for (var i = 1; i <= $scope.totalPage; i++) {
            $scope.pageArray.push(i);
        }
    }

    $scope.changeSelect = function () {
        initCurrentPage();
        getPaginateEmployee();
    };

    $scope.doChangePage = function (page) {
        $scope.currentPage = page;
        $scope.position = ($scope.currentPage - 1) * $scope.pageSize;
        getPaginateEmployee();
    };

    $scope.doPrePage = function () {
        $scope.position = $scope.position - $scope.pageSize;
        $scope.currentPage = $scope.currentPage - 1;
        getPaginateEmployee();
    };

    $scope.doNextPage = function () {
        $scope.position = $scope.position + $scope.pageSize;
        $scope.currentPage = $scope.currentPage + 1;
        getPaginateEmployee();
    };


    $scope.userInsert = {};

    $scope.errors = {};

    initSearch();

    $scope.showPopUpAddUser = function () {
        $scope.showPopUp();
        $scope.typeActionPopUp = "add";
        $scope.userInsert = {
            code: "",
            fileRoot: "",
            image: "",
            firstName: "",
            lastName: "",
            email: "",
            dateOfBirth: ""
        };
    };

    $scope.doAddUser = function () {
        // getDateOfBirthFormat();
        // $scope.userInsert = {
        //     code: "",
        //     firstName: "",
        //     lastName: "",
        //     email: "",
        //     dateOfBirth: ""
        // };
        $employeeService.insertEmployee(
            $scope.userInsert
            , function onSuccess(response) {
                getPaginateEmployee();
                uploadFile();
                $scope.closePopup();
            }, function onError(response) {
                angular.forEach(response.data.errors, function (item) {
                    angular.forEach(item, function (error) {
                        toastr.error(error);
                    })
                });
            });
    };

    $scope.doDeleteUser = function (user) {
        if (confirm("Bạn có muốn xóa user không?")) {
            $employeeService.deleteEmployee(user,
                function onSuccess(response) {
                    getPaginateEmployee();
                }, function onError(response) {

                });
        }
    };

    $scope.showPopUpUpdateUser = function (user) {
        $scope.showPopUp();
        $scope.typeActionPopUp = "update";
        $scope.userInsert = $bean.clone(user);
        $scope.userInsert.dateOfBirth = $filter('date')($bean.clone($scope.userInsert.dateOfBirth), 'yyyy-MM-dd');
    };

    $scope.doUpdateUser = function () {
        $employeeService.updateEmployee($scope.userInsert
            , function onSuccess(response) {
                getPaginateEmployee();
                uploadFile();
                $scope.closePopup();
            }, function onError(response) {
                // $scope.userInsert.dateOfBirthFormat = $filter('date')($bean.clone($scope.userInsert.dateOfBirth), 'yyyy-MM-dd');
                angular.forEach(response.data.errors, function (item) {
                    angular.forEach(item, function (error) {
                        toastr.error(error);
                    })
                });
            });

    };

    $scope.changeDate = function (object) {
        console.log(object);
    };

    $scope.doUpSert = function () {
        $scope.userInsert.image = $bean.clone($scope.userInsert.fileRoot.name);
        $scope.fileRoot = $bean.clone($scope.userInsert.fileRoot);
        delete $scope.userInsert.fileRoot;
        if ($scope.typeActionPopUp === 'update') {
            $scope.doUpdateUser();
        }
        if ($scope.typeActionPopUp === 'add') {
            $scope.doAddUser();
        }
    };

    function uploadFile() {
        var formData = new FormData();
        formData.append("uploadFile", $scope.fileRoot);
        $employeeService.uploadFile(
            formData
            , function onSuccess(response) {
                console.log(response);
            }, function onError(response) {

            })
    }

    $scope.searchUser = function () {
        $employeeService.findByCodeAndName(
            {
                "code": $scope.codeSearch,
                "fullName": $scope.fullNameSearch
            }
            , function onSuccess(response) {
                $scope.users = response.data.employeeSearch;
            },
            function onError(response) {

            }
        )
    };

    $scope.clearSearch = function () {
        initSearch();
    };

    function initSearch() {
        $scope.codeSearch = "";
        $scope.fullNameSearch = "";
    }

    $scope.closePopup = function () {
        $scope.isShowPopUp = false;
    };
    $scope.showPopUp = function () {
        $scope.isShowPopUp = true;
    };

    // function getDateOfBirthFormat() {
    //     if (isNaN($scope.userInsert.dateOfBirthFormat)) {
    //         return;
    //     } else {
    //         $scope.userInsert.dateOfBirth = angular.copy($scope.userInsert.dateOfBirthFormat);
    //     }
    //     delete $scope.userInsert.dateOfBirthFormat;
    // }

    // $scope.testAppendDOM = function () {
    //     var html = "<h1>TienTung</h1>";
    //     // var newElm = $compile(html)($scope);
    //     var popUp = angular.element(document.querySelector(".btn"));
    //     popUp.append(html);
    // }
}]);