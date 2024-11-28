package tcc.com.controller.request.userAnswer;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AnswerRequest {

    private String answer;
    private boolean correct;
    private LocalDateTime startDate;
    private LocalDateTime finalDate;
}
