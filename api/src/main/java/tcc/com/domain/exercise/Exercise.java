package tcc.com.domain.exercise;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tcc.com.domain.exerciseCategory.ExerciseCategory;
import tcc.com.domain.exerciseOption.ExerciseOption;
import tcc.com.domain.lesson.Lesson;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "exercise")
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private ExerciseType exerciseType;

    private String statement;
    private String image;

    @ManyToOne
    @JoinColumn(name = "lesson_id", nullable = false)
    private Lesson lesson;

    @ManyToOne
    @JoinColumn(name = "exercise_category_id", nullable = false)
    private ExerciseCategory exerciseCategory;

    @OneToMany(mappedBy = "exercise")
    private List<ExerciseOption> exerciseOptions = new ArrayList<>();
}
