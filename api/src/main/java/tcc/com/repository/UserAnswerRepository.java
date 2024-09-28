package tcc.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tcc.com.domain.userAnswer.UserAnswer;

public interface UserAnswerRepository extends JpaRepository<UserAnswer, Long> {
}
