package tcc.com.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tcc.com.controller.request.userAnswer.AnswerRequest;
import tcc.com.controller.request.userAnswer.DragAndDropRequest;
import tcc.com.controller.request.userAnswer.SortingRequest;
import tcc.com.controller.response.userAnswer.AnswerResponse;
import tcc.com.service.userAnswer.CreateDragAndDropService;
import tcc.com.service.userAnswer.CreateMultipleChoiceService;
import tcc.com.service.userAnswer.CreateSortingService;

@RestController
@RequestMapping("/user-answer")
public class UserAnswerController {

    @Autowired
    private CreateMultipleChoiceService createMultipleChoiceService;

    @Autowired
    private CreateDragAndDropService createDragAndDropService;

    @Autowired
    private CreateSortingService createSortingService;

    @PostMapping("/multiple-choice/{exerciseId}")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<AnswerResponse> multipleChoice(@Valid @RequestBody AnswerRequest request, @PathVariable Long exerciseId) {
        return createMultipleChoiceService.create(exerciseId, request);
    }

    @PostMapping("/drag-and-drop/{exerciseId}")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<AnswerResponse> dragAndDrop(@Valid @RequestBody DragAndDropRequest request, @PathVariable Long exerciseId) {
        return createDragAndDropService.create(exerciseId, request);
    }

    @PostMapping("/sorting/{exerciseId}")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<AnswerResponse> sorting(@Valid @RequestBody SortingRequest request, @PathVariable Long exerciseId) {
        return createSortingService.create(exerciseId, request);
    }
}
