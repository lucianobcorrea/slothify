package tcc.com.job;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import tcc.com.domain.offensive.Offensive;
import tcc.com.domain.studyDays.WeekDays;
import tcc.com.domain.user.User;
import tcc.com.repository.OffensiveRepository;
import tcc.com.repository.UserRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Component
public class OffensiveJob {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OffensiveRepository offensiveRepository;

    @Scheduled(cron = "0 0 0 * * *")
    public void execute() throws InterruptedException {

        List<User> users = userRepository.findAll();
        LocalDate yesterday = LocalDate.now().minusDays(1);

        for (User user : users) {
            Offensive offensive = offensiveRepository.findByUser(user);

            if (offensive == null || offensive.getLastOffensiveDay() == null) {
                continue;
            }

            if (user.getStudyDays() == null || user.getStudyDays().isEmpty()) {
                continue;
            }

            boolean shouldHaveStudied = user.getStudyDays().stream()
                    .anyMatch(studyDay ->
                            studyDay.getWeekDay().equals(WeekDays.valueOf(yesterday.getDayOfWeek().name()))
                    );

            if (shouldHaveStudied && !offensive.getLastOffensiveDay().toLocalDate().equals(yesterday)) {
                offensive.setOffensive(0);
                offensive.setLostOffensiveDay(LocalDateTime.now());
                offensiveRepository.save(offensive);
            }
        }
    }
}
