package tcc.com.domain.area;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tcc.com.domain.user.User;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "areas")
public class Area {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String slug;
    private boolean active;

    private String image;

    @ManyToMany(mappedBy = "areas")
    private List<User> userAreas;
}
