package com.reIntern.controller;

import com.reIntern.service.userService;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
//UserController is responsible for handling incoming HTTP requests from the client (like your Angular frontend).It processes these requests, often by invoking methods from the service layer (e.g., userService), and then returns a response to the client.
@RestController //class handles HTTP requests and returns data in JSON or XML format.
@RequestMapping("/user")
@CrossOrigin(allowedHeaders = "*", origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private userService userService;

//    @PostMapping("/request-otp")
//    public void requestOtp(@RequestBody String username) {
//        userService.generateAndSendOtp(username);
//    }
    @PostMapping("/request-otp")
    public void requestOtp(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        userService.generateAndSendOtp(username);
    }


    @PostMapping("/verify-otp")
    public Map<String, String> verifyOtp(@RequestBody Map<String, String> request) {
        return userService.verifyOtp(request.get("username"),request.get("otp"));
    }
}
