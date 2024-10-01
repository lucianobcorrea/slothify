package tcc.com.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tcc.com.controller.request.exerciseOption.ExerciseOptionRequest;
import tcc.com.controller.response.exerciseOption.ExerciseOptionResponse;
import tcc.com.service.exerciseOption.CreateExerciseOptionService;
import tcc.com.service.exerciseOption.ListExerciseOptionService;

import java.util.List;

@RestController
@RequestMapping("/exercise-option")
public class ExerciseOptionController {

    @Autowired
    private CreateExerciseOptionService createExerciseOptionService;

    @Autowired
    private ListExerciseOptionService listExerciseOptionService;

    @PostMapping("/create/{exerciseId}")
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@Valid @RequestBody ExerciseOptionRequest request, @PathVariable Long exerciseId) {
        createExerciseOptionService.create(exerciseId, request);
    }

    @GetMapping("/list/{exerciseId}")
    @ResponseStatus(HttpStatus.OK)
    public List<ExerciseOptionResponse> list(@PathVariable Long exerciseId) {
        return listExerciseOptionService.list(exerciseId);
    }
}
