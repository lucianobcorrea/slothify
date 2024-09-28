package tcc.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tcc.com.domain.exerciseOption.ExerciseOption;

public interface ExerciseOptionRepository extends JpaRepository<ExerciseOption, Long> {
}
