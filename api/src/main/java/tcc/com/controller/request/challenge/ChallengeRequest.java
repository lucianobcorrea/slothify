package tcc.com.controller.request.challenge;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChallengeRequest {
    private String name;
    private Integer xpReward;
    private Integer coinsReward;
    private Integer requiredExercises;
    private Integer requiredMultipleChoiceExercises;
    private Integer requiredSortingExercises;
    private Integer requiredDragAndDropExercises;
    private Integer requiredXp;
}
