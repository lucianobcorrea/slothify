package tcc.com.mapper;

import tcc.com.controller.response.user.UserRankingResponse;
import tcc.com.domain.ranking.Ranking;

public class UserTopRankingMapper {

    public static UserRankingResponse toResponse(Ranking ranking) {
        return UserRankingResponse.builder()
                .timesInFirstPlace(ranking.getTimesInFirstPlace())
                .timesInSecondPlace(ranking.getTimesInSecondPlace())
                .timesInThirdPlace(ranking.getTimesInThirdPlace())
                .build();
    }
}
