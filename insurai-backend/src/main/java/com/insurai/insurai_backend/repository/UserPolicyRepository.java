package com.insurai.insurai_backend.repository;

import com.insurai.insurai_backend.entity.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserPolicyRepository extends JpaRepository<Policy, Long> {

    // Method to fetch policies by type AND status, ignoring case for both type and
    // status
    List<Policy> findByPolicyTypeIgnoreCaseAndStatusIgnoreCase(String policyType, String status);

}
