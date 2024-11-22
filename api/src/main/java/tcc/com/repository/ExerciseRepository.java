package tcc.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tcc.com.domain.exercise.Exercise;
import tcc.com.domain.lesson.Lesson;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    Exercise findByLesson(Lesson lesson);
}
