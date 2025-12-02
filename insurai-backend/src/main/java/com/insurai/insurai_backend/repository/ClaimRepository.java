package com.insurai.insurai_backend.repository;

import com.insurai.insurai_backend.entity.Claim;
import com.insurai.insurai_backend.entity.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClaimRepository extends JpaRepository<Claim, Long> {
    List<Claim> findByUser(UserDetails user);

    List<Claim> findByUserOrderBySubmittedDateDesc(UserDetails user);
}
