package tcc.com.service.initialForm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tcc.com.controller.request.initialForm.InitialFormRequest;
import tcc.com.domain.area.Area;
import tcc.com.domain.reason.Reason;
import tcc.com.domain.studyDays.StudyDays;
import tcc.com.domain.studyDurations.Durations;
import tcc.com.domain.studyDurations.StudyDuration;
import tcc.com.domain.user.User;
import tcc.com.repository.*;
import tcc.com.security.AuthenticatedUserService;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CreateInitialFormService {

    @Autowired
    private AreaRepository areaRepository;

    @Autowired
    private ReasonRepository reasonRepository;

    @Autowired
    private StudyDaysRepository studyDaysRepository;

    @Autowired
    private StudyDurationsRepository studyDurationsRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticatedUserService authenticatedUserService;

    public void create(InitialFormRequest request) {
        User user = authenticatedUserService.get();

        //Salvando o StudyDuration na relação do user
        StudyDuration studyDuration = studyDurationsRepository.findByDuration(Durations.valueOf(request.getStudyDuration()));
        user.setStudyDuration(studyDuration);

        //Salvando a(s) áreas
        List<Area> areas = areaRepository.findAllBySlugIn(request.getAreas());
        for (Area area : areas) {
            user.createUserArea(area);
        }

        //Salvando o(s) motivos
        List<Reason> reasons = reasonRepository.findAllBySlugIn(request.getReasons());
        for (Reason reason : reasons) {
            user.createUserReason(reason);
        }

        //Salvando os dias de estudo
        Map<String, List<String>> studyDayMapping = new HashMap<>();
        studyDayMapping.put("EVERY_DAY", Arrays.asList("MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"));
        studyDayMapping.put("WEEK", Arrays.asList("MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"));
        studyDayMapping.put("WEEKEND", Arrays.asList("SATURDAY", "SUNDAY"));

        String studyDaySelection = request.getStudyDay();
        List<String> weekDaysToFetch = studyDayMapping.get(studyDaySelection);

        if(weekDaysToFetch == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Seleção de dias inválida, por favor, tente novamente!");
        }

        List<StudyDays> studyDays = studyDaysRepository.findAllByWeekDayIn(weekDaysToFetch);

        for(StudyDays studyDay : studyDays) {
            user.createUserDay(studyDay);
        }

        user.setInitialForm(true);
        userRepository.save(user);
    }
}

