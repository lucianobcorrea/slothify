package tcc.com.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import tcc.com.domain.achievement.Achievement;
import tcc.com.domain.level.Level;
import tcc.com.domain.user.User;
import tcc.com.domain.user.UserAchievement;
import tcc.com.mapper.UserAchievementMapper;
import tcc.com.repository.AchievementRepository;
import tcc.com.repository.LevelRepository;
import tcc.com.repository.UserAchievementRepository;
import tcc.com.repository.UserRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class AssignAchievement {

    @Autowired
    private AchievementRepository achievementRepository;

    @Autowired
    private UserAchievementRepository userAchievementRepository;

    @Autowired
    private LevelRepository levelRepository;

    @Autowired
    private UserRepository userRepository;

    public void checkAndAssignAchievement(User user) {
        Level level = user.getLevel();
        int userLevel = level.getLevelNumber();

        List<Achievement> achievableAchievementsByLevel = achievementRepository.findByRequiredUserLevelLessThanEqual(userLevel);

        Set<Achievement> allAchievableAchievements = new HashSet<>();
        allAchievableAchievements.addAll(achievableAchievementsByLevel);

        for (Achievement achievement : allAchievableAchievements) {
            if(userAchievementRepository.findByAchievement(achievement) == null) {
                UserAchievement userAchievement = UserAchievementMapper.toEntity(user, achievement);
                userAchievementRepository.save(userAchievement);

                if(achievement.getCoinsReward() != null) {
                    user.setCoins(user.getCoins() + achievement.getCoinsReward());
                }

                if(achievement.getXpReward() != null) {
                    user.setCurrentXp(user.getCurrentXp() + achievement.getXpReward());

                    Level nextLevel = levelRepository.findByLevelNumber(userLevel + 1);

                    if(nextLevel != null) {
                        if(user.getCurrentXp() >= nextLevel.getRequiredXp()) {
                            user.setLevel(nextLevel);
                        }
                    }
                }

                userRepository.save(user);
            }
        }
    }
}
