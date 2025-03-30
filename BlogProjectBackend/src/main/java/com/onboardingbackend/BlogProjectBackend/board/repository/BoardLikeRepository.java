package com.onboardingbackend.BlogProjectBackend.board.repository;

import com.onboardingbackend.BlogProjectBackend.board.entity.Board;
import com.onboardingbackend.BlogProjectBackend.board.entity.BoardLike;
import com.onboardingbackend.BlogProjectBackend.signup.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BoardLikeRepository extends JpaRepository<BoardLike, Integer> {

    Optional<BoardLike> findByBoardAndUser(Board board, UserEntity user);
}
