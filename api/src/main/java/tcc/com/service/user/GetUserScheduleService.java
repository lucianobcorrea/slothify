package tcc.com.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.com.controller.response.studyDay.StudyDayResponse;
import tcc.com.controller.response.studySchedule.StudyScheduleResponse;
import tcc.com.domain.user.User;
import tcc.com.mapper.StudyDayMapper;
import tcc.com.security.AuthenticatedUserService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetUserScheduleService {

    @Autowired
    private AuthenticatedUserService authenticatedUserService;

    public StudyScheduleResponse getUserSchedule() {
        User user = authenticatedUserService.get();

        StudyScheduleResponse response = new StudyScheduleResponse();
        response.setStudyDuration(user.getStudyDuration().getDuration().getDuration());

        List<StudyDayResponse> studyDays = user.getStudyDays().stream()
                .map(StudyDayMapper::toResponse)
                .collect(Collectors.toList());
        response.setStudyDays(studyDays);

        return response;
    }
}
