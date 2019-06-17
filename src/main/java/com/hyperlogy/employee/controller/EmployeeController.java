package com.hyperlogy.employee.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
public class EmployeeController {

    @RequestMapping("/")
    public String employee(HttpServletRequest httpServletRequest){
        httpServletRequest.setAttribute("contextPath", httpServletRequest.getContextPath());
        return "index";
    }
}
