package tcc.com.mapper;

import tcc.com.controller.response.user.UserDataResponse;
import tcc.com.domain.offensive.Offensive;

public class UserDataMapper {

    public static UserDataResponse toResponse(int percentageToNextLevel, boolean maxLevel, int actualXp,
                                              Integer nextLevel, int actualLevel, Integer xpToNextLevel, String levelColor, Integer coins,
                                              boolean completedOffensiveToday, Offensive offensive) {
        return UserDataResponse.builder()
                .percentageToNextLevel(percentageToNextLevel)
                .maxLevel(maxLevel)
                .actualXp(actualXp)
                .nextLevel(nextLevel)
                .actualLevel(actualLevel)
                .xpToNextLevel(xpToNextLevel)
                .levelColor(levelColor)
                .coins(coins)
                .completedOffensiveToday(completedOffensiveToday)
                .offensive(offensive.getOffensive())
                .build();
    }
}
