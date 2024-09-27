package tcc.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tcc.com.domain.studyDays.StudyDay;
import tcc.com.domain.studyDays.WeekDays;

import java.util.List;

public interface StudyDayRepository extends JpaRepository<StudyDay, Long> {
    boolean existsByWeekDay(WeekDays weekDays);
    List<StudyDay> findAllByWeekDayIn(List<String> weekDays);
}
