package com.insurai.insurai_backend.service;

import com.insurai.insurai_backend.entity.Policy;
import com.insurai.insurai_backend.entity.PolicyApplication;
import com.insurai.insurai_backend.entity.UserDetails;
import com.insurai.insurai_backend.repository.PolicyApplicationRepository;
import com.insurai.insurai_backend.repository.PolicyRepository;
import com.insurai.insurai_backend.repository.UserDetailsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PolicyApplicationService {

    private final PolicyApplicationRepository applicationRepository;
    private final UserDetailsRepository userDetailsRepository;
    private final PolicyRepository policyRepository;

    public PolicyApplication applyForPolicy(String userEmail, Long policyId) {
        UserDetails user = userDetailsRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Policy policy = policyRepository.findById(policyId)
                .orElseThrow(() -> new RuntimeException("Policy not found"));

        PolicyApplication application = new PolicyApplication();
        application.setUser(user);
        application.setPolicy(policy);
        application.setStatus("PENDING");

        return applicationRepository.save(application);
    }

    public List<PolicyApplication> getAllApplications() {
        return applicationRepository.findAll();
    }

    public PolicyApplication updateStatus(Long applicationId, String status) {
        PolicyApplication app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        app.setStatus(status);
        return applicationRepository.save(app);
    }

    public List<PolicyApplication> getMyApplications(String userEmail) {
        UserDetails user = userDetailsRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return applicationRepository.findByUser(user);
    }
}
