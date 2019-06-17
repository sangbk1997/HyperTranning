<%--
  Created by IntelliJ IDEA.
  User: hp
  Date: 7/23/18
  Time: 2:21 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html ng-app="myApp">
<head>
    <title>User Home</title>
    <link href="<c:url value="/static/css/user.css" />" rel="stylesheet">
    <%--<link href="<c:url value="https://fonts.googleapis.com/css?family=Roboto:400,700&amp;subset=latin-ext,vietnamese" />">--%>
    <link rel="stylesheet/less" type="text/css"  href="<c:url value="/static/less/user.less"/>">

</head>
<body class="hyper-style-1 is-autohide" id="bod" ng-controller="myController">
<div id="app-main">
    <div class="page-name">Danh sách nhân viên</div>
</div>
<div class="pull-left">
    <input  class="btn" id="myBtn" value="Thêm mới nhân viên" type="button""></div>
</div>
<div id="panel-find">
    <div id="head">
        <span>Thông tin tìm kiếm</span>
    </div>
    <div id="body">
        <div class="trow">
            <label>Mã nhân viên</label>
            <div class="input">
                <i class="icon-prepend fa fa-pencil">i</i>
                <input type="text" name="code" ng-model="user.code"></input>
            </div>
        </div>
        <div class="trow">
            <label>Tên nhân viên</label>
            <div class="input">
                <i class="icon-prepend fa fa-pencil">i</i>
                <input type="text" name="name" ng-model="user.fullname"></input>
            </div>
        </div>
        <div class="trow">
            <label>Thư điện tử</label>
            <div class="input">
                <i class="icon-prepend fa fa-pencil">i</i>
                <input type="text" name="email" ng-model="user.email"></input>
            </div>
        </div>
        <div class="trow">

            <div id="button">

                <a class="btn" href="" name="search" ng-click="search()">Tìm kiếm</a>
                <a class="btn" href="" name="delete" ng-click="deleteContentUser()">Xóa trắng</a>

            </div>
        </div>

        <!-- <div id="text">
            <span>Mã nhân viên</span>
            <span>Thư điện tử</span>
            <span>Tên đầy đủ</span>
        </div>
        <div id="input">
            <input type="text" name="name" ng-model="user.fullname"></input>
            <input type="text" name="email" ng-model="user.email"></input>
            <input type="text" name="email" ng-model="user.email"></input>
            <a class="btn" href="" name="search" ng-click="search()">Tìm kiếm</a>
            <a class="btn" href="" name="delete" ng-click="deleteContentUser()">Xóa trắng</a>
        </div> -->

    </div>
</div>
<div class="box table-list">
    <div class="box-header">
        <p>Danh sách nhân viên : {{users.length}}</p>
    </div>
    <div class="box-body" >
        <table>
            <tr class="box-body-head">
                <th>STT</th>
                <th>Mã nhân viên</th>
                <th>Tên nhân viên</th>
                <th>Thư điện tử</th>
                <th>Chức vụ</th>
                <th>Chức năng</th>
            </tr>
            <tr class="box-body-body" ng-repeat="user in users ">
                <td>{{ $index + 1 }}</td>
                <td>{{ user.code }}</td>
                <td>{{ user.fullname }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.position }}</td>
                <td><a href="" ng-click="update(user, $index)">cập nhật</a>|<a href="" ng-click="delete($index, user.id)">Xóa</a>|<a href="" ng-click="roleForUser(user.id)">Phân quyền</a></td>
            </tr>
        </table>
    </div>
</div>

<!-- <div  id="dialog-border" ng-style="styles">

       Modal content -->
    <!-- <div id="dialog-content">
        <div id="label">
            <h3>Save</h3>
        </div>
        
        <span id="close" ng-click="close()">&times;</span>
        <div id="text">
            <span>Mã nhân viên</span>
            <span>Tên tài khoản</span>
            <span>Mật khẩu</span>
            <span>Thư điện tử</span>
            <span>Tên đầy đủ</span>
            <span>Vị trí công tác</span>
        </div>
        <div id="input">
            <input type="text" name="code" ng-model="userUpdate.codeUpdate"/>
            <input type="text" name="username" ng-model="userUpdate.usernameUpdate">
            <input type="text" name="password" ng-model="userUpdate.passwordUpdate">
            <input type="text" name="email" ng-model="userUpdate.emailUpdate">
            <input type="text" name="fullname" ng-model="userUpdate.fullnameUpdate">
            <input type="text" name="position" ng-model="userUpdate.positionUpdate">
            <button class="button" type="submit" ng-click="save()"/>save<button>
        </div>
    </div>

</div> -->  

<div>
    <form id="form">
        <span>Mã nhân viên</span>
        <input type="text" name="code" ng-model="userUpdate.codeUpdate"/>
        <span>Tên tài khoản</span>
        <input type="text" name="username" ng-model="userUpdate.usernameUpdate">
        <span>Mật khẩu</span>
        <input type="text" name="password" ng-model="userUpdate.passwordUpdate">
        <span>Thư điện tử</span>
        <input type="text" name="email" ng-model="userUpdate.emailUpdate">
        <span>Tên đầy đủ</span>
        <input type="text" name="fullname" ng-model="userUpdate.fullnameUpdate">
        <span>Vị trí công tác</span>
        <input type="text" name="position" ng-model="userUpdate.positionUpdate">
        <input type="submit" value="save" ng-click="save()"/>
        <input type="submit" value="update" ng-click="updates()"/>
    </form>
</div>
</body>
<script src="<c:url value="/static/less/less.min.js" />"></script>
<script src="<c:url value="/static/angularjs/angular.min.js" />"></script>
<script src="<c:url value="/static/js/user.js" />"></script>
</html>
