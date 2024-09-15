package tcc.com.service.studyDuration;

import jakarta.validation.Valid;
import org.springframework.stereotype.Service;
import tcc.com.controller.request.studyDuration.StudyDurationRequest;

@Service
public class CreateStudyDurationService {
    public void create(@Valid StudyDurationRequest request) {
    }
}
