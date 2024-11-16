package tcc.com.controller.request.lesson;

import lombok.Getter;
import lombok.Setter;
import tcc.com.domain.lesson.ExerciseType;

@Getter
@Setter
public class LessonRequest {
    String title;
    ExerciseType exerciseType;
    int sequence;
}
