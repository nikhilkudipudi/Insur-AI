package com.insurai.insurai_backend.controller;

import com.insurai.insurai_backend.dto.UpdateOrDeletePolicyRequest;
import com.insurai.insurai_backend.entity.Policy;
import com.insurai.insurai_backend.service.PolicyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/policies")
@RequiredArgsConstructor
public class PolicyController {

    private final PolicyService policyService;

    // ---------------------------
    // GET POLICIES BY TYPE
    // ---------------------------
    @GetMapping("/type/{policyType}")
    public ResponseEntity<List<Policy>> getByType(@PathVariable String policyType) {
        return ResponseEntity.ok(policyService.getPoliciesByType(policyType.toUpperCase()));
    }

    // ---------------------------
    // GET ALL POLICIES
    // ---------------------------
    @GetMapping("/all")
    public ResponseEntity<List<Policy>> getAll() {
        return ResponseEntity.ok(policyService.getAllPolicies());
    }

    // ---------------------------
    // ADD NEW POLICY
    // ---------------------------
    @PostMapping("/add")
    public ResponseEntity<?> addPolicy(@RequestBody Policy policy) {
        return ResponseEntity.ok(policyService.addPolicy(policy));
    }

    // ---------------------------
    // UPDATE POLICY (ADMIN PASSWORD REQUIRED)
    // ---------------------------
    @PutMapping("/update")
    public ResponseEntity<?> updatePolicy(@RequestBody UpdateOrDeletePolicyRequest req) {
        try {
            return ResponseEntity.ok(policyService.updatePolicy(req));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ---------------------------
    // DELETE POLICY (ADMIN PASSWORD REQUIRED)
    // ---------------------------
    @PostMapping("/delete")
    public ResponseEntity<?> deletePolicy(@RequestBody UpdateOrDeletePolicyRequest req) {
        try {
            return ResponseEntity.ok(policyService.deletePolicy(req));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
