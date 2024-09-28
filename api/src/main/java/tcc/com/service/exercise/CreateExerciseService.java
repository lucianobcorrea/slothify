package tcc.com.service.exercise;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tcc.com.controller.request.exercise.ExerciseRequest;
import tcc.com.domain.exercise.Exercise;
import tcc.com.domain.exerciseCategory.ExerciseCategory;
import tcc.com.domain.lesson.Lesson;
import tcc.com.mapper.ExerciseMapper;
import tcc.com.repository.ExerciseCategoryRepository;
import tcc.com.repository.ExerciseRepository;
import tcc.com.repository.LessonRepository;
import tcc.com.utils.ConvertImage;

@Service
public class CreateExerciseService {

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private ExerciseCategoryRepository exerciseCategoryRepository;

    @Autowired
    private ConvertImage convertImage;

    @Transactional
    public void create(Long lessonId, Long exerciseCategoryId, ExerciseRequest request) {

        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Lição não encontrada."));

        ExerciseCategory exerciseCategory = exerciseCategoryRepository.findById(exerciseCategoryId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria de exercício não encontrada."));

        Exercise exercise = ExerciseMapper.toEntity(request, lesson, exerciseCategory);

        if(!request.getImage().isEmpty()) {
            String uuid = convertImage.uuid();
            String fileName = convertImage.createImage(request.getImage(), uuid);

            exercise.setImage(uuid + fileName);
        }

        exerciseRepository.save(exercise);
    }
}
