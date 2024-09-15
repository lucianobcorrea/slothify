package tcc.com.domain.reason;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tcc.com.domain.user.User;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "reasons")
public class Reason {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String slug;
    private boolean active;

    private String image;

    @ManyToMany(mappedBy = "reasons")
    private List<User> userReasons;
}
