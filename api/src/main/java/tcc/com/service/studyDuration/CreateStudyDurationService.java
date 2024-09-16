package tcc.com.service.studyDuration;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.com.controller.request.studyDuration.StudyDurationRequest;
import tcc.com.domain.studyDurations.StudyDuration;
import tcc.com.mapper.StudyDurationsMapper;
import tcc.com.repository.StudyDurationsRepository;
import tcc.com.utils.ConvertImage;

@Service
public class CreateStudyDurationService {

    @Autowired
    private StudyDurationsRepository studyDurationsRepository;

    @Autowired
    private ConvertImage convertImage;

    @Transactional
    public void create(StudyDurationRequest request) {

        StudyDuration studyDurations = StudyDurationsMapper.toEntity(request);

        if(!request.getImage().isEmpty()) {
            String uuid = convertImage.uuid();
            String fileName = convertImage.createImage(request.getImage(), uuid);

            studyDurations.setImage(uuid + fileName);

            studyDurationsRepository.save(studyDurations);
        }
    }
}
