package com.onboardingbackend.BlogProjectBackend.signup.repository;

import com.onboardingbackend.BlogProjectBackend.signup.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    Boolean existsByUsername(String username);

    UserEntity findByUsername(String username);
}
