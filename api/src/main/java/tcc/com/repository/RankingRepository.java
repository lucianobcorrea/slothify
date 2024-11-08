package tcc.com.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import tcc.com.domain.ranking.Ranking;
import tcc.com.domain.user.User;

import java.util.List;

public interface RankingRepository extends JpaRepository<Ranking, Long> {
    Page<Ranking> findAllByOrderByPointsDesc(Pageable pageable);
    List<Ranking> findTop3ByOrderByPointsDesc();

    @Modifying
    @Transactional
    @Query("UPDATE Ranking r SET r.points = 0")
    void resetAllPoints();

    Ranking findByUser(User user);
}
