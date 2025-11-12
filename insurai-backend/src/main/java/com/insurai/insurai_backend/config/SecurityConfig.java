package com.insurai.insurai_backend.config;

import com.insurai.insurai_backend.security.JWTUtil;
import com.insurai.insurai_backend.security.JwtAuthenticationFilter;
import com.insurai.insurai_backend.service.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

    private final JWTUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;

    public SecurityConfig(JWTUtil jwtUtil, CustomUserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter(jwtUtil, userDetailsService);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/").permitAll()
                        //  .requestMatchers("/api/admin/").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.OPTIONS, "/").permitAll()
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();

    }


    @Bean
    public UrlBasedCorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        // Allow sending credentials (cookies, HTTP authentication headers like Authorization)
        config.setAllowCredentials(true);

        // List all origins your frontend will be served from.
        // IMPORTANT: For production, replace localhost with your actual frontend domain(s).
        config.addAllowedOrigin("http://localhost:5173"); // Your Vite development server
        config.addAllowedOrigin("http://34.83.226.35/");
        config.addAllowedOrigin("http://devbridge.ddns.net/");

        // Allow all common HTTP methods
        config.addAllowedMethod("GET");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("DELETE");
        config.addAllowedMethod("OPTIONS"); // Crucial for pre-flight requests

        // Allow all headers (e.g., Content-Type, Authorization, Custom-Header)
        config.addAllowedHeader("*");

        // How long the pre-flight request's result can be cached by the browser (in seconds)
        config.setMaxAge(3600L); // 1 hour

        // Apply this CORS configuration to all paths (/)
        // Note: Changed "/" to "/" to ensure it covers all your API endpoints
        source.registerCorsConfiguration("/", config);
        return source;
    }
}