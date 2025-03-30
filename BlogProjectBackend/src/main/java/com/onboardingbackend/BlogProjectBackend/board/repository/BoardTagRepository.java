package com.onboardingbackend.BlogProjectBackend.board.repository;

import com.onboardingbackend.BlogProjectBackend.board.entity.BoardTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BoardTagRepository extends JpaRepository<BoardTag, Integer> {

    @Query("SELECT bt FROM BoardTag bt JOIN FETCH bt.board b WHERE bt.tag.name = :tagName")
    List<BoardTag> findByTag_NameFetchBoard(@Param("tagName") String tagName);
}
