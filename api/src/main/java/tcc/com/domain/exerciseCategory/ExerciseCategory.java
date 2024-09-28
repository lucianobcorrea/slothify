package tcc.com.domain.exerciseCategory;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tcc.com.domain.exercise.Exercise;
import tcc.com.domain.lesson.Lesson;

import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(mappedBy = "exerciseCategory")
    private List<Lesson> exercises = new ArrayList<>();
}
