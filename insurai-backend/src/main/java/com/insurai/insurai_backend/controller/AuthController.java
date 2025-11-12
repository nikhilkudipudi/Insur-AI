package com.insurai.insurai_backend.controller;

import com.insurai.insurai_backend.dto.LoginRequest;
import com.insurai.insurai_backend.dto.SignUpRequest;
import com.insurai.insurai_backend.dto.LoginResponse;
import com.insurai.insurai_backend.entity.UserDetails;
import com.insurai.insurai_backend.security.JWTUtil;
import com.insurai.insurai_backend.service.CustomUserDetailsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
//@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;


    // ✅ REGISTER
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignUpRequest request) {
        try {
            // ✅ Encode the password before saving
            request.setPassword(passwordEncoder.encode(request.getPassword()));

            // ✅ Set default role if not provided
            if (request.getRole() == null || request.getRole().isEmpty()) {
                request.setRole("USER");
            }

            // ✅ Only allow ADMIN creation if using predefined credentials
            if ("ADMIN".equalsIgnoreCase(request.getRole())) {
                // Predefined email for admin
                if (!"admin@gmail.com".equalsIgnoreCase(request.getEmail())) {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN)
                            .body("You are not allowed to create an ADMIN account with this email.");
                }
            }

            UserDetails user = userDetailsService.registerUser(request);
            return ResponseEntity.ok("User registered successfully with email: " + user.getEmail());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Signup failed: " + e.getMessage());
        }
    }




    // ✅ LOGIN
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest request) {

        try {
            // 1. Use AuthenticationManager to validate credentials
            // It automatically uses your CustomUserDetailsService and PasswordEncoder
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            // 2. If authentication is successful, get the user's email from the principal
            // This is the UserDetails object returned by your CustomUserDetailsService
            org.springframework.security.core.userdetails.UserDetails userDetails =
                    (org.springframework.security.core.userdetails.UserDetails) authentication.getPrincipal();

            String email = userDetails.getUsername(); // Get the email (which is the username)

            // 3️⃣ Fetch the user entity from your DB (to get the actual role)
            com.insurai.insurai_backend.entity.UserDetails userEntity =
                    userDetailsService.findByEmail(userDetails.getUsername())
                            .orElseThrow(() -> new UsernameNotFoundException("User not found!"));

            // 4️⃣ Generate JWT with actual role from entity
            String token = jwtUtil.generateToken(userEntity, userEntity.getRole());
            return ResponseEntity.ok(new LoginResponse(token, "Login successful!"));

        } catch (BadCredentialsException e) {
            // 4. Handle incorrect credentials (wrong email or password)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new LoginResponse(null, "Invalid credentials!"));
        } catch (Exception e) {
            // 5. Handle other potential errors (e.g., user not found)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new LoginResponse(null, "Login failed: " + e.getMessage()));
        }
    }}