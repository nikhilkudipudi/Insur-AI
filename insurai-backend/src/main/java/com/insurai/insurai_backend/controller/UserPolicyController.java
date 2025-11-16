package com.insurai.insurai_backend.controller;

import com.insurai.insurai_backend.entity.Policy;
import com.insurai.insurai_backend.service.UserPolicyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/browse-policies")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // Ensure CORS is enabled
public class UserPolicyController {

    private final UserPolicyService userPolicyService;

    // --------------------------
    // GET ACTIVE POLICIES BY TYPE
    // Path: GET /api/user/browse-policies/{policyType}
    // --------------------------
    @GetMapping("/{policyType}")
    public ResponseEntity<List<Policy>> getActiveByType(@PathVariable String policyType) {
        // Pass the policy type to the service, which will filter by ACTIVE status
        return ResponseEntity.ok(userPolicyService.getActivePoliciesByType(policyType));
    }
}