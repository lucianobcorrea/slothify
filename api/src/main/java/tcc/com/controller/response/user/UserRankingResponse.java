package tcc.com.controller.response.user;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserRankingResponse {
    private int timesInFirstPlace;
    private int timesInSecondPlace;
    private int timesInThirdPlace;
}
