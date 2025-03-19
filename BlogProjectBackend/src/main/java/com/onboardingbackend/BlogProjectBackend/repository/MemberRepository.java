package com.onboardingbackend.BlogProjectBackend.repository;

import com.onboardingbackend.BlogProjectBackend.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {

}
