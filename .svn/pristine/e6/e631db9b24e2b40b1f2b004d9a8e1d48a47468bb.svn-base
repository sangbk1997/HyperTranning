<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html xmlns="http://www.w3.org/1999/xhtml" ng-app="myApp">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <c:set var="title">
        <tiles:getAsString name="title"/>
    </c:set>
    <title><spring:message code="${title}"/></title>
    <jsp:include page="include_css.jsp"/>
</head>
<body>
<div>
    <!-- Header -->
    <tiles:insertAttribute name="header"/>
    <!-- Menu Page -->
    <div>
        <tiles:insertAttribute name="menu"/>
    </div>
    <!-- Body Page -->
    <div ng-view>
        <tiles:insertAttribute name="body"/>
    </div>
    <!-- Footer Page -->
    <tiles:insertAttribute name="footer"/>
</div>
</body>
<jsp:include page="include_js.jsp"/>
<script src="/static/js/role.js"></script>
</html>