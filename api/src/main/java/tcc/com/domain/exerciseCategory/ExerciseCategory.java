package tcc.com.domain.exerciseCategory;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "exercise_category")
public class ExerciseCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String image;

    @Enumerated(EnumType.STRING)
    private ExerciseCategoryTypes name;
}
