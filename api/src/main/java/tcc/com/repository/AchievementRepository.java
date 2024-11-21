package tcc.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tcc.com.domain.achievement.Achievement;

import java.util.List;

public interface AchievementRepository extends JpaRepository<Achievement, Long> {
    List<Achievement> findByRequiredUserLevelLessThanEqual(int userLevel);
    List<Achievement> findByRequiredXpLessThanEqual(int xp);
    List<Achievement> findByRequiredMultipleChoiceExercisesLessThanEqual(int completedMultipleChoice);
    List<Achievement> findByRequiredSortingExercisesLessThanEqual(int completedSorting);

    @Query("SELECT a FROM Achievement a WHERE a.requiredDragAndDropExercises <= :completedDragAndDrop")
    List<Achievement> findByRequiredDragAndDropExercisesLessThanEqual(@Param("completedDragAndDrop") int completedDragAndDrop);

    List<Achievement> findByRequiredExercisesLessThanEqual(int completedTotalExercises);
}