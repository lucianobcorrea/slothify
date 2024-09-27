package tcc.com.service.seeder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import tcc.com.domain.studyDays.StudyDay;
import tcc.com.domain.studyDays.WeekDays;
import tcc.com.repository.StudyDayRepository;

@Component
public class StudyDaysSeeder implements CommandLineRunner {

    @Autowired
    private StudyDayRepository studyDayRepository;

    @Override
    public void run(String... args) throws Exception {
        for(WeekDays day : WeekDays.values()) {
            if(!studyDayRepository.existsByWeekDay(day)) {
                StudyDay studyDay = StudyDay.builder()
                        .weekDay(day)
                        .build();
                studyDayRepository.save(studyDay);
            }
        }
    }
}
