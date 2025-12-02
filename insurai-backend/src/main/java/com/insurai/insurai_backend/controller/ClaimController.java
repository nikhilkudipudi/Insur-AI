package com.insurai.insurai_backend.controller;

import com.insurai.insurai_backend.entity.Claim;
import com.insurai.insurai_backend.service.ClaimService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/user/claims")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ClaimController {

    private final ClaimService claimService;

    // File a new claim
    @PostMapping
    public ResponseEntity<?> fileClaim(@RequestBody FileClaimRequest request, Principal principal) {
        try {
            Claim claim = claimService.fileClaim(
                    principal.getName(),
                    request.getPolicyId(),
                    request.getIncidentDate(),
                    request.getIncidentDescription(),
                    request.getClaimAmount());
            return ResponseEntity.ok(claim);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get my claims
    @GetMapping
    public ResponseEntity<List<Claim>> getMyClaims(Principal principal) {
        try {
            List<Claim> claims = claimService.getMyClaims(principal.getName());
            return ResponseEntity.ok(claims);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @Data
    static class FileClaimRequest {
        private Long policyId;
        private LocalDate incidentDate;
        private String incidentDescription;
        private Double claimAmount;
    }

    // Admin: Get all claims
    @GetMapping("/admin/all")
    public ResponseEntity<List<Claim>> getAllClaims() {
        try {
            List<Claim> claims = claimService.getAllClaims();
            return ResponseEntity.ok(claims);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Admin: Update claim status
    @PostMapping("/admin/status")
    public ResponseEntity<?> updateClaimStatus(@RequestBody UpdateClaimStatusRequest request) {
        try {
            Claim claim = claimService.updateClaimStatus(request.getClaimId(), request.getStatus());
            return ResponseEntity.ok(claim);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Data
    static class UpdateClaimStatusRequest {
        private Long claimId;
        private String status;
    }
}
