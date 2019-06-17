//package com.hyperlogy.test.controller;
//
//import com.hyperlogy.test.bo.User;
//import com.hyperlogy.test.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.controller.bind.annotation.GetMapping;
//import org.springframework.controller.bind.annotation.RequestMapping;
//import org.springframework.controller.bind.annotation.RestController;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/user")
//public class UserController {
//    @Autowired
//    private UserService userService;
//
//    @GetMapping("/list")
//    public List<User> list() {
//        return userService.list(new User());
//    }
//}
