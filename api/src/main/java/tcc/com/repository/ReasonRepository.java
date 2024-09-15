package tcc.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tcc.com.domain.reason.Reason;

public interface ReasonRepository extends JpaRepository<Reason, Long> {
    boolean existsBySlug(String slug);
}
