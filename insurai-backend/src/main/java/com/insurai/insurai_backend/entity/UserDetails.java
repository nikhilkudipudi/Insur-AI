package com.insurai.insurai_backend.entity;



import jakarta.persistence.*;

@Entity
@Table(name = "user_details")
public class UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String phoneNumber;

    public UserDetails() {}

    public UserDetails(String email, String password, String phoneNumber) {
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getPhoneNumber() {
        return phoneNumber;
    }
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
