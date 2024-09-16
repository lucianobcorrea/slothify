package tcc.com.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tcc.com.controller.request.initialForm.InitialFormRequest;
import tcc.com.service.initialForm.CreateInitialFormService;

@RestController
@RequestMapping("/welcome")
public class InitialFormController {

    @Autowired
    private CreateInitialFormService createInitialFormService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@Valid @RequestBody InitialFormRequest request) {
        createInitialFormService.create(request);
    }
}
