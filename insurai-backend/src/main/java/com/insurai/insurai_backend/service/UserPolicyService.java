package com.insurai.insurai_backend.service;

import com.insurai.insurai_backend.repository.PolicyRepository;
import com.insurai.insurai_backend.repository.UserPolicyRepository;
import com.insurai.insurai_backend.entity.Policy;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserPolicyService {

    private final UserPolicyRepository userPolicyRepository;

    // ----------------------------------
    // GET ACTIVE POLICIES BY TYPE
    // ----------------------------------
    public List<Policy> getActivePoliciesByType(String type) {
        // Enforce fetching only ACTIVE policies
        final String ACTIVE_STATUS = "ACTIVE";
        System.out.println("UserPolicyService: Querying DB for type=" + type + " and status=" + ACTIVE_STATUS);
        return userPolicyRepository.findByPolicyTypeIgnoreCaseAndStatusIgnoreCase(type, ACTIVE_STATUS);
    }

    // Note: No add/update/delete methods are needed here for the user side
}