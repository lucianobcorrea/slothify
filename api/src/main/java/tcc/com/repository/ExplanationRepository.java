package tcc.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tcc.com.domain.explanation.Explanation;
import tcc.com.domain.lesson.Lesson;

import java.util.Optional;

public interface ExplanationRepository extends JpaRepository<Explanation, Long> {
    Optional<Explanation> findByLesson(Lesson lesson);
}
