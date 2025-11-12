package com.insurai.insurai_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "policies")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Policy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String policyName;

    @Column(nullable = false)
    private String policyType;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private Double premiumAmount;

    @Column(nullable = false)
    private Double coverageAmount;

    @Column(nullable = false)
    private Integer duration; // in months or years

    @Column(nullable = false)
    private String criteria; // 🆕 your custom field

    @Column(nullable = false)
    private String status = "ACTIVE"; // ACTIVE / INACTIVE

    private LocalDateTime createdDate = LocalDateTime.now();

    private LocalDateTime updatedDate = LocalDateTime.now();

    @PreUpdate
    public void setLastUpdate() {
        this.updatedDate = LocalDateTime.now();
    }
}
