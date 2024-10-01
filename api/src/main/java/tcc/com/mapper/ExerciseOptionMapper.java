package tcc.com.mapper;

import tcc.com.controller.request.exerciseOption.ExerciseOptionRequest;
import tcc.com.controller.response.exerciseOption.ExerciseOptionResponse;
import tcc.com.domain.exercise.Exercise;
import tcc.com.domain.exerciseOption.ExerciseOption;

public class ExerciseOptionMapper {

    public static ExerciseOption toEntity(ExerciseOptionRequest request, Exercise exercise) {
        ExerciseOption exerciseOption = new ExerciseOption();
        exerciseOption.setExercise(exercise);
        exerciseOption.setContent(request.getContent());
        return exerciseOption;
    }

    public static ExerciseOptionResponse toResponse(ExerciseOption exerciseOption) {
        ExerciseOptionResponse response = new ExerciseOptionResponse();
        response.setContent(exerciseOption.getContent());
        response.setCorrect(exerciseOption.getCorrect());
        response.setCorrectOrder(exerciseOption.getCorrectOrder());
        response.setCategory(exerciseOption.getCategory());
        return response;
    }
}
