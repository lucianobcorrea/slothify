package tcc.com.controller.request.userAnswer;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UserAnswerRequest {

    boolean correct;
    String answer;
    LocalDateTime answerDate;
}
