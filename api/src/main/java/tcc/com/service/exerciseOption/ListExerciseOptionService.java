package tcc.com.service.exerciseOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tcc.com.controller.response.exerciseOption.ExerciseOptionResponse;
import tcc.com.domain.exercise.Exercise;
import tcc.com.mapper.ExerciseOptionMapper;
import tcc.com.repository.ExerciseOptionRepository;
import tcc.com.repository.ExerciseRepository;

import java.util.Collections;
import java.util.List;
import static java.util.stream.Collectors.*;

@Service
public class ListExerciseOptionService {

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private ExerciseOptionRepository exerciseOptionRepository;

    public List<ExerciseOptionResponse> list(Long exerciseId) {

        Exercise exercise = exerciseRepository.findById(exerciseId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Exercício não encontrado."));

        List<ExerciseOptionResponse> optionResponses = exerciseOptionRepository.findAllByExercise(exercise)
                .stream()
                .map(ExerciseOptionMapper::toResponse)
                .collect(toList());

        Collections.shuffle(optionResponses);

        return optionResponses;
    }
}
