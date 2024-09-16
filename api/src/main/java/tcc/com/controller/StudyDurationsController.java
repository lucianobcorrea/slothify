package tcc.com.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tcc.com.controller.request.studyDuration.StudyDurationRequest;
import tcc.com.controller.response.studyDuration.StudyDurationResponse;
import tcc.com.service.studyDuration.CreateStudyDurationService;
import tcc.com.service.studyDuration.GetStudyDurationsService;

import java.util.List;

@RestController
@RequestMapping("/study-duration")
public class StudyDurationsController {

    @Autowired
    private CreateStudyDurationService createStudyDurationService;

    @Autowired
    private GetStudyDurationsService getStudyDurationsService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@ModelAttribute @Valid StudyDurationRequest request) {
        createStudyDurationService.create(request);
    }

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public List<StudyDurationResponse> getStudyDurations() {
        return getStudyDurationsService.getStudyDurations();
    }
}
