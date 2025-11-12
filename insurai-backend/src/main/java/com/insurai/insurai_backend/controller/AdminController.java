package com.insurai.insurai_backend.controller;

import com.insurai.insurai_backend.dto.PasswordRequest;
import com.insurai.insurai_backend.entity.UserDetails;
import com.insurai.insurai_backend.repository.UserDetailsRepository;
import com.insurai.insurai_backend.security.JWTUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserDetailsRepository userDetailsRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTUtil jwtUtil;

    // ✅ Verify admin password only
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/verify-password")
    public ResponseEntity<?> verifyPassword(@RequestBody PasswordRequest request, HttpServletRequest httpRequest) {
        String token = extractToken(httpRequest);
        String email = jwtUtil.extractUsername(token);

        UserDetails admin = userDetailsRepository.findByEmail(email).orElse(null);
        if (admin == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Admin not found");
        }

        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid admin password!");
        }

        return ResponseEntity.ok("Password verified successfully!");
    }

    private String extractToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7);
        }
        return null;
    }
}
