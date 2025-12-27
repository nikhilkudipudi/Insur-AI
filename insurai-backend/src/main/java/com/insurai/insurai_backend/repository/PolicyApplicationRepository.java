package com.insurai.insurai_backend.repository;

import com.insurai.insurai_backend.entity.PolicyApplication;
import com.insurai.insurai_backend.entity.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PolicyApplicationRepository extends JpaRepository<PolicyApplication, Long> {
    List<PolicyApplication> findByUser(UserDetails user);

    List<PolicyApplication> findByStatus(String status);

    List<PolicyApplication> findByPolicy(com.insurai.insurai_backend.entity.Policy policy);
}
