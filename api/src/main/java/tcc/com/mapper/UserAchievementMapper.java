package tcc.com.mapper;

import tcc.com.domain.achievement.Achievement;
import tcc.com.domain.user.User;
import tcc.com.domain.user.UserAchievement;

import java.time.LocalDateTime;

public class UserAchievementMapper {

    public static UserAchievement toEntity(User user, Achievement achievement) {
        UserAchievement userAchievement = new UserAchievement();

        userAchievement.setUser(user);
        userAchievement.setAchievement(achievement);
        userAchievement.setDataAchieved(LocalDateTime.now());

        return userAchievement;
    }
}
