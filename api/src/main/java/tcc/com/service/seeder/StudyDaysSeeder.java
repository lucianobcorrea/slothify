package tcc.com.service.seeder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import tcc.com.domain.studyDays.StudyDays;
import tcc.com.domain.studyDays.WeekDays;
import tcc.com.repository.StudyDaysRepository;

@Component
public class StudyDaysSeeder implements CommandLineRunner {

    @Autowired
    private StudyDaysRepository studyDaysRepository;

    @Override
    public void run(String... args) throws Exception {
        for(WeekDays day : WeekDays.values()) {
            if(!studyDaysRepository.existsByWeekDay(day)) {
                StudyDays studyDays = StudyDays.builder()
                        .weekDay(day)
                        .build();
                studyDaysRepository.save(studyDays);
            }
        }
    }
}
