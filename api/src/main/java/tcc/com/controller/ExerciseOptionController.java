package tcc.com.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tcc.com.controller.request.exerciseOption.ExerciseOptionRequest;
import tcc.com.service.exerciseOption.CreateExerciseOptionService;

@RestController
@RequestMapping("/exercise-option")
public class ExerciseOptionController {

    @Autowired
    private CreateExerciseOptionService createExerciseOptionService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@Valid @RequestBody ExerciseOptionRequest request, @PathVariable Long exerciseId) {
        createExerciseOptionService.create(exerciseId, request);
    }
}
