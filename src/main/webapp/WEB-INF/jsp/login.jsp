<%--
  Created by IntelliJ IDEA.
  User: hp
  Date: 8/1/18
  Time: 2:57 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html ng-app="myApp">
<head>
    <title>login</title>
</head>
<body>
    <form name="loginPost" action="<c:url value='logins' />" >
    	<label>username</label>
    	<input type="text" name="username" ng-model="user.username"/>
    	<label>password</label>
    	<input type="password" name="password" ng-model="user.password"/>
    	<input type="submit" name="submit" value="login">
    </form>
</body>
<script src="<c:url value="/static/angularjs/angular.min.js" />"></script>
<script src="<c:url value="/static/js/login.js" />"></script>
</html>
