package tcc.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tcc.com.controller.response.exerciseOption.ExerciseOptionResponse;
import tcc.com.domain.exercise.Exercise;
import tcc.com.domain.exerciseOption.ExerciseOption;

import java.util.List;

public interface ExerciseOptionRepository extends JpaRepository<ExerciseOption, Long> {
    List<ExerciseOption> findAllByExercise(Exercise exercise);
    ExerciseOption findByExerciseIdAndCorrectTrue(Long exerciseId);
}
