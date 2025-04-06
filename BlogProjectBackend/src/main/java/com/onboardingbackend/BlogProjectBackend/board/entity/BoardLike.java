package com.onboardingbackend.BlogProjectBackend.board.entity;

import com.onboardingbackend.BlogProjectBackend.signup.entity.UserEntity;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"board_id", "user_id"}) //중복방지
        }
)
public class BoardLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "board_id", nullable = false )
    private Board board;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

}
