package com.insurai.insurai_backend.controller;

import com.insurai.insurai_backend.entity.UserDetails;
import com.insurai.insurai_backend.repository.UserDetailsRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/admin/settings")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class SettingsController {

    private final UserDetailsRepository userDetailsRepository;
    private final PasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseEntity<UserDetails> getSettings(Principal principal) {
        return userDetailsRepository.findByEmail(principal.getName())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateSettings(@RequestBody SettingsRequest request, Principal principal) {
        return userDetailsRepository.findByEmail(principal.getName())
                .map(user -> {
                    user.setRequirePasswordForActions(request.isRequirePasswordForActions());
                    user.setTheme(request.getTheme());
                    userDetailsRepository.save(user);
                    return ResponseEntity.ok(user);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/password")
    public ResponseEntity<?> updatePassword(@RequestBody PasswordUpdateRequest request, Principal principal) {
        return userDetailsRepository.findByEmail(principal.getName())
                .map(user -> {
                    if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
                        return ResponseEntity.badRequest().body("Incorrect current password");
                    }
                    user.setPassword(passwordEncoder.encode(request.getNewPassword()));
                    userDetailsRepository.save(user);
                    return ResponseEntity.ok("Password updated successfully");
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/verify-password")
    public ResponseEntity<?> verifyPassword(@RequestBody PasswordVerificationRequest request, Principal principal) {
        return userDetailsRepository.findByEmail(principal.getName())
                .map(user -> {
                    if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                        return ResponseEntity.ok().build();
                    }
                    return ResponseEntity.badRequest().body("Incorrect password");
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @Data
    static class SettingsRequest {
        private boolean requirePasswordForActions;
        private String theme;
    }

    @Data
    static class PasswordUpdateRequest {
        private String currentPassword;
        private String newPassword;
    }

    @Data
    static class PasswordVerificationRequest {
        private String password;
    }
}
