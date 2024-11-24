package tcc.com.utils;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import tcc.com.domain.challenge.Challenge;
import tcc.com.domain.user.User;
import tcc.com.domain.user.UserDailyChallenge;
import tcc.com.domain.user.UserDailyData;
import tcc.com.repository.UserDailyChallengeRepository;
import tcc.com.repository.UserDailyDataRepository;

@Component
public class CompleteChallenge {

    @Autowired
    private UserDailyChallengeRepository userDailyChallengeRepository;

    @Autowired
    private UserDailyDataRepository userDailyDataRepository;

    public void checkAndCompleteChallenge(User user) {
        UserDailyData userDailyData = userDailyDataRepository.findByUser(user);

        if(userDailyData != null) {
            int userXp = user.getCurrentXp();
            int completedMultipleChoice = userDailyData.getCompletedMultipleChoiceExercises();
            int completedSorting = userDailyData.getCompletedSortingExercises();
            int completedDragAndDrop = userDailyData.getCompletedDragAndDropExercises();
            int completedTotalExercises = userDailyData.getCompletedTotalExercises();

            List<UserDailyChallenge> userDailyChallenges = userDailyChallengeRepository.findByUser(user);
            if (!userDailyChallenges.isEmpty()) {
                for (UserDailyChallenge userChallenge : userDailyChallenges) {
                    Challenge challenge = userChallenge.getChallenge();

                    boolean isCompleted = true;

                    if (challenge.getRequiredXp() != null && userXp < challenge.getRequiredXp()) {
                        isCompleted = false;
                    }

                    if (challenge.getRequiredMultipleChoiceExercises() != null
                            && completedMultipleChoice < challenge.getRequiredMultipleChoiceExercises()) {
                        isCompleted = false;
                    }

                    if (challenge.getRequiredSortingExercises() != null
                            && completedSorting < challenge.getRequiredSortingExercises()) {
                        isCompleted = false;
                    }

                    if (challenge.getRequiredDragAndDropExercises() != null
                            && completedDragAndDrop < challenge.getRequiredDragAndDropExercises()) {
                        isCompleted = false;
                    }

                    if (challenge.getRequiredExercises() != null
                            && completedTotalExercises < challenge.getRequiredExercises()) {
                        isCompleted = false;
                    }

                    if (isCompleted) {
                        userChallenge.setCompleted(true);
                        userDailyChallengeRepository.save(userChallenge);
                    }
                }
            }
        }else {
            UserDailyData userNewDailyData = new UserDailyData();
            userNewDailyData.setUser(user);
            userDailyDataRepository.save(userNewDailyData);
        }
    }
}
