package tcc.com.mapper;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tcc.com.controller.request.exercise.ExerciseRequest;
import tcc.com.controller.response.exercise.ExerciseResponse;
import tcc.com.domain.exercise.Exercise;
import tcc.com.domain.lesson.Lesson;

public class ExerciseMapper {

    public static Exercise toEntity(ExerciseRequest request, Lesson lesson) {
        Exercise exercise = new Exercise();
        exercise.setStatement(request.getStatement());
        exercise.setLesson(lesson);
        return exercise;
    }

    static String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString() + "/files/";

    public static ExerciseResponse toResponse(Exercise exercise) {
        ExerciseResponse response = new ExerciseResponse();
        response.setId(exercise.getId());
        response.setStatement(exercise.getStatement());
        response.setImage(baseUrl + exercise.getImage());
        return response;
    }
}
