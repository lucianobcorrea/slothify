package tcc.com.domain.area;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tcc.com.domain.chapter.Chapter;
import tcc.com.domain.user.User;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "area")
public class Area {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String slug;

    private String image;

    @ManyToMany(mappedBy = "areas")
    private List<User> userAreas = new ArrayList<>();

    @OneToMany(mappedBy = "area")
    private List<Chapter> chapters = new ArrayList<>();
}
