package tcc.com.domain.achievement;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tcc.com.domain.user.UserAchievement;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "achievement")
public class Achievement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "achievement")
    private List<UserAchievement> userAchievements;

    private String name;
    private String description;
    private String image;
    private Integer xpReward;
    private Integer coinsReward;

    private Integer requiredExercises;
    private Integer requiredMultipleChoiceExercises;
    private Integer requiredSortingExercises;
    private Integer requiredDragAndDropExercises;
    private Integer requiredXp;
    private Integer requiredUserLevel;
}
