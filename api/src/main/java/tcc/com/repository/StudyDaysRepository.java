package tcc.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tcc.com.domain.studyDays.StudyDays;
import tcc.com.domain.studyDays.WeekDays;

import java.util.List;

public interface StudyDaysRepository extends JpaRepository<StudyDays, Long> {
    boolean existsByWeekDay(WeekDays weekDays);
    List<StudyDays> findAllByWeekDayIn(List<String> weekDays);
}
