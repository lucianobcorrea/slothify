package tcc.com.mapper;

import tcc.com.controller.request.achievement.AchievementRequest;
import tcc.com.domain.achievement.Achievement;

public class AchievementMapper {

    public static Achievement toEntity(AchievementRequest request) {
        Achievement achievement = new Achievement();
        achievement.setName(request.getName());
        achievement.setDescription(request.getDescription());

        achievement.setXpReward(request.getXpReward());
        achievement.setCoinsReward(request.getCoinsReward());

        achievement.setRequiredExercises(request.getRequiredExercises());
        achievement.setRequiredMultipleChoiceExercises(request.getRequiredMultipleChoiceExercises());
        achievement.setRequiredSortingExercises(request.getRequiredSortingExercises());
        achievement.setRequiredDragAndDropExercises(request.getRequiredDragAndDropExercises());
        achievement.setRequiredXp(request.getRequiredXp());
        achievement.setRequiredUserLevel(request.getRequiredUserLevel());

        return achievement;
    }
}
