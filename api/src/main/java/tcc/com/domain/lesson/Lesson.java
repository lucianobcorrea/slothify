package tcc.com.domain.lesson;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tcc.com.domain.chapter.Chapter;
import tcc.com.domain.exercise.Exercise;
import tcc.com.domain.exerciseCategory.ExerciseCategory;
import tcc.com.domain.explanation.Explanation;
import tcc.com.domain.userAnswer.UserAnswer;
import tcc.com.domain.userCourseProgress.UserCourseProgress;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "lesson")
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "chapter_id", nullable = false)
    private Chapter chapter;

    @OneToMany(mappedBy = "lastUnlockedLesson", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<UserCourseProgress> userCourseProgress;

    private String title;
    private Integer sequence;

    @Enumerated(EnumType.STRING)
    private ExerciseType exerciseType;

    @OneToOne(mappedBy = "lesson")
    private Exercise exercise;

    @OneToMany(mappedBy = "lesson")
    private List<Explanation> explanations = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "exercise_category_id", nullable = false)
    private ExerciseCategory exerciseCategory;

    @OneToMany(mappedBy = "lesson")
    private List<UserAnswer> userAnswers = new ArrayList<>();
}
