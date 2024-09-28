package tcc.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tcc.com.domain.exercise.Exercise;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
}
