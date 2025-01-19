package tcc.com.mapper;

import tcc.com.controller.request.challenge.ChallengeRequest;
import tcc.com.controller.response.challenge.ChallengeCollectResponse;
import tcc.com.controller.response.challenge.ChallengeResponse;
import tcc.com.domain.challenge.Challenge;
import tcc.com.domain.user.UserDailyChallenge;

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

    public static ChallengeCollectResponse toResponse(UserDailyChallenge userDailyChallenge, int xpReward) {
        ChallengeCollectResponse response = new ChallengeCollectResponse();
        response.setCoinsReward(userDailyChallenge.getChallenge().getCoinsReward());
        response.setXpReward(xpReward);
        return response;
    }

    public static ChallengeResponse toResponseAdmin(Challenge challenge) {
        ChallengeResponse response = new ChallengeResponse();
        response.setId(challenge.getId());
        response.setName(challenge.getName());
        response.setXpReward(challenge.getXpReward());
        response.setCoinsReward(challenge.getCoinsReward());
        response.setRequiredExercises(challenge.getRequiredExercises());
        response.setRequiredMultipleChoiceExercises(challenge.getRequiredMultipleChoiceExercises());
        response.setRequiredSortingExercises(challenge.getRequiredSortingExercises());
        response.setRequiredDragAndDropExercises(challenge.getRequiredDragAndDropExercises());
        response.setRequiredXp(challenge.getRequiredXp());
        return response;
    }
}
