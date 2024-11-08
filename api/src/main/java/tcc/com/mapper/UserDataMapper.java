package tcc.com.mapper;

import tcc.com.controller.response.user.UserDataResponse;

public class UserDataMapper {

    public static UserDataResponse toResponse(int percentageToNextLevel, boolean maxLevel, int actualXp, Integer nextLevel, int actualLevel, Integer xpToNextLevel, String levelColor, Integer coins) {
        return UserDataResponse.builder()
                .percentageToNextLevel(percentageToNextLevel)
                .maxLevel(maxLevel)
                .actualXp(actualXp)
                .nextLevel(nextLevel)
                .actualLevel(actualLevel)
                .xpToNextLevel(xpToNextLevel)
                .levelColor(levelColor)
                .coins(coins)
                .build();
    }
}
