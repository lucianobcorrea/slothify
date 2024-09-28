package tcc.com.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tcc.com.controller.request.userAnswer.UserAnswerRequest;
import tcc.com.service.userAnswer.CreateUserAnswerService;

@RestController
@RequestMapping("/user-answer")
public class UserAnswerController {

    @Autowired
    private CreateUserAnswerService createUserAnswerService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@Valid @RequestBody UserAnswerRequest request, @PathVariable Long exerciseId) {
        createUserAnswerService.create(exerciseId, request);
    }
}
