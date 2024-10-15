package tcc.com.service.userAnswer;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tcc.com.controller.request.userAnswer.AnswerRequest;
import tcc.com.domain.exercise.Exercise;
import tcc.com.domain.exerciseOption.ExerciseOption;
import tcc.com.domain.user.User;
import tcc.com.domain.userAnswer.UserAnswer;
import tcc.com.mapper.UserAnswerMapper;
import tcc.com.repository.ExerciseOptionRepository;
import tcc.com.repository.ExerciseRepository;
import tcc.com.repository.UserAnswerRepository;
import tcc.com.security.AuthenticatedUserService;

@Service
public class CreateMultipleChoiceService {

    @Autowired
    private ExerciseOptionRepository exerciseOptionRepository;

    @Autowired
    private UserAnswerRepository userAnswerRepository;

    @Autowired
    private AuthenticatedUserService authenticatedUserService;

    @Autowired
    private ExerciseRepository exerciseRepository;
    
    public void create(Long exerciseId, AnswerRequest request) {
        ExerciseOption exerciseOption = exerciseOptionRepository.findByExerciseIdAndCorrectTrue(exerciseId);

        User user = authenticatedUserService.get();

        Exercise exercise = exerciseRepository.findById(exerciseId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Esse exercício não existe."));

        boolean isCorrect = exerciseOption.getContent().equals(request.getAnswer());
        request.setCorrect(isCorrect);

        UserAnswer userAnswer = userAnswerRepository.findByUserAndExercise(user, exercise);

        if(userAnswer == null) {
            userAnswer = UserAnswerMapper.toEntity(request, exercise, user);
        } else {
            userAnswer.setAnswer(request.getAnswer());
            userAnswer.setCorrect(request.isCorrect());
        }

        userAnswerRepository.save(userAnswer);

        if(!isCorrect) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Resposta incorreta, tente novamente!");
        }
    }
}
