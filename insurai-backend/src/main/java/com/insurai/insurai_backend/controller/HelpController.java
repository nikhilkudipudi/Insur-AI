package com.insurai.insurai_backend.controller;

import com.insurai.insurai_backend.service.GeminiService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/help")
public class HelpController {

    private final GeminiService geminiService;

    public HelpController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/query")
    public String handleHelpQuery(@RequestBody String userQuery) {
        // Simple string body is expected. In a real app, might want a DTO.
        // The user prompt example used raw string.
        System.out.println("GEMINIIIII");
        return geminiService.getHelpResponse(userQuery);
    }
}
