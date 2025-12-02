package com.insurai.insurai_backend.service;

import com.insurai.insurai_backend.entity.Claim;
import com.insurai.insurai_backend.entity.Policy;
import com.insurai.insurai_backend.entity.UserDetails;
import com.insurai.insurai_backend.repository.ClaimRepository;
import com.insurai.insurai_backend.repository.PolicyRepository;
import com.insurai.insurai_backend.repository.UserDetailsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClaimService {

        private final ClaimRepository claimRepository;
        private final UserDetailsRepository userDetailsRepository;
        private final PolicyRepository policyRepository;

        public Claim fileClaim(String userEmail, Long policyId, LocalDate incidentDate,
                        String description, Double claimAmount) {
                UserDetails user = userDetailsRepository.findByEmail(userEmail)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                Policy policy = policyRepository.findById(policyId)
                                .orElseThrow(() -> new RuntimeException("Policy not found"));

                Claim claim = new Claim();
                claim.setUser(user);
                claim.setPolicy(policy);
                claim.setIncidentDate(incidentDate);
                claim.setIncidentDescription(description);
                claim.setClaimAmount(claimAmount);
                claim.setStatus("PENDING");

                return claimRepository.save(claim);
        }

        public List<Claim> getMyClaims(String userEmail) {
                UserDetails user = userDetailsRepository.findByEmail(userEmail)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                return claimRepository.findByUserOrderBySubmittedDateDesc(user);
        }

        public List<Claim> getAllClaims() {
                return claimRepository.findAll();
        }

        public Claim updateClaimStatus(Long claimId, String status) {
                Claim claim = claimRepository.findById(claimId)
                                .orElseThrow(() -> new RuntimeException("Claim not found"));

                claim.setStatus(status);
                return claimRepository.save(claim);
        }
}
