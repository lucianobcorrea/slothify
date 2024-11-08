package tcc.com.mapper;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tcc.com.controller.response.ranking.RankingResponse;
import tcc.com.domain.ranking.Ranking;
import tcc.com.domain.user.User;

public class RankingMapper {

    public static RankingResponse toResponse(User user, Ranking ranking) {
        String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString() + "/files/";
        return RankingResponse.builder()
                .id(user.getId())
                .avatar(user.getAvatar() != null ? baseUrl + user.getAvatar() : null)
                .username(user.getUsername())
                .points(ranking.getPoints())
                .color(user.getColor())
                .build();
    }
}
