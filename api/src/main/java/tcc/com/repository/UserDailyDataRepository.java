package tcc.com.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import tcc.com.domain.user.User;
import tcc.com.domain.user.UserDailyData;

public interface UserDailyDataRepository extends JpaRepository<UserDailyData, Long> {
    UserDailyData findByUser(User user);

    @Modifying
    @Transactional
    @Query("UPDATE UserDailyData u SET u.completedMultipleChoiceExercises = 0, u.completedSortingExercises = 0, u.completedDragAndDropExercises = 0, u.completedTotalExercises = 0, u.totalXp = 0")
    void resetAllUserDailyData();
}
