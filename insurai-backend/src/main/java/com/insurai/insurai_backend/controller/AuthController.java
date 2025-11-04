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
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
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
            // Encrypt password before saving
            System.out.println(request.getPassword());
            request.setPassword(request.getPassword());
            System.out.println(request.getPassword());
            UserDetails user = userDetailsService.registerUser(request);
            return ResponseEntity.ok("User registered successfully with email: ");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Signup failed: " + e.getMessage());
        }
    }



    // ✅ LOGIN
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest request) {



            // Fetch user by email
           Optional<UserDetails> userOptional = userDetailsService.findByEmail(request.getEmail());
         //  System.out.print(userOptional.get().getEmail());
           if (userOptional.isEmpty()) {
              System.out.print(userOptional.get().getEmail());
               return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                       .body(new LoginResponse(null, "Invalid!"));
         }

            UserDetails user = (UserDetails) userOptional.get();


//           Authentication authentication = authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
//            );


        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            System.out.println(request.getPassword());
            System.out.println(user.getPassword());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new LoginResponse(null, "Invalid credentials!"));

        }


        // ✅ Generate JWT token

        String token = jwtUtil.generateToken(user.getEmail());
        return ResponseEntity.ok(new LoginResponse(token, "Login successful!"));
    }

}

//        $2a$10$ofcEmdYxKXVuo2aS8Md2reg1gkTqqWH6sTAg8xV3QjN5bDXc5PUdi
//        $2a$10$ofcEmdYxKXVuo2aS8Md2reg1gkTqqWH6sTAg8xV3QjN5bDXc5PUdi