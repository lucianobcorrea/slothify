package tcc.com.repository;

import tcc.com.domain.area.Area;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AreaRepository extends JpaRepository<Area, Long> {
    boolean existsBySlug(String slug);
    Area findBySlug(String slug);
    List<Area> findAllBySlugIn(List<String> slugs);
}
