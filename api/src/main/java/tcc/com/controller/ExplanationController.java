package tcc.com.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tcc.com.controller.request.explanation.ExplanationRequest;
import tcc.com.controller.response.explanation.ExplanationResponse;
import tcc.com.service.explanation.CreateExplanationService;
import tcc.com.service.explanation.GetExplanationService;

import java.util.List;

@RestController
@RequestMapping("/explanation")
public class ExplanationController {

    @Autowired
    private CreateExplanationService createExplanationService;

    @Autowired
    private GetExplanationService getExplanationService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/create/{lessonId}")
    public void create(@Valid @RequestBody ExplanationRequest request, @PathVariable Long lessonId) {
        createExplanationService.create(request, lessonId);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/get/{lessonId}")
    public ExplanationResponse get(@PathVariable Long lessonId) {
        return getExplanationService.get(lessonId);
    }
}
