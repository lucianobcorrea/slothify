package tcc.com.service.exercise;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tcc.com.controller.response.exercise.ExerciseResponse;
import tcc.com.domain.exercise.Exercise;
import tcc.com.domain.lesson.Lesson;
import tcc.com.mapper.ExerciseMapper;
import tcc.com.repository.ExerciseRepository;
import tcc.com.repository.LessonRepository;

@Service
public class GetExerciseService {

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private LessonRepository lessonRepository;

    public ExerciseResponse get(Long lessonId) {

        Lesson lesson = lessonRepository.findById(lessonId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Lição não encontrada."));

        Exercise exercise = exerciseRepository.findByLesson(lesson);

        return ExerciseMapper.toResponse(exercise);
    }
}
