package tcc.com.controller.response.exerciseOption;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExerciseOptionResponse {
    private String content;
    private Boolean correct;
    private Integer correctOrder;
    private String category;
}
