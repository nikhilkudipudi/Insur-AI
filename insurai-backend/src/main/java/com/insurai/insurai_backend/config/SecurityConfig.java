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
import java.util.Arrays;

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
                        // Allow all OPTIONS requests (preflights) to pass through
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        // Allow all paths under /api/auth/ (e.g., signup, login) to be accessed without
                        // authentication
                        .requestMatchers("/api/auth/**").permitAll()

                        // User endpoints - require authentication
                        .requestMatchers("/api/user/**").authenticated()

                        // Admin endpoints - require ADMIN role
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")

                        // All other requests require authentication
                        .anyRequest().authenticated())
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

        // Allow sending credentials (cookies, HTTP authentication headers like
        // Authorization)
        config.setAllowCredentials(true);

        // List all origins your frontend will be served from.
        config.setAllowedOrigins(
                Arrays.asList("http://localhost:5173", "http://34.83.226.35/", "http://devbridge.ddns.net/"));

        // Allow all common HTTP methods
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Allow all headers (e.g., Content-Type, Authorization, Custom-Header)
        config.setAllowedHeaders(Arrays.asList("*"));

        // How long the pre-flight request's result can be cached by the browser (in
        // seconds)
        config.setMaxAge(3600L); // 1 hour

        // Apply this CORS configuration to all paths (/**)
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
