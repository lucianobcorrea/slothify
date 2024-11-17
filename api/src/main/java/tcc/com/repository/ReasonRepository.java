package tcc.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tcc.com.domain.reason.Reason;
import tcc.com.domain.user.User;

import java.util.Arrays;
import java.util.List;

public interface ReasonRepository extends JpaRepository<Reason, Long> {
    boolean existsBySlug(String slug);
    List<Reason> findAllBySlugIn(List<String> slugs);
    List<Reason> findByUserReasons(User user);
}
