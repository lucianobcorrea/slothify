package tcc.com.controller.request.exerciseOption;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExerciseOptionRequest {

    String content;
    Boolean correct;
    Integer correctOrder;
    String category;
}
