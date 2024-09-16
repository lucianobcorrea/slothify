package tcc.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tcc.com.domain.reason.Reason;

import java.util.List;

public interface ReasonRepository extends JpaRepository<Reason, Long> {
    boolean existsBySlug(String slug);
    Reason findBySlug(String slug);
    List<Reason> findAllBySlugIn(List<String> slugs);
}
