/*
var app = angular.module('myApp', []);

app.service('restService', ['$http', function ($http) {
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



app.controller('myController', ['$scope', 'restService', function($scope, restService){


	$scope.user = {
		// code : "",
		// fullname : "",
		// email : ""
	};
	
	$scope.users = [];
	var indexUpdate = 0;
	
	var listUserAll = function(url){
		restService.fetchGet(url)
			.then(
				function(res){
					$scope.users = res;
				},
				function(err){
					alert(err);
				}
			)
	}
	
	listUserAll("/user/listAllUser");

	$scope.search = function(){
		if($scope.user.code === undefined && $scope.user.fullname === undefined && $scope.user.email === undefined){
			listUserAll("/user/listAllUser");
		}else{
			restService.fetchPost("/user/likeListUser", $scope.user)
			.then(
				function(res){
					$scope.users = res.data;
				},
				function(err){
					alert(err);
				}
			)

		}

	}

	$scope.deleteContentUser = function(){
		$scope.user = {};
		listUserAll("/user/listAllUser");
	}

	$scope.save = function(){

		restService.fetchPost("/user/saveUser", {
			code : $scope.userUpdate.codeUpdate,
			username : $scope.userUpdate.usernameUpdate,
			password : $scope.userUpdate.passwordUpdate,
			email : $scope.userUpdate.emailUpdate,
			fullname : $scope.userUpdate.fullnameUpdate,
			position : $scope.userUpdate.positionUpdate
		})
		.then(
			function(res){
				if(res.data.content == "200"){
					$scope.users.push({
						id : $scope.userUpdate.idUpdate,
						code : $scope.userUpdate.codeUpdate,
						username : $scope.userUpdate.usernameUpdate,
						email : $scope.userUpdate.emailUpdate,
						fullname : $scope.userUpdate.fullnameUpdate,
						position : $scope.userUpdate.positionUpdate
					});
				}else{
					alert(res.data.content);
				}
			},
			function(err){
				alert(err);
			}
		)


	}

	$scope.update = function(object, index){
		$scope.styles = {
            "position": "fixed", 
            "z-index": "1",
            "padding-top": "100px",
            "left": "0",
            "top": "0",
            "width": "100%",
            "height": "100%",
            "overflow": "auto",
            "background-color": "rgb(0,0,0)",
            "background-color": "rgba(0,0,0,0.4)"
        };
		indexUpdate = index;
		$scope.userUpdateBase = {
			idUpdateBase : object.id,
			codeUpdateBase : object.code,
			usernameUpdateBase : object.username,
			emailUpdateBase : object.email,
			fullnameUpdateBase : object.fullname,
			positionUpdateBase : object.position
		}
		$scope.userUpdate = {
			idUpdate : object.id,
			codeUpdate : object.code,
			usernameUpdate : object.username,
			emailUpdate : object.email,
			fullnameUpdate : object.fullname,
			positionUpdate : object.position
		}		
	}
	$scope.updates = function(){
		var count = 0;
		if($scope.userUpdateBase.codeUpdateBase == $scope.userUpdate.codeUpdate && $scope.userUpdate.codeUpdate !== undefined){
			$scope.userUpdateBase.codeUpdateBase = "";
			count++;
		}else{
			$scope.userUpdateBase.codeUpdateBase = $scope.userUpdate.codeUpdate;
		}
		if($scope.userUpdateBase.usernameUpdateBase == $scope.userUpdate.usernameUpdate && $scope.userUpdate.usernameUpdate !== undefined){
			$scope.userUpdateBase.usernameUpdateBase = "";
			count++;
		}else{
			$scope.userUpdateBase.usernameUpdateBase = $scope.userUpdate.usernameUpdate;
		}
		if($scope.userUpdateBase.emailUpdateBase == $scope.userUpdate.emailUpdate && $scope.userUpdate.emailUpdate !== undefined){
			$scope.userUpdateBase.emailUpdateBase = "";
			count++;
		}else{
			$scope.userUpdateBase.emailUpdateBase = $scope.userUpdate.emailUpdate;
		}
		if($scope.userUpdateBase.fullnameUpdateBase == $scope.userUpdate.fullnameUpdate && $scope.userUpdate.fullnameUpdate !== undefined){
			$scope.userUpdateBase.fullnameUpdateBase = "";
			count++;
		}else{
			$scope.userUpdateBase.fullnameUpdateBase = $scope.userUpdate.fullnameUpdate;
		}
		if($scope.userUpdateBase.positionUpdateBase == $scope.userUpdate.positionUpdate && $scope.userUpdate.positionUpdate !== undefined){
			$scope.userUpdateBase.positionUpdateBase = "";
			count++;
		}else{
			$scope.userUpdateBase.positionUpdateBase = $scope.userUpdate.positionUpdate;
		}
		if(count == 5){
			alert("Hãy thay đổi thông tin bạn muốn cập nhật");
			$scope.userUpdateBase = {
				idUpdateBase : $scope.userUpdate.idUpdate,
				codeUpdateBase : $scope.userUpdate.codeUpdate,
				usernameUpdateBase : $scope.userUpdate.usernameUpdate,
				emailUpdateBase : $scope.userUpdate.emailUpdate,
				fullnameUpdateBase : $scope.userUpdate.fullnameUpdate,
				positionUpdateBase : $scope.userUpdate.positionUpdate
			}
		}else{
			restService.fetchPost("/user/updateUser", {
													id : $scope.userUpdateBase.idUpdateBase,
													code : $scope.userUpdateBase.codeUpdateBase, 
													username : $scope.userUpdateBase.usernameUpdateBase,
													email : $scope.userUpdateBase.emailUpdateBase,
													password : $scope.userUpdate.passwordUpdate,
													fullname : $scope.userUpdateBase.fullnameUpdateBase,
													position : $scope.userUpdateBase.positionUpdateBase
			})
			.then(
				function(res){
					if(res.data.content == "200"){
						$scope.users[indexUpdate] = {
							id : $scope.userUpdate.idUpdate,
							code : $scope.userUpdate.codeUpdate, 
							username : $scope.userUpdate.usernameUpdate,
							email : $scope.userUpdate.emailUpdate,
							fullname : $scope.userUpdate.fullnameUpdate,
							position : $scope.userUpdate.positionUpdate
						};
					}else{
						alert(res.data.content);
					}
					
				},
				function(err){
					alert(err);
				}
			)

		}
	}

	$scope.delete = function(index, id){
		restService.fetchDelete("/user/delete/", id)
		.then(
			function(res){
				$scope.users.splice(index, 1);
			},
			function(err){
				alert(err);
			}
		)
	}

	$scope.roleForUser = function(id){
		window.location = "http://localhost:8080/user/RoleForUser/".concat(id);
	}
}])


	var dialog = document.getElementById("dialog-border");
    var open = document.getElementById("myBtn");
    var close = document.getElementById("close");
    open.onclick = function(){
        dialog.style.display = "block";
    }
    close.onclick = function(){
        dialog.style.display = "none";
    }*/
