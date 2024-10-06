package tcc.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tcc.com.domain.explanation.Explanation;
import tcc.com.domain.explanation.KeyPoint;

import java.util.List;
import java.util.Optional;

public interface KeyPointRepository extends JpaRepository<KeyPoint, Long> {
    Optional<List<KeyPoint>> findByExplanation(Explanation explanation);
}
