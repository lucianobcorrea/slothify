package tcc.com.mapper;

import tcc.com.controller.request.challenge.ChallengeRequest;
import tcc.com.domain.challenge.Challenge;

public class ChallengeMapper {

    public static Challenge toEntity(ChallengeRequest request) {
        Challenge challenge = new Challenge();
        challenge.setName(request.getName());

        challenge.setXpReward(request.getXpReward());
        challenge.setCoinsReward(request.getCoinsReward());

        challenge.setRequiredExercises(request.getRequiredExercises());
        challenge.setRequiredMultipleChoiceExercises(request.getRequiredMultipleChoiceExercises());
        challenge.setRequiredSortingExercises(request.getRequiredSortingExercises());
        challenge.setRequiredDragAndDropExercises(request.getRequiredDragAndDropExercises());
        challenge.setRequiredXp(request.getRequiredXp());

        return challenge;
    }
}
