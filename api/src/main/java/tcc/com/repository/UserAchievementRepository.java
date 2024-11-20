package tcc.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tcc.com.domain.achievement.Achievement;
import tcc.com.domain.user.User;
import tcc.com.domain.user.UserAchievement;

public interface UserAchievementRepository extends JpaRepository<UserAchievement, Long> {
    UserAchievement findByAchievement(Achievement achievement);
    UserAchievement findByAchievementAndUser(Achievement achievement, User user);
}
