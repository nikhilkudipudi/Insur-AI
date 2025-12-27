package com.insurai.insurai_backend.service;

import com.insurai.insurai_backend.dto.UpdateOrDeletePolicyRequest;
import com.insurai.insurai_backend.entity.Policy;
import com.insurai.insurai_backend.entity.UserDetails;
import com.insurai.insurai_backend.repository.PolicyRepository;
import com.insurai.insurai_backend.repository.UserDetailsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PolicyService {

    private final PolicyRepository policyRepository;
    private final UserDetailsRepository userRepo;
    private final com.insurai.insurai_backend.repository.ClaimRepository claimRepository; // Inject ClaimRepository
    private final com.insurai.insurai_backend.repository.PolicyApplicationRepository policyApplicationRepository; // Inject
                                                                                                                  // PolicyApplicationRepository
    private final PasswordEncoder passwordEncoder;

    // ----------------------------------
    // GET ALL POLICIES BY TYPE
    // ----------------------------------
    public List<Policy> getPoliciesByType(String type) {
        return policyRepository.findByPolicyType(type);
    }

    // ----------------------------------
    // GET ALL POLICIES
    // ----------------------------------
    public List<Policy> getAllPolicies() {
        return policyRepository.findAll();
    }

    // ----------------------------------
    // ADD POLICY
    // ----------------------------------
    public Policy addPolicy(Policy policy) {
        return policyRepository.save(policy);
    }

    // ----------------------------------
    // VERIFY ADMIN PASSWORD
    // ----------------------------------
    private boolean verifyAdmin(String rawPassword) {
        UserDetails admin = userRepo.findByRole("ADMIN")
                .orElseThrow(() -> new RuntimeException("Admin account not found!"));

        return passwordEncoder.matches(rawPassword, admin.getPassword());
    }

    // ----------------------------------
    // UPDATE POLICY
    // ----------------------------------
    public Policy updatePolicy(UpdateOrDeletePolicyRequest req) {

        // Get admin user to check settings
        UserDetails admin = userRepo.findByRole("ADMIN")
                .orElseThrow(() -> new RuntimeException("Admin account not found!"));

        // Only verify password if required by settings
        if (admin.isRequirePasswordForActions()) {
            if (req.getAdminPassword() == null || req.getAdminPassword().isEmpty()) {
                throw new RuntimeException("Admin password is required!");
            }
            if (!passwordEncoder.matches(req.getAdminPassword(), admin.getPassword())) {
                throw new RuntimeException("Admin password is incorrect!");
            }
        }

        Policy policy = policyRepository.findById(req.getPolicyId())
                .orElseThrow(() -> new RuntimeException("Policy not found"));

        if (req.getPolicyName() != null)
            policy.setPolicyName(req.getPolicyName());
        if (req.getDescription() != null)
            policy.setDescription(req.getDescription());
        if (req.getPremiumAmount() != null)
            policy.setPremiumAmount(req.getPremiumAmount());
        if (req.getCoverageAmount() != null)
            policy.setCoverageAmount(req.getCoverageAmount());
        if (req.getDuration() != null)
            policy.setDuration(req.getDuration());
        if (req.getCriteria() != null)
            policy.setCriteria(req.getCriteria());
        if (req.getStatus() != null)
            policy.setStatus(req.getStatus());

        return policyRepository.save(policy);
    }

    // ----------------------------------
    // DELETE POLICY
    // ----------------------------------
    public String deletePolicy(UpdateOrDeletePolicyRequest req) {

        // Get admin user to check settings
        UserDetails admin = userRepo.findByRole("ADMIN")
                .orElseThrow(() -> new RuntimeException("Admin account not found!"));

        // Only verify password if required by settings
        if (admin.isRequirePasswordForActions()) {
            if (req.getAdminPassword() == null || req.getAdminPassword().isEmpty()) {
                throw new RuntimeException("Admin password is required!");
            }
            if (!passwordEncoder.matches(req.getAdminPassword(), admin.getPassword())) {
                throw new RuntimeException("Admin password is incorrect!");
            }
        }

        Policy policy = policyRepository.findById(req.getPolicyId())
                .orElseThrow(() -> new RuntimeException("Policy not found"));

        // Manual Cascade Delete: Remove related Claims and Applications first
        try {
            // 1. Delete associated claims
            List<com.insurai.insurai_backend.entity.Claim> claims = claimRepository.findByPolicy(policy);
            claimRepository.deleteAll(claims);

            // 2. Delete associated applications
            List<com.insurai.insurai_backend.entity.PolicyApplication> applications = policyApplicationRepository
                    .findByPolicy(policy);
            policyApplicationRepository.deleteAll(applications);

        } catch (Exception e) {
            throw new RuntimeException("Failed to delete related records (Claims/Applications). Deletion aborted.");
        }

        policyRepository.delete(policy);
        return "Policy deleted successfully!";
    }
}
