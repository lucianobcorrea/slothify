package tcc.com.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tcc.com.controller.request.exerciseCategory.ExerciseCategoryRequest;
import tcc.com.service.exerciseCategory.CreateExerciseCategoryService;

@RestController
@RequestMapping("/exercise-category")
public class ExerciseCategoryController {

    @Autowired
    private CreateExerciseCategoryService createExerciseCategoryService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@ModelAttribute @Valid ExerciseCategoryRequest request) {
        createExerciseCategoryService.create(request);
    }
}
