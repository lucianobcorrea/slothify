package tcc.com.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tcc.com.controller.request.exercise.ExerciseRequest;
import tcc.com.service.exercise.CreateExerciseService;

@RestController
@RequestMapping("/exercise")
public class ExerciseController {

    @Autowired
    private CreateExerciseService createExerciseService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@ModelAttribute @Valid ExerciseRequest request, @PathVariable Long lessonId) {
        createExerciseService.create(lessonId, request);
    }
}
