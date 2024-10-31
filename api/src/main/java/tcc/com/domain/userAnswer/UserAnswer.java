package tcc.com.domain.userAnswer;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tcc.com.domain.exercise.Exercise;
import tcc.com.domain.lesson.Lesson;
import tcc.com.domain.user.User;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "user_answer")
public class UserAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String answer;
    private boolean correct;
    private LocalDateTime answerDate;
    private boolean alreadyAnswered;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    @ManyToOne
    @JoinColumn(name = "lesson_id", nullable = false)
    private Lesson lesson;
}
