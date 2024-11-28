package tcc.com.controller.response.userAnswer;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnswerResponse {
    private boolean isCorrect;
    private String message;
    private int xpReward;
    private int coinsReward;
}
