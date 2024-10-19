package tcc.com.domain.userCourseProgress;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tcc.com.domain.area.Area;
import tcc.com.domain.lesson.Lesson;
import tcc.com.domain.user.User;

@Getter
@Setter
@Entity
@Table(name = "user_course_progress")
public class UserCourseProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "area_id", nullable = false)
    private Area area;

    @Column(name = "completed_exercises", nullable = false)
    private Integer completedExercises = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "last_unlocked_lesson_id")
    private Lesson lastUnlockedLesson;
}
