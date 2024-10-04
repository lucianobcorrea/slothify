package tcc.com.service.exerciseOption;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tcc.com.controller.request.exerciseOption.ExerciseOptionRequest;
import tcc.com.domain.exercise.Exercise;
import tcc.com.domain.exerciseOption.ExerciseOption;
import tcc.com.mapper.ExerciseOptionMapper;
import tcc.com.repository.ExerciseOptionRepository;
import tcc.com.repository.ExerciseRepository;

@Service
public class CreateExerciseOptionService {

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private ExerciseOptionRepository exerciseOptionRepository;

    @Transactional
    public void create(Long exerciseId, ExerciseOptionRequest request) {

        Exercise exercise = exerciseRepository.findById(exerciseId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Exercício não encontrado."));

        ExerciseOption exerciseOption = ExerciseOptionMapper.toEntity(request, exercise);

        if (request.getContent() != null) {
            exerciseOption.setContent(request.getContent());
        }

        if(request.getCorrectOrder() != null) {
            exerciseOption.setCorrectOrder(request.getCorrectOrder());
        }

        if (request.getCorrect() != null) {
            exerciseOption.setCorrect(request.getCorrect());
        }

        if (request.getCategory() != null) {
            exerciseOption.setCategory(request.getCategory());
        }

        exerciseOptionRepository.save(exerciseOption);
    }
}
