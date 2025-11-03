package com.insurai.insurai_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter

public class LoginResponse {
    private String token;
    private String message;

    public LoginResponse() {
    }

    public LoginResponse(String message, String token) {
        this.message = message;
        this.token = token;
    }
}
