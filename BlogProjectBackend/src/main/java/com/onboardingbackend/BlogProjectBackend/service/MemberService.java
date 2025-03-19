package com.onboardingbackend.BlogProjectBackend.service;

import com.onboardingbackend.BlogProjectBackend.dto.MemberDTO;
import com.onboardingbackend.BlogProjectBackend.entity.MemberEntity;
import com.onboardingbackend.BlogProjectBackend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    //1.dto->entity 변환
    //2. repository의 save 메서드 호출

    public void save(MemberDTO memberDTO) {
        MemberEntity memberEntity=MemberEntity.toMemberEntity(memberDTO);
        memberRepository.save(memberEntity);
    }
}
