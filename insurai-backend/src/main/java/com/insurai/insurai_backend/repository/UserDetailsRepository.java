package com.insurai.insurai_backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.insurai.insurai_backend.entity.UserDetails;
import java.util.Optional;

public interface UserDetailsRepository extends JpaRepository<UserDetails, Long> {
    Optional<UserDetails> findByEmail(String email);
}

