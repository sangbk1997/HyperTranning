<%--
  Created by IntelliJ IDEA.
  User: sangtigo
  Date: 27/07/18
  Time: 09:33
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<html>

<head>
    <%--<title>Title</title><script src="js/angular/angular.min.js"></script>--%>
    <title>RolePage</title>
    <link rel="stylesheet" type="text/css" href= "<c:url value="/static/css/role.css"/>">
    <%--<script src="<c:url value="/static/js/angular.min.js"/> "></script>--%>
        <script src=" <c:url value ="//ajax.googleapis.com/ajax/libs/angularjs/1.3.2/angular.min.js" />"></script>
    <script src="<c:url value="/static/js/role.js"/>"></script>
</head>
<body ng-app="myApp" ng-controller="myCtrl">
<div class="Container">
    <h3 style="background-color: rgba(27, 194, 180, 0.067); padding: 20px;" class="center">Trang Thiết Lập Phân Quyền</h3>
    <div>
        <button class="btn btn-info">${userInfo}</button>
        <a href="/logout"><button class="btn btn-warning">Logout</button></a>
    </div>
    <div>
        <button class="btn btn-primary" ng-click="createRole('id01')">Thêm Quyền</button>

    </div>
    <div class="searchBox">
        <div class="title">
            Thông Tin Tìm Kiếm
        </div>
        <hr>
        <div class="">
            <div class="center searchInfo">
                <table>
                    <tr>
                        <td class="width-4">Thông Tin Tìm Kiếm </td>
                        <td class="with-6">
                            <input type="text" placeholder="Content" ng-model="searchContent">
                        </td>

                    </tr>

                </table>
                <div style="color: orange; font-size: 12px;">Bạn có thể tìm kiếm theo mã quyền hoặc tên quyền</div>
                <button class="btn btn-primary" ng-click="search()">Tìm Kiếm </button>
                <button class="btn btn-primary" ng-click="deleteAll()">Xóa Trắng</button>
            </div>
        </div>
    </div>
    <div class="listRole">
        <div class="title">Danh sách quyền </div>
        <hr>
        <div class="tableRole">
            <table border="1px">
                <tr>
                    <th class="width-1">STT</th>
                    <th class="width-2 move_cursor" ng-click="changeSortedRoles('code')">Mã Quyền</th>
                    <th class="width-4 move_cursor" ng-click="changeSortedRoles('rolename')">Tên Quyền </th>
                    <th class="width-3">Chức Năng </th>
                </tr>

                <tr ng-repeat="role in roles | orderBy : sortedRoles">
                    <td>{{$index + 1}}</td>
                    <td>{{role.code}}</td>
                    <td>{{role.rolename}}</td>
                    <td>
                        <span class="link" ng-click="getRole(role,'id01')">Cập Nhật </span> |
                        <span class="link" ng-click="deleteRole(role.id)">Xóa</span>
                    </td>
                </tr>

            </table>
        </div>
    </div>
</div>
<%--<button onclick="document.getElementById('id01').style.display='block'">Insert Item</button>--%>
<!-- The modal -->
<div id="id01" class="modal">
    <!-- Modal Content -->
    <div class="modal-content animate">
        <div class="title">
            <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">X</span>
            <h3 class="center">Thiết Lập Quyền </h3>
        </div>
        <hr>
        <div class="infoDetail">
            <table>
                <tr>
                    <td class="width-3">
                        <label>Mã quyền </label>
                    </td>
                    <td class="width-5">
                        <input type="text" placeholder="Nhập mã quyền " ng-model="roleForm.code" id="codeRole">
                    </td>
                </tr>
                <tr>
                    <td class="width-3">
                        <label>Tên quyền </label>
                    </td>
                    <td class="width-5">
                        <input type="text" placeholder="Nhập tên quyền " ng-model="roleForm.rolename">
                    </td>
                </tr>
            </table>
        </div>
        <div class="center">
            <button class="btn btn-primary" ng-click="updateOrInsert('id01')">Cập Nhật </button>
            <button class="btn btn-default" ng-click="hideDialog('id01')">Thoát </button>
        </div>
    </div>
</div>
</body>
<script>
    // get modal
    var modal = document.getElementById('id01');
    // When the user clicks anywhere outside
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
</script>
</body>
</html>