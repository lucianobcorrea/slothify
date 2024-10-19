package tcc.com.domain.exercise;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tcc.com.domain.exerciseOption.ExerciseOption;
import tcc.com.domain.lesson.Lesson;
import tcc.com.domain.userAnswer.UserAnswer;

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

    private String statement;
    private String image;

    @OneToOne
    @JoinColumn(name = "lesson_id", nullable = false)
    private Lesson lesson;

    @OneToMany(mappedBy = "exercise")
    private List<ExerciseOption> exerciseOptions = new ArrayList<>();

    @OneToMany(mappedBy = "exercise")
    private List<UserAnswer> userAnswers = new ArrayList<>();
}
