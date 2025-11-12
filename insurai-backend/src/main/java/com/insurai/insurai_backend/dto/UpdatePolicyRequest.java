package com.insurai.insurai_backend.dto;

import com.insurai.insurai_backend.entity.Policy;
import lombok.Data;

@Data
public class UpdatePolicyRequest {
    private String password;
    private Policy policy;
}
