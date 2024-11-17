package tcc.com.controller.response.studyDay;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import tcc.com.domain.studyDays.WeekDays;

@Setter
@Getter
@Builder
public class StudyDayResponse {
    private String weekDay;
}
