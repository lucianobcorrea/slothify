package tcc.com.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import tcc.com.domain.offensive.Offensive;
import tcc.com.domain.studyDays.WeekDays;
import tcc.com.domain.user.User;
import tcc.com.repository.OffensiveRepository;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class AssignOffensive {

    @Autowired
    private OffensiveRepository offensiveRepository;

    public void checkOffensive(User user) {
        Offensive offensive = offensiveRepository.findByUser(user);

        if (offensive.getLastOffensiveDay() == null) {
            offensive.setOffensive(1);
            offensive.setLastOffensive(1);
            offensive.setLastOffensiveDay(LocalDateTime.now());
            offensiveRepository.save(offensive);
            return;
        }

        LocalDateTime lastOffensiveDay = offensive.getLastOffensiveDay();
        DayOfWeek lastDayCompletedExercise = lastOffensiveDay.getDayOfWeek();

        if (lastOffensiveDay.toLocalDate().isBefore(LocalDate.now())) {
            boolean isStudyDay = user.getStudyDays().stream()
                    .anyMatch(studyDay ->
                            studyDay.getWeekDay().equals(WeekDays.valueOf(lastDayCompletedExercise.name()))
                    );

            if (isStudyDay) {
                offensive.setOffensive(offensive.getOffensive() + 1);
                offensive.setLastOffensive(offensive.getLastOffensive() + 1);
            } else {
                offensive.setLastOffensive(0);
            }

            offensive.setLastOffensiveDay(LocalDateTime.now());
            offensiveRepository.save(offensive);
        }
    }
}