package tcc.com.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tcc.com.controller.request.exerciseCategory.KeyPointRequest;
import tcc.com.service.explanation.CreateKeyPointService;

@RestController
@RequestMapping("/key-point")
public class KeyPointController {

    @Autowired
    private CreateKeyPointService createKeyPointService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/create/{explanationId}")
    public void create(@Valid @RequestBody KeyPointRequest request, @PathVariable Long explanationId) {
        createKeyPointService.create(request, explanationId);
    }
}
