package tcc.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tcc.com.domain.user.UserDailyChallenge;

public interface UserDailyChallengeRepository extends JpaRepository<UserDailyChallenge, Long> {
}
