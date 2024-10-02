package tcc.com.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tcc.com.controller.request.exercise.ExerciseRequest;
import tcc.com.controller.response.exercise.ExerciseResponse;
import tcc.com.service.exercise.CreateExerciseService;
import tcc.com.service.exercise.GetExerciseService;

@RestController
@RequestMapping("/exercise")
public class ExerciseController {

    @Autowired
    private CreateExerciseService createExerciseService;

    @Autowired
    private GetExerciseService getExerciseService;

    @PostMapping("/create/{lessonId}")
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@ModelAttribute @Valid ExerciseRequest request, @PathVariable Long lessonId) {
        createExerciseService.create(lessonId, request);
    }

    @GetMapping("/get/{lessonId}")
    @ResponseStatus(HttpStatus.OK)
    public ExerciseResponse get(@PathVariable Long lessonId) {
        return getExerciseService.get(lessonId);
    }
}
