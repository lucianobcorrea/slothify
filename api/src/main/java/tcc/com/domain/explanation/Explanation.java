package tcc.com.domain.explanation;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tcc.com.domain.lesson.Lesson;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "explanation")
public class Explanation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String objective;
    private String example;
    private String tip;

    @ManyToOne
    @JoinColumn(name = "lesson_id", nullable = false)
    private Lesson lesson;

    @OneToMany(mappedBy = "explanation")
    private List<KeyPoint> keyPoints = new ArrayList<>();
}
