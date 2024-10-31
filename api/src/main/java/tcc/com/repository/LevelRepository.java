package tcc.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tcc.com.domain.level.Level;

public interface LevelRepository extends JpaRepository<Level, Long> {
    Level findByLevelNumber(int i);
}
