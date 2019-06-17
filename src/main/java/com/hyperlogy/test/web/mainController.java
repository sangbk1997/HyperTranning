//package com.hyperlogy.test.controller;
//
//import com.hyperlogy.test.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.controller.bind.annotation.GetMapping;
//import org.springframework.controller.bind.annotation.RequestMapping;
//import org.springframework.controller.bind.annotation.RequestParam;
//import org.springframework.controller.servlet.ModelAndView;
//
//@Controller
//@RequestMapping("/user")
//public class mainController {
//
//    @Autowired
//    private UserService userService;
//
//    @GetMapping("/")
//    public String welcome(){
//        return "welcome";
//    }
//
//
//    @GetMapping("/user-list")
//    public String userHome(){
//        return "userList";
//    }
//
//
//    @GetMapping("/RoleForUser/{id}")
//    public String roleForUser(){
//        return "roleForUser";
//    }
//
//    @GetMapping("/myLogin")
//    public String accessLogin(Model model){
//        model.addAttribute("title", "Login Page");
//        return "/user/loginForm";
//    }
//
//    @GetMapping("/invalidLogin")
//    public String errorLogin(Model model){
//        model.addAttribute("title", "Error LoginPage");
//        model.addAttribute("errorLogin", "Login error, please try again !");
//        return "/user/loginForm";
//    }
//
//    @GetMapping("/myLogout")
//    public String accessLoginError(Model model){
//        model.addAttribute("title", "Logout Page");
//        model.addAttribute("logoutMessage", "You have already logout successfully !");
//        return "/user/loginForm";
//    }
//
//}
