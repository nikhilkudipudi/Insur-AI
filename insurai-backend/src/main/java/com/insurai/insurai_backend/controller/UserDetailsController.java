package com.insurai.insurai_backend.controller;

import com.insurai.insurai_backend.entity.UserDetails;
import com.insurai.insurai_backend.service.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
public class UserDetailsController {

    @Autowired
    private UserDetailsService userDetailsService;

    @PostMapping("/signup")
    public UserDetails registerUser(@RequestBody UserDetails user) {
        return userDetailsService.registerUser(user);
    }
}
