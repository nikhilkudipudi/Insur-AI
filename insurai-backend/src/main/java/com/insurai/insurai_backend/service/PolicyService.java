package com.insurai.insurai_backend.service;

import com.insurai.insurai_backend.dto.UpdateOrDeletePolicyRequest;
import com.insurai.insurai_backend.entity.Policy;
import com.insurai.insurai_backend.entity.UserDetails;
import com.insurai.insurai_backend.repository.PolicyRepository;
import com.insurai.insurai_backend.repository.UserDetailsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
@RequiredArgsConstructor
public class PolicyService {

    private final PolicyRepository policyRepository;
    private final UserDetailsRepository userRepo;
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

        if (!verifyAdmin(req.getAdminPassword())) {
            throw new RuntimeException("Admin password is incorrect!");
        }

        Policy policy = policyRepository.findById(req.getPolicyId())
                .orElseThrow(() -> new RuntimeException("Policy not found"));

        if (req.getPolicyName() != null) policy.setPolicyName(req.getPolicyName());
        if (req.getDescription() != null) policy.setDescription(req.getDescription());
        if (req.getPremiumAmount() != null) policy.setPremiumAmount(req.getPremiumAmount());
        if (req.getCoverageAmount() != null) policy.setCoverageAmount(req.getCoverageAmount());
        if (req.getDuration() != null) policy.setDuration(req.getDuration());
        if (req.getCriteria() != null) policy.setCriteria(req.getCriteria());
        if (req.getStatus() != null) policy.setStatus(req.getStatus());

        return policyRepository.save(policy);
    }


    // ----------------------------------
    // DELETE POLICY
    // ----------------------------------
    public String deletePolicy(UpdateOrDeletePolicyRequest req) {

        if (!verifyAdmin(req.getAdminPassword())) {
            throw new RuntimeException("Admin password is incorrect!");
        }

        Policy policy = policyRepository.findById(req.getPolicyId())
                .orElseThrow(() -> new RuntimeException("Policy not found"));

        policyRepository.delete(policy);
        return "Policy deleted successfully!";
    }
}
