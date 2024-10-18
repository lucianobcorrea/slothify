package tcc.com.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tcc.com.controller.request.userAnswer.AnswerRequest;
import tcc.com.controller.request.userAnswer.DragAndDropRequest;
import tcc.com.service.userAnswer.CreateDragAndDropService;
import tcc.com.service.userAnswer.CreateMultipleChoiceService;

@RestController
@RequestMapping("/user-answer")
public class UserAnswerController {

    @Autowired
    private CreateMultipleChoiceService createMultipleChoiceService;

    @Autowired
    private CreateDragAndDropService createDragAndDropService;

    @PostMapping("/multiple-choice/{exerciseId}")
    @ResponseStatus(HttpStatus.CREATED)
    public void multipleChoice(@Valid @RequestBody AnswerRequest request, @PathVariable Long exerciseId) {
        createMultipleChoiceService.create(exerciseId, request);
    }

    @PostMapping("/drag-and-drop/{exerciseId}")
    @ResponseStatus(HttpStatus.CREATED)
    public void dragAndDrop(@Valid @RequestBody DragAndDropRequest request, @PathVariable Long exerciseId) {
        createDragAndDropService.create(exerciseId, request);
    }
}
