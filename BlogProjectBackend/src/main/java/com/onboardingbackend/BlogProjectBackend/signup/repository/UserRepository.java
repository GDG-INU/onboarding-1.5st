package com.onboardingbackend.BlogProjectBackend.signup.repository;

import com.onboardingbackend.BlogProjectBackend.signup.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {


    Boolean existsByEmail(String email);

    UserEntity findByUsername(String email);


}
