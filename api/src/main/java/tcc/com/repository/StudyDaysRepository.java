package tcc.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tcc.com.domain.studyDays.StudyDays;
import tcc.com.domain.studyDays.WeekDays;

public interface StudyDaysRepository extends JpaRepository<StudyDays, Long> {
    boolean existsByWeekDay(WeekDays weekDays);
}
