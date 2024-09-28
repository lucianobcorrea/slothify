package tcc.com.domain.lesson;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tcc.com.domain.chapter.Chapter;
import tcc.com.domain.exercise.Exercise;

import java.util.ArrayList;
import java.util.List;

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

    private String title;

    @OneToMany(mappedBy = "lesson")
    private List<Exercise> exercises = new ArrayList<>();
}
