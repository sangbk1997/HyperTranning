<%--
  Created by IntelliJ IDEA.
  User: sangtigo
  Date: 03/08/18
  Time: 08:41
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<html>

<head>
    <title>${title}</title>
    <%--<title>Title</title><script src="js/angular/angular.min.js"></script>--%>
    <link rel="stylesheet" type="text/css" href= "<c:url value="/static/css/role.css"/>">
    <%--<script src="<c:url value="/static/js/angular.min.js"/> "></script>--%>
    <script src="<c:url value="/static/js/role.js"/>"></script>
</head>
<body>
    <div class="loginContainer">
        <h2>Login Form</h2>
        <hr>
        <form action="/postLogin" method="post">
            <br>
            <div>
                <h4 class="alignLeft">Username</h4>
                <input type="text" placeholder="Enter username" class="width-8" name="username">
            </div>

            <div>
                <h4  class="alignLeft">Password</h4>
                <input type="password" placeholder="Enter password" class="width-8" name="password">
            </div>
            <br>
            <div class="alignLeft">
                <input type="checkbox" checked> Remember Me
            </div>
            <br>
            <div>
                <input type="submit" value="Login" class="btn btn-primary width-5">
            </div>
            <br>
            <div class="alert">${logoutMessage}</div>
            <br>
            <div class="alert">${errorLogin}</div>
        </form>
    </div>
</body>
</html>
