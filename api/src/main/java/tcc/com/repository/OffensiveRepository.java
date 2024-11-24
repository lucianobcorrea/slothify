package tcc.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tcc.com.domain.offensive.Offensive;
import tcc.com.domain.user.User;

public interface OffensiveRepository extends JpaRepository<Offensive, Long> {
    Offensive findByUser(User user);
}
