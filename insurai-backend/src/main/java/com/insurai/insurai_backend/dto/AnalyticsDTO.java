package com.insurai.insurai_backend.dto;

import lombok.Data;
import java.util.Map;

@Data
public class AnalyticsDTO {
    private long totalCustomers;
    private long totalClaims;
    private long totalApplications;
    private Map<String, Long> claimsByStatus;
    private Map<String, Long> applicationsByPolicyType;
}
