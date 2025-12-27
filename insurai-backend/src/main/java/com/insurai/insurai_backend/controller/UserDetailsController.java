package com.insurai.insurai_backend.controller;

import lombok.Data;

import com.insurai.insurai_backend.entity.UserDetails;
import com.insurai.insurai_backend.security.JWTUtil;
import com.insurai.insurai_backend.service.CustomUserDetailsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserDetailsController {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JWTUtil jwtUtil;

    // ✅ Get user info from token
    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(@RequestHeader("Authorization") String tokenHeader) {
        try {
            String token = tokenHeader.substring(7); // remove "Bearer "
            String email = jwtUtil.extractUsername(token);

            return ResponseEntity.ok(userDetailsService.findByEmail(email));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid token or user not found!");
        }
    }

    // ✅ Update user profile (name, phone)
    @PostMapping("/profile/update")
    public ResponseEntity<?> updateUserProfile(@RequestHeader("Authorization") String tokenHeader,
            @RequestBody UserDetails updatedDetails) {
        try {
            String token = tokenHeader.substring(7); // remove "Bearer "
            String email = jwtUtil.extractUsername(token);

            UserDetails user = userDetailsService.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (updatedDetails.getFullName() != null)
                user.setFullName(updatedDetails.getFullName());

            userDetailsService.save(user); // Ensure save method is accessible or use repository directly if service
                                           // doesn't expose it

            return ResponseEntity.ok("Profile updated successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Update failed: " + e.getMessage());
        }
    }

    @Autowired
    private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @Data
    static class PasswordUpdateRequest {
        private String currentPassword;
        private String newPassword;
    }

    // ✅ Update User Password
    @PostMapping("/profile/password")
    public ResponseEntity<?> updateUserPassword(@RequestHeader("Authorization") String tokenHeader,
            @RequestBody PasswordUpdateRequest request) {
        try {
            String token = tokenHeader.substring(7);
            String email = jwtUtil.extractUsername(token);

            UserDetails user = userDetailsService.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
                return ResponseEntity.badRequest().body("Incorrect current password!");
            }

            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
            userDetailsService.save(user);

            return ResponseEntity.ok("Password updated successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Password update failed: " + e.getMessage());
        }
    }
}
