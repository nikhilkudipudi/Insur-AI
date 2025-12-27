package com.insurai.insurai_backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    public String getHelpResponse(String userPrompt) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key="
                    + apiKey;

            // correct JSON structure for Gemini 1.5 API
            Map<String, Object> requestBody = new HashMap<>();

            // Contents
            Map<String, Object> content = new HashMap<>();
            Map<String, String> part = new HashMap<>();
            part.put("text", userPrompt);
            content.put("parts", new Map[] { part });
            requestBody.put("contents", new Map[] { content });

            // System Instruction
            Map<String, Object> systemInstruction = new HashMap<>();
            Map<String, String> systemPart = new HashMap<>();
            systemPart.put("text",
                    "You are an AI assistant for the 'InsurAI' insurance application. Your goal is to provide helpful, brief, and accurate support on insurance-related questions and application usage.");
            systemInstruction.put("parts", new Map[] { systemPart });
            requestBody.put("systemInstruction", systemInstruction);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                ObjectMapper mapper = new ObjectMapper();
                JsonNode root = mapper.readTree(response.getBody());
                // Extract text: candidates[0].content.parts[0].text
                return root.path("candidates").get(0).path("content").path("parts").get(0).path("text").asText();
            } else {
                return "Error: Received likely non-success status: " + response.getStatusCode();
            }

        } catch (Exception e) {
            e.printStackTrace();
            return "Sorry, I am currently unable to provide assistance. Error: " + e.getMessage();
        }
    }
}
