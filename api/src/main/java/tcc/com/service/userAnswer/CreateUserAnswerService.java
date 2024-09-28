package tcc.com.service.userAnswer;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tcc.com.controller.request.userAnswer.UserAnswerRequest;
import tcc.com.domain.exercise.Exercise;
import tcc.com.domain.user.User;
import tcc.com.domain.userAnswer.UserAnswer;
import tcc.com.mapper.UserAnswerMapper;
import tcc.com.repository.ExerciseRepository;
import tcc.com.repository.UserAnswerRepository;
import tcc.com.security.AuthenticatedUserService;

@Service
public class CreateUserAnswerService {

    @Autowired
    private AuthenticatedUserService authenticatedUserService;

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private UserAnswerRepository userAnswerRepository;

    @Transactional
    public void create(Long exerciseId, UserAnswerRequest request) {

        Exercise exercise = exerciseRepository.findById(exerciseId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Exercício não encontrado."));

        User user = authenticatedUserService.get();

        UserAnswer userAnswer = UserAnswerMapper.toEntity(request, exercise, user);

        userAnswerRepository.save(userAnswer);
    }
}
