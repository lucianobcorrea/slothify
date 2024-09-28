package tcc.com.controller.request.exercise;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
import tcc.com.domain.exercise.ExerciseType;

@Getter @Setter
public class ExerciseRequest {

    ExerciseType exerciseType;
    String statement;
    MultipartFile image;
    Long lessonId;
    Long exerciseCategoryId;
}
