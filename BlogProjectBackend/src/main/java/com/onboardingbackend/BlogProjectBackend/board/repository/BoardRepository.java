package com.onboardingbackend.BlogProjectBackend.board.repository;

import com.onboardingbackend.BlogProjectBackend.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<Board, Integer> {

    @Modifying
    @Query(value = "update Board b set b.viewCount = b.viewCount + 1 where b.id = :id")  //Race condition방지
    void incrementViewCount(@Param("id") Integer id);
}