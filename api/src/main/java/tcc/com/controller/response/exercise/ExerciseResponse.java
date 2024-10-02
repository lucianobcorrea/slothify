package tcc.com.controller.response.exercise;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExerciseResponse {
    private Long id;
    private String statement;
    private String image;
}
