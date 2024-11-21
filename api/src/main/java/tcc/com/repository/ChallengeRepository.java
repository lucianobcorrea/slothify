package tcc.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tcc.com.domain.challenge.Challenge;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
}
