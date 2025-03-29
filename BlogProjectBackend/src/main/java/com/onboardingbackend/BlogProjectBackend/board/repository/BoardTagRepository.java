package com.onboardingbackend.BlogProjectBackend.board.repository;

import com.onboardingbackend.BlogProjectBackend.board.entity.BoardTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardTagRepository extends JpaRepository<BoardTag, Integer> {
    List<BoardTag> findByTag_Name(String tagName);
    List<BoardTag> findByBoard_Id(Integer boardId);
}
