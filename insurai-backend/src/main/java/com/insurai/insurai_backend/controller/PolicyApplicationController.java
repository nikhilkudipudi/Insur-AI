package com.insurai.insurai_backend.controller;

import com.insurai.insurai_backend.entity.PolicyApplication;
import com.insurai.insurai_backend.service.PolicyApplicationService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PolicyApplicationController {

    private final PolicyApplicationService applicationService;

    // User: Apply for a policy
    @PostMapping("/user/apply")
    public ResponseEntity<?> applyForPolicy(@RequestBody ApplyRequest request, Principal principal) {
        try {
            PolicyApplication app = applicationService.applyForPolicy(principal.getName(), request.getPolicyId());
            return ResponseEntity.ok(app);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Admin: Get all applications
    @GetMapping("/admin/applications")
    public ResponseEntity<List<PolicyApplication>> getAllApplications() {
        return ResponseEntity.ok(applicationService.getAllApplications());
    }

    // Admin: Update status
    @PostMapping("/admin/applications/status")
    public ResponseEntity<?> updateStatus(@RequestBody UpdateStatusRequest request) {
        try {
            PolicyApplication app = applicationService.updateStatus(request.getApplicationId(), request.getStatus());
            return ResponseEntity.ok(app);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Data
    static class ApplyRequest {
        private Long policyId;
    }

    @Data
    static class UpdateStatusRequest {
        private Long applicationId;
        private String status;
    }

    // User: Get my applications
    @GetMapping("/user/my-applications")
    public ResponseEntity<List<PolicyApplication>> getMyApplications(Principal principal) {
        try {
            List<PolicyApplication> apps = applicationService.getMyApplications(principal.getName());
            return ResponseEntity.ok(apps);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
