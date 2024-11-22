package tcc.com.repository;

import java.util.List;

import tcc.com.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import tcc.com.domain.user.UserDailyChallenge;

public interface UserDailyChallengeRepository extends JpaRepository<UserDailyChallenge, Long> {
    List<UserDailyChallenge> findByUser(User user);
}
