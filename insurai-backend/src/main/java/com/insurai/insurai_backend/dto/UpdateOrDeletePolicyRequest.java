package com.insurai.insurai_backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateOrDeletePolicyRequest {

    private Long policyId;

    // Fields for update (optional when deleting)
    private String policyName;
    private String description;
    private Double premiumAmount;
    private Double coverageAmount;
    private String duration;
    private String criteria;
    private String status;

    // Admin password verification
    private String adminPassword; // For both update & delete
}
