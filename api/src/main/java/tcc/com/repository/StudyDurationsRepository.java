package tcc.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tcc.com.domain.studyDurations.Durations;
import tcc.com.domain.studyDurations.StudyDuration;

public interface StudyDurationsRepository extends JpaRepository<StudyDuration, Long> {
    StudyDuration findByDuration(Durations studyDuration);
}
