package tcc.com.mapper;

import tcc.com.controller.request.exerciseOption.ExerciseOptionRequest;
import tcc.com.domain.exercise.Exercise;
import tcc.com.domain.exerciseOption.ExerciseOption;

public class ExerciseOptionMapper {

    public static ExerciseOption toEntity(ExerciseOptionRequest request, Exercise exercise) {
        ExerciseOption exerciseOption = new ExerciseOption();
        exerciseOption.setExercise(exercise);
        exerciseOption.setContent(request.getContent());
        return exerciseOption;
    }
}
