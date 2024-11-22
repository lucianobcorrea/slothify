package tcc.com.domain.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tcc.com.domain.challenge.Challenge;

@Getter
@Setter
@Entity
@Table(name = "user_daily_challenge")
public class UserDailyChallenge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "challenge_id")
    private Challenge challenge;

    private boolean collected;
    private boolean completed;
}
