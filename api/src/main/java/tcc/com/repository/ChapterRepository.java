package tcc.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tcc.com.domain.chapter.Chapter;

public interface ChapterRepository extends JpaRepository<Chapter, Long> {
}
