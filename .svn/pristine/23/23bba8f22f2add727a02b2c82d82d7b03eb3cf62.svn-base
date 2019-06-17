<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<h1><spring:message code="user.list.title"/></h1>
<table border="1" ng-controller="myController">
    </thead>
    <thead class="box-body-head">
    <th>STT</th>
    <th>Mã nhân viên</th>
    <th>Tên nhân viên</th>
    <th>Thư điện tử</th>
    <th>Chức vụ</th>
    <th>Chức năng</th>
    </thead>
    <tbody>
    <tr class="box-body-body" ng-repeat="user in users ">
        <td>{{ $index + 1 }}</td>
        <td>{{ user.code }}</td>
        <td>{{ user.fullname }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.position }}</td>
        <td><a href="" ng-click="update(user, $index)">cập nhật</a>|<a href=""
                                                                       ng-click="delete($index, user.id)">Xóa</a>|<a
                href="" ng-click="roleForUser(user.id)">Phân quyền</a></td>
    </tr>
    </tbody>
</table>