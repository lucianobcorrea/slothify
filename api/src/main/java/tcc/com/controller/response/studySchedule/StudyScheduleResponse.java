package tcc.com.controller.response.studySchedule;

import lombok.Getter;
import lombok.Setter;
import tcc.com.controller.response.studyDay.StudyDayResponse;

import java.util.List;

@Getter
@Setter
public class StudyScheduleResponse {
    private int studyDuration;
    private List<StudyDayResponse> studyDays;
}
