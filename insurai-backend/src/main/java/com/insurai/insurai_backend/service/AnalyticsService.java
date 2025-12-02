package com.insurai.insurai_backend.service;

import com.insurai.insurai_backend.dto.AnalyticsDTO;
import com.insurai.insurai_backend.entity.Claim;
import com.insurai.insurai_backend.entity.PolicyApplication;
import com.insurai.insurai_backend.repository.ClaimRepository;
import com.insurai.insurai_backend.repository.PolicyApplicationRepository;
import com.insurai.insurai_backend.repository.UserDetailsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final UserDetailsRepository userDetailsRepository;
    private final ClaimRepository claimRepository;
    private final PolicyApplicationRepository applicationRepository;

    public AnalyticsDTO getAnalytics() {
        AnalyticsDTO dto = new AnalyticsDTO();

        // Total Customers (assuming role "USER")
        // Note: In a real app we might filter by role, but for now count all users or
        // just count all
        dto.setTotalCustomers(userDetailsRepository.count());

        // Claims Stats
        List<Claim> allClaims = claimRepository.findAll();
        dto.setTotalClaims(allClaims.size());

        Map<String, Long> claimsByStatus = allClaims.stream()
                .collect(Collectors.groupingBy(Claim::getStatus, Collectors.counting()));
        dto.setClaimsByStatus(claimsByStatus);

        // Applications Stats
        List<PolicyApplication> allApplications = applicationRepository.findAll();
        dto.setTotalApplications(allApplications.size());

        Map<String, Long> appsByType = allApplications.stream()
                .collect(Collectors.groupingBy(
                        app -> app.getPolicy().getPolicyType(),
                        Collectors.counting()));
        dto.setApplicationsByPolicyType(appsByType);

        return dto;
    }
}
