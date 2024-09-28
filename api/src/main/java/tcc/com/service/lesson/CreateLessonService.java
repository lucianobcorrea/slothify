package tcc.com.service.lesson;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tcc.com.controller.request.lesson.LessonRequest;
import tcc.com.domain.chapter.Chapter;
import tcc.com.domain.exerciseCategory.ExerciseCategory;
import tcc.com.domain.lesson.Lesson;
import tcc.com.mapper.LessonMapper;
import tcc.com.repository.ChapterRepository;
import tcc.com.repository.ExerciseCategoryRepository;
import tcc.com.repository.LessonRepository;

@Service
public class CreateLessonService {

    @Autowired
    private ChapterRepository chapterRepository;

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private ExerciseCategoryRepository exerciseCategoryRepository;

    @Transactional
    public void create(Long id, Long exerciseCategoryId, LessonRequest request) {

        Chapter chapter = chapterRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Esse capítulo não existe."));

        ExerciseCategory exerciseCategory = exerciseCategoryRepository.findById(exerciseCategoryId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria de exercício não encontrada."));

        Lesson lesson = LessonMapper.toEntity(request, chapter, exerciseCategory);

        lessonRepository.save(lesson);
    }
}
