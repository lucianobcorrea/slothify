package tcc.com.service.exercise;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tcc.com.controller.request.exercise.ExerciseRequest;
import tcc.com.domain.exercise.Exercise;
import tcc.com.domain.lesson.Lesson;
import tcc.com.mapper.ExerciseMapper;
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
    private ConvertImage convertImage;

    @Transactional
    public void create(Long lessonId, ExerciseRequest request) {

        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Lição não encontrada."));

        Exercise exercise = ExerciseMapper.toEntity(request, lesson);

        if(!request.getImage().isEmpty()) {
            String uuid = convertImage.uuid();
            String fileName = convertImage.createImage(request.getImage(), uuid);

            exercise.setImage(uuid + fileName);
        }

        exerciseRepository.save(exercise);
    }
}
