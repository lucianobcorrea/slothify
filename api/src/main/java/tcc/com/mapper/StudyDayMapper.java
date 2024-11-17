package tcc.com.mapper;

import tcc.com.controller.response.studyDay.StudyDayResponse;
import tcc.com.domain.studyDays.StudyDay;

public class StudyDayMapper {

    public static StudyDayResponse toResponse(StudyDay studyDay) {
        return StudyDayResponse.builder()
                .weekDay(studyDay.getWeekDay().getDay())
                .build();
    }
}
