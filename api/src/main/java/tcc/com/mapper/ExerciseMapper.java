package tcc.com.mapper;

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

    public static ExerciseResponse toResponse(Exercise exercise) {
        ExerciseResponse response = new ExerciseResponse();
        response.setId(exercise.getId());
        response.setStatement(exercise.getStatement());
        response.setImage("http://localhost:8080/files/" + exercise.getImage());
        return response;
    }
}
