package tcc.com.controller.response.user;

import lombok.*;

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
