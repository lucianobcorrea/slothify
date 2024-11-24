package tcc.com.mapper;

import tcc.com.controller.response.user.UserChallengeResponse;
import tcc.com.domain.user.User;
import tcc.com.domain.user.UserDailyChallenge;
import tcc.com.domain.user.UserDailyData;

public class UserChallengeMapper {

    public static UserChallengeResponse toResponse(UserDailyData userDailyData, UserDailyChallenge userDailyChallenge, User user) {
        int total = defineTotalChallengeData(userDailyChallenge, userDailyData, user);
        int required = defineRequiredChallengeData(userDailyChallenge);

        return UserChallengeResponse.builder()
                .id(userDailyChallenge.getId())
                .completed(userDailyChallenge.isCompleted())
                .collected(userDailyChallenge.isCollected())
                .name(userDailyChallenge.getChallenge().getName())
                .total(total)
                .required(required)
                .percentage(calculatePercentage(total, required))
                .xpReward(userDailyChallenge.getChallenge().getXpReward())
                .coinsReward(userDailyChallenge.getChallenge().getCoinsReward())
                .build();
    }

    private static int defineTotalChallengeData(UserDailyChallenge userDailyChallenge, UserDailyData userDailyData, User user) {
        if (userDailyChallenge.getChallenge().getRequiredDragAndDropExercises() != null) {
            return userDailyData.getCompletedDragAndDropExercises();
        }
        if (userDailyChallenge.getChallenge().getRequiredMultipleChoiceExercises() != null) {
            return userDailyData.getCompletedMultipleChoiceExercises();
        }
        if (userDailyChallenge.getChallenge().getRequiredExercises() != null) {
            return userDailyData.getCompletedTotalExercises();
        }
        if (userDailyChallenge.getChallenge().getRequiredXp() != null) {
            return user.getCurrentXp();
        }
        if (userDailyChallenge.getChallenge().getRequiredSortingExercises() != null) {
            return userDailyData.getCompletedSortingExercises();
        }
        return 0;
    }

    private static int defineRequiredChallengeData(UserDailyChallenge userDailyChallenge) {
        if (userDailyChallenge.getChallenge().getRequiredDragAndDropExercises() != null) {
            return userDailyChallenge.getChallenge().getRequiredDragAndDropExercises();
        }
        if (userDailyChallenge.getChallenge().getRequiredMultipleChoiceExercises() != null) {
            return userDailyChallenge.getChallenge().getRequiredMultipleChoiceExercises();
        }
        if (userDailyChallenge.getChallenge().getRequiredExercises() != null) {
            return userDailyChallenge.getChallenge().getRequiredExercises();
        }
        if (userDailyChallenge.getChallenge().getRequiredXp() != null) {
            return userDailyChallenge.getChallenge().getRequiredXp();
        }
        if (userDailyChallenge.getChallenge().getRequiredSortingExercises() != null) {
            return userDailyChallenge.getChallenge().getRequiredSortingExercises();
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
