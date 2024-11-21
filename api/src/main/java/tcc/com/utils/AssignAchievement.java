package tcc.com.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import tcc.com.domain.achievement.Achievement;
import tcc.com.domain.level.Level;
import tcc.com.domain.user.User;
import tcc.com.domain.user.UserAchievement;
import tcc.com.domain.user.UserData;
import tcc.com.mapper.UserAchievementMapper;
import tcc.com.repository.*;

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

    @Autowired
    private UserDataRepository userDataRepository;

    public void checkAndAssignAchievement(User user) {
        UserData userData = userDataRepository.findByUser(user);

        Level level = user.getLevel();
        int userLevel = level.getLevelNumber();
        int userXp = user.getCurrentXp();
        int completedMultipleChoice = userData.getCompletedMultipleChoiceExercises();
        int completedSorting = userData.getCompletedSortingExercises();
        int completedDragAndDrop = userData.getCompletedDragAndDropExercises();
        int completedTotalExercises = userData.getCompletedTotalExercises();

        List<Achievement> achievableAchievementsByLevel = achievementRepository.findByRequiredUserLevelLessThanEqual(userLevel);
        List<Achievement> achievableAchievementsByXp = achievementRepository.findByRequiredXpLessThanEqual(userXp);

        List<Achievement> achievableAchievementsByMultipleChoice = achievementRepository.findByRequiredMultipleChoiceExercisesLessThanEqual(completedMultipleChoice);
        List<Achievement> achievableAchievementsBySorting = achievementRepository.findByRequiredSortingExercisesLessThanEqual(completedSorting);
        List<Achievement> achievableAchievementsByDragAndDrop = achievementRepository.findByRequiredDragAndDropExercisesLessThanEqual(completedDragAndDrop);
        List<Achievement> achievableAchievementsByTotalExercises = achievementRepository.findByRequiredExercisesLessThanEqual(completedTotalExercises);

        Set<Achievement> allAchievableAchievements = new HashSet<>();
        allAchievableAchievements.addAll(achievableAchievementsByMultipleChoice);
        allAchievableAchievements.addAll(achievableAchievementsBySorting);
        allAchievableAchievements.addAll(achievableAchievementsByDragAndDrop);
        allAchievableAchievements.addAll(achievableAchievementsByXp);
        allAchievableAchievements.addAll(achievableAchievementsByLevel);
        allAchievableAchievements.addAll(achievableAchievementsByTotalExercises);

        for (Achievement achievement : allAchievableAchievements) {
            if(userAchievementRepository.findByUserAndAchievement(user, achievement) == null) {
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
