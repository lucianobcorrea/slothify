package tcc.com.domain.offensive;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tcc.com.domain.user.User;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "offensive")
public class Offensive {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private int offensive;
    private int lastOffensive;
    private LocalDateTime lastOffensiveDay;
    private LocalDateTime lostOffensiveDay;
}
