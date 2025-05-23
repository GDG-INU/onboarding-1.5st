package com.onboardingbackend.BlogProjectBackend.board.repository;

import com.onboardingbackend.BlogProjectBackend.board.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Integer> {
    Optional<Tag> findByName(String name);
}
