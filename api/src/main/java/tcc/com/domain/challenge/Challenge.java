package tcc.com.domain.challenge;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tcc.com.domain.user.UserDailyChallenge;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "challenge")
public class Challenge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "challenge")
    private List<UserDailyChallenge> userChallenges;

    private String name;
    private Integer xpReward;
    private Integer coinsReward;

    private Integer requiredExercises;
    private Integer requiredMultipleChoiceExercises;
    private Integer requiredSortingExercises;
    private Integer requiredDragAndDropExercises;
    private Integer requiredXp;
}
