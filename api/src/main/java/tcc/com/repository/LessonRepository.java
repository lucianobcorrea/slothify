package tcc.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tcc.com.domain.chapter.Chapter;
import tcc.com.domain.lesson.Lesson;

public interface LessonRepository extends JpaRepository<Lesson, Long> {

}
