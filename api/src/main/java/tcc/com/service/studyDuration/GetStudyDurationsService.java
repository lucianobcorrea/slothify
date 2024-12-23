package tcc.com.service.studyDuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tcc.com.controller.response.studyDuration.StudyDurationResponse;
import tcc.com.mapper.StudyDurationsMapper;
import tcc.com.repository.StudyDurationsRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetStudyDurationsService {

    @Autowired
    private StudyDurationsRepository studyDurationsRepository;

    public List<StudyDurationResponse> getStudyDurations() {
        String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString() + "/files/";

        return studyDurationsRepository.findAll().stream()
                .peek(reason -> reason.setImage(baseUrl + reason.getImage()))
                .map(StudyDurationsMapper::toResponse)
                .collect(Collectors.toList());
    }
}
