package tcc.com.mapper;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tcc.com.controller.request.achievement.AchievementRequest;
import tcc.com.controller.response.achievement.AchievementResponse;
import tcc.com.domain.achievement.Achievement;
import tcc.com.domain.user.User;
import tcc.com.domain.user.UserData;

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

    static String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString() + "/files/";

    public static AchievementResponse toResponse(Achievement achievement, UserData userData, User user, boolean userHas) {
        int total = defineTotalAchievementData(achievement, userData, user);
        int required = defineRequiredAchievementData(achievement);

        return AchievementResponse.builder()
                .id(achievement.getId())
                .name(achievement.getName())
                .description(achievement.getDescription())
                .image(baseUrl + achievement.getImage())
                .total(total)
                .required(required)
                .percentage(14)
                .userHas(userHas)
                .percentage(calculatePercentage(total, required))
                .build();
    }

    private static int defineTotalAchievementData(Achievement achievement, UserData userData, User user) {
        if (achievement.getRequiredDragAndDropExercises() != null) {
            return userData.getCompletedDragAndDropExercises();
        }
        if (achievement.getRequiredMultipleChoiceExercises() != null) {
            return userData.getCompletedMultipleChoiceExercises();
        }
        if (achievement.getRequiredExercises() != null) {
            return userData.getCompletedTotalExercises();
        }
        if (achievement.getRequiredUserLevel() != null) {
            return user.getLevel().getLevelNumber();
        }
        if (achievement.getRequiredXp() != null) {
            return user.getCurrentXp();
        }
        if (achievement.getRequiredSortingExercises() != null) {
            return userData.getCompletedSortingExercises();
        }
        return 0;
    }

    private static int defineRequiredAchievementData(Achievement achievement) {
        if (achievement.getRequiredDragAndDropExercises() != null) {
            return achievement.getRequiredDragAndDropExercises();
        }
        if (achievement.getRequiredMultipleChoiceExercises() != null) {
            return achievement.getRequiredMultipleChoiceExercises();
        }
        if (achievement.getRequiredExercises() != null) {
            return achievement.getRequiredExercises();
        }
        if (achievement.getRequiredUserLevel() != null) {
            return achievement.getRequiredUserLevel();
        }
        if (achievement.getRequiredXp() != null) {
            return achievement.getRequiredXp();
        }
        if (achievement.getRequiredSortingExercises() != null) {
            return achievement.getRequiredSortingExercises();
        }
        return 0;
    }

    private static int calculatePercentage(int total, int required) {
        if (required == 0) {
            return 0;
        }
        int percentage = (int) ((double) total / required * 100);
        return Math.min(percentage, 100);
    }
}
