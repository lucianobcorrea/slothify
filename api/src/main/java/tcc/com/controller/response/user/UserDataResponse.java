package tcc.com.controller.response.user;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDataResponse {
    int percentageToNextLevel;
    Integer coins;
    boolean maxLevel;
    int actualXp;
    Integer nextLevel;
    int actualLevel;
    Integer xpToNextLevel;
    String levelColor;
}
