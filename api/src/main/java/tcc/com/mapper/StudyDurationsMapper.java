package tcc.com.mapper;

import tcc.com.controller.request.studyDuration.StudyDurationRequest;
import tcc.com.controller.response.studyDuration.StudyDurationResponse;
import tcc.com.domain.studyDurations.Durations;
import tcc.com.domain.studyDurations.StudyDuration;

public class StudyDurationsMapper {

    public static StudyDuration toEntity(StudyDurationRequest request) {
        StudyDuration studyDurations = new StudyDuration();
        studyDurations.setDuration(Durations.valueOf(request.getDuration()));
        return studyDurations;
    }

    public static StudyDurationResponse toResponse(StudyDuration studyDurations) {
        return StudyDurationResponse.builder()
                .id(studyDurations.getId())
                .duration(String.valueOf(studyDurations.getDuration()))
                .image(studyDurations.getImage())
                .build();
    }
}
