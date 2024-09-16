package tcc.com.service.studyDuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.com.FileStorageConfig;
import tcc.com.controller.response.studyDuration.StudyDurationResponse;
import tcc.com.mapper.StudyDurationsMapper;
import tcc.com.repository.StudyDurationsRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetStudyDurationsService {

    @Autowired
    private FileStorageConfig fileStorageConfig;

    @Autowired
    private StudyDurationsRepository studyDurationsRepository;

    public List<StudyDurationResponse> getStudyDurations() {
        return studyDurationsRepository.findAll().stream()
                .peek(reason -> reason.setImage("http://localhost:8080/files/" + reason.getImage()))
                .map(StudyDurationsMapper::toResponse)
                .collect(Collectors.toList());
    }
}
