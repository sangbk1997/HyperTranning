/*



var app = angular.module('myApp',[]);

// Create Services 

app.service('myService',function($http){

    this.loadRoles = function(){
        $http({
            method: 'GET',
            url: '/roles'
        }).then(
            function(res){
                return res.data;
            },
            function(error){
                alert("Error: " + error.status + " : " + error.data);
            }
        )
    };

    this.getById = function(id){
        $http({
            method: 'GET',
            url: '/role/' +id
        }).then(
            function(res){
                return res.data;
            },
            function(error){
                alert("Error: " + error.status + " : " + error.data);
            }
        )
    };

    this.getSearch = function(content){
        $http({
            method: 'GET',
            url: '/searchRole?search=' + content
        }).then(
            function(res){
                return res.data;
            },
            function(error){
                alert("Error: " + error.status + " : " + error.data);
            }

        )
    };

    this.deleteRole = function(id){
        $http({
            method: 'DELETE',
            url: '/role/' + id
        }).then(
            function(res){
                // console.log("Delete Successfully ! ")
            },
            function(error){
                alert("Error: " + error.status + " : " + error.data);
            }
        )
    };

    // this.deleteAll = function(){
    //     $http({
    //         method: 'DELETE',
    //         url: '/deleteAll'
    //     }).then(
    //         function(res){
    //             alert("Deleted successfully");
    //         },
    //         function(error){
    //             alert("Error: " + error.status + " : " + error.data);
    //         }
    //     )
    // };

    this.updateRole = function(role){
        $http({
            method: 'PUT',
            url: '/updateRole',
            data: angular.toJson(role),
            header:{
                'Content-Type' : 'application/json'
            }
        }).then(
            function(res){
                var mes = res.data;
                if(mes.message == 1){
                    alert("Update Successfully !");
                    // myCallBack();
                }else{
                    alert("You must fill full data ! ");
                }
            },
            function(error){
                alert("Error: " + error.status + " : " + error.data);
            }
        )
    };

    this.insertRole = function(role){
        $http({
            method: 'POST',
            url: '/insertRole',
            data: angular.toJson(role),
            header:{
                'Content-Type' : 'application/json'
            }
        }).then(
            function(res){
                var mes = res.data;
                if(mes.message == 1){
                    alert(" Insert  Successfully !");
                    // myCallBack();
                }else{
                    alert("Your code have already exist Or You don't fill full data ??? ");
                }
            },
            function(error){
                alert("Error: " + error.status + " : " + error.data);
            }
        )
    };
});


app.controller('myCtrl', function($scope, $http, myService){

    $scope.roles = [];
    $scope.roleForm = {
        id: 0,
        code: "",
        rolename: "",
        createby: "",
        createdate: "",
        updateby: "",
        updatedate: ""
    };

    $scope.searchContent = "";
    $scope.isEdit = 1;

    // Now load data
    _loadData();
    // Ham load role by search content

    $scope.search = function(){
        // $scope.roles =  myService.getSearch($scope.searchContent);
        $http({
            method: 'GET',
            url: '/searchRole?search=' + $scope.searchContent
        }).then(
            function(res){
                // return res.data;
                $scope.roles = res.data;
            },
            function(error){
                alert("Error: " + error.status + " : " + error.data);
            }

        )
    };

    // Ham submit role 

    $scope.submitRole = function(idForm){
        myService.insertRole($scope.roleForm);
        // _completeUpdateOrInsert();
    };

    // Ham update role 
    $scope.updateRole = function(idForm){
        myService.updateRole($scope.roleForm);
        // _completeUpdateOrInsert();
    };

    // Ham delete role 
    $scope.deleteRole = function(id){
        if(confirm("Bạn có muốn xóa dữ liệu này ?") == true ){
            myService.deleteRole(id);
            _loadData();
        }
    };

    // Ham deleteAll

    // $scope.deleteAll = function(){
    //     myService.deleteAll();
    // }
    // Ham load data into form 

    $scope.pushRoleForm = function(role){
        $scope.isEdit = 0;
        $scope.roleForm.id = role.id;
        $scope.roleForm.code = role.code;
        $scope.roleForm.rolename = role.rolename;
        $scope.roleForm.createby = role.createby;
        $scope.roleForm.createdate = role.createdate;
        $scope.roleForm.updateby = role.updateby;
        $scope.roleForm.updatedate = $scope.getCurrentDate();
        document.getElementById('codeRole').disabled = true;
    };

    // Ham create new roleForm 
    $scope.createRole = function(idForm){
        _clearForm();
        $scope.showDialog(idForm);

    };

    // Ham load Role into Form to update 

    $scope.getRole = function(role, idForm){
        $scope.pushRoleForm(role);
        $scope.showDialog(idForm);
    };

    //  Ham show dialog 
    $scope.showDialog = function(id){
        document.getElementById(id).style.display = "block";

    }

    // Ham hide dialog 
    $scope.hideDialog = function(id){
        document.getElementById(id).style.display = "none";
    }

    //  Ham clear form 
    function _clearForm(){
        $scope.isEdit = 1;
        $scope.roleForm.id = 0;
        $scope.roleForm.code = "";
        $scope.roleForm.rolename = "";
        $scope.roleForm.createby = 1;
        $scope.roleForm.createdate = $scope.getCurrentDate();
        $scope.roleForm.updateby = 1;
        $scope.roleForm.updatedate = $scope.getCurrentDate();
        document.getElementById('codeRole').disabled = false;
    }

    // Ham lay thoi gian hien tai 

    $scope.getCurrentDate = function(){
        var d = new Date();
        return d.getTime();
    };

//    Ham updateOrInsert

    $scope.updateOrInsert = function (idForm) {
        if($scope.roleForm.id == 0){
            $scope.submitRole(idForm);
        }else{
            $scope.updateRole(idForm);
        }
    }

    //Ham finish process of update Or Insert data
    function _completeUpdateOrInsert(){
        _loadData();
        $scope.hideDialog("id01");
    }

    // Ham load data

    function _loadData(){
        // $scope.roles = myService.loadRoles();
        $http({
            method: 'GET',
            url: '/roles'
        }).then(
            function(res){
                // return res.data;
                $scope.roles = res.data;
            },
            function(error){
                alert("Error: " + error.status + " : " + error.data);
            }
        )
    }



});*/
