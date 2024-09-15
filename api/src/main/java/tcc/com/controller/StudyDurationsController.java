package tcc.com.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tcc.com.controller.request.studyDuration.StudyDurationRequest;
import tcc.com.service.studyDuration.CreateStudyDurationService;

@RestController
@RequestMapping("/study-duration")
public class StudyDurationsController {

    @Autowired
    private CreateStudyDurationService createStudyDurationService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@ModelAttribute @Valid StudyDurationRequest request) {
        createStudyDurationService.create(request);
    }
}
