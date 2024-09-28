package tcc.com.domain.exerciseOption;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tcc.com.domain.exercise.Exercise;

@Getter
@Setter
@Entity
@Table(name = "exercise_option")
public class ExerciseOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;
    private Boolean correct;
    private Integer correctOrder;
    private String category;

    @ManyToOne
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;
}
