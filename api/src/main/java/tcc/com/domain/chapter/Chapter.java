package tcc.com.domain.chapter;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tcc.com.domain.area.Area;
import tcc.com.domain.lesson.Lesson;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "chapter")
public class Chapter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "area_id", nullable = false)
    private Area area;

    @OneToMany(mappedBy = "chapter")
    private List<Lesson> lessons = new ArrayList<>();

    private String title;
}
