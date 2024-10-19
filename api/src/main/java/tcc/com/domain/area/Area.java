package tcc.com.domain.area;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tcc.com.domain.chapter.Chapter;
import tcc.com.domain.user.User;
import tcc.com.domain.userCourseProgress.UserCourseProgress;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "area")
public class Area {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "area", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<UserCourseProgress> userCourseProgress;

    private String title;
    private String slug;

    private String image;

    @ManyToMany(mappedBy = "areas")
    private List<User> userAreas = new ArrayList<>();

    @OneToMany(mappedBy = "area")
    private List<Chapter> chapters = new ArrayList<>();
}
