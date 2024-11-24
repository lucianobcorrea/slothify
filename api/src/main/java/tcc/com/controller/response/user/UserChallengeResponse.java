package tcc.com.controller.response.user;

import lombok.*;
import tcc.com.domain.user.UserDailyChallenge;

import java.util.function.Function;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserChallengeResponse {

    Long id;
    String name;
    boolean collected;
    boolean completed;
    Integer xpReward;
    Integer coinsReward;

    Integer total;
    Integer required;
    Integer percentage;
}
