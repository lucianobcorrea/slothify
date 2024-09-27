package tcc.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tcc.com.domain.exerciseCategory.ExerciseCategory;

public interface ExerciseCategoryRepository extends JpaRepository<ExerciseCategory, Long> {
}
