package tcc.com.mapper;

import tcc.com.controller.response.ranking.RankingResponse;
import tcc.com.domain.ranking.Ranking;
import tcc.com.domain.user.User;

public class RankingMapper {

    public static RankingResponse toResponse(User user, Ranking ranking) {
        return RankingResponse.builder()
                .id(user.getId())
                .avatar(user.getAvatar() != null ? "http://localhost:8080/files/" + user.getAvatar() : null)
                .username(user.getUsername())
                .points(ranking.getPoints())
                .color(user.getColor())
                .build();
    }
}
