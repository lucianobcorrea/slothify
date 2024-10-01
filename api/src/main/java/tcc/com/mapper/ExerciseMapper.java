package tcc.com.mapper;

import tcc.com.controller.request.exercise.ExerciseRequest;
import tcc.com.domain.exercise.Exercise;
import tcc.com.domain.lesson.Lesson;

public class ExerciseMapper {

    public static Exercise toEntity(ExerciseRequest request, Lesson lesson) {
        Exercise exercise = new Exercise();
        exercise.setStatement(request.getStatement());
        exercise.setLesson(lesson);
        return exercise;
    }
}
