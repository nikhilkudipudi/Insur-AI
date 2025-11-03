package com.insurai.insurai_backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JWTUtil {

    private static final String SECRET_KEY = "404E635266556A586E32723538782F413F4428472B4B6250645367566B5970337336763979244226452948404D6351655468576D5A7134743777217A25432A462D4A2B4D625167556A586E32723538782F413F4428472B4B6250645367566B5970337336763979244226452948404D6351655468576D5A7134743777217A25432A462D4A";
    private static final long EXPIRATION_TIME = 15 * 60 * 1000; // 15 minutes

    public String generateToken(String email) {
        SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return getClaims(token).getSubject();
    }

    public boolean isTokenValid(String token) {
        try {
            Claims claims = getClaims(token);
            return claims.getExpiration().after(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    private Claims getClaims(String token) {
        SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
