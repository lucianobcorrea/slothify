package tcc.com.controller.response.lesson;

import lombok.*;
import tcc.com.controller.response.exerciseCategory.ExerciseCategoryResponse;
import tcc.com.domain.lesson.ExerciseType;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LessonResponse {
    private Long id;
    private String title;
    private ExerciseType exerciseType;
    private ExerciseCategoryResponse exerciseCategory;
}
