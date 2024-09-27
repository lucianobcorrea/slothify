package tcc.com.mapper;

import tcc.com.controller.request.exerciseCategory.ExerciseCategoryRequest;
import tcc.com.domain.exerciseCategory.ExerciseCategory;

public class ExerciseCategoryMapper {

    public static ExerciseCategory toEntity(ExerciseCategoryRequest request) {
        ExerciseCategory exerciseCategory = new ExerciseCategory();
        exerciseCategory.setName(request.getName());
        return exerciseCategory;
    }
}
