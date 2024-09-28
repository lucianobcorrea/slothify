package tcc.com.mapper;

import tcc.com.controller.request.exercise.ExerciseRequest;
import tcc.com.domain.exercise.Exercise;
import tcc.com.domain.exerciseCategory.ExerciseCategory;
import tcc.com.domain.lesson.Lesson;

public class ExerciseMapper {

    public static Exercise toEntity(ExerciseRequest request, Lesson lesson, ExerciseCategory exerciseCategory) {
        Exercise exercise = new Exercise();
        exercise.setStatement(request.getStatement());
        exercise.setExerciseType(request.getExerciseType());
        exercise.setLesson(lesson);
        exercise.setExerciseCategory(exerciseCategory);
        return exercise;
    }
}
