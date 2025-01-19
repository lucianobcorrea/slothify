package tcc.com.controller.response.challenge;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeResponse {
    private Long id;
    private String name;
    private Integer xpReward;
    private Integer coinsReward;
    private Integer requiredExercises;
    private Integer requiredMultipleChoiceExercises;
    private Integer requiredSortingExercises;
    private Integer requiredDragAndDropExercises;
    private Integer requiredXp;
}
