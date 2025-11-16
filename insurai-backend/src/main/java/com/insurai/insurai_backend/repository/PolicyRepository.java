package com.insurai.insurai_backend.repository;

import com.insurai.insurai_backend.entity.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PolicyRepository extends JpaRepository<Policy, Long> {

    List<Policy> findByPolicyTypeIgnoreCase(String policyType);


}
