package com.onboardingbackend.BlogProjectBackend.comment.dto.req;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommentRequestDto {

    private String content;
    private Integer parentCommentId; // 대댓글 작성시, 부모의 댓글 id, 대댓글 없으면 null

}
