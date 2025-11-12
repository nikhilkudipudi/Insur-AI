package com.insurai.insurai_backend.service;

import com.insurai.insurai_backend.entity.Policy;
import com.insurai.insurai_backend.repository.PolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PolicyService {

    @Autowired
    private PolicyRepository policyRepository;

    // Create a new policy
    public Policy createPolicy(Policy policy) {
        return policyRepository.save(policy);
    }

    // Get all policies
    public List<Policy> getAllPolicies() {
        return policyRepository.findAll();
    }

    // Get one policy by ID
    public Policy getPolicyById(Long id) {
        return policyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Policy not found with ID: " + id));
    }

    // Update a policy
    public Policy updatePolicy(Long id, Policy updatedPolicy) {
        Policy existing = getPolicyById(id);
        existing.setPolicyName(updatedPolicy.getPolicyName());
        existing.setPolicyType(updatedPolicy.getPolicyType());
        existing.setDescription(updatedPolicy.getDescription());
        existing.setPremiumAmount(updatedPolicy.getPremiumAmount());
        existing.setCoverageAmount(updatedPolicy.getCoverageAmount());
        existing.setDuration(updatedPolicy.getDuration());
        existing.setCriteria(updatedPolicy.getCriteria());
        existing.setStatus(updatedPolicy.getStatus());
        return policyRepository.save(existing);
    }

    // Delete a policy
    public void deletePolicy(Long id) {
        if (!policyRepository.existsById(id)) {
            throw new RuntimeException("Policy not found with ID: " + id);
        }
        policyRepository.deleteById(id);
    }
}
