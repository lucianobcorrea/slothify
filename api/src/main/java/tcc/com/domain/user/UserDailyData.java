package tcc.com.domain.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "user_daily_data")
public class UserDailyData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private int completedMultipleChoiceExercises;
    private int completedSortingExercises;
    private int completedDragAndDropExercises;
    private int completedTotalExercises;
    private int totalXp;
}
