package tcc.com.service.userAnswer;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tcc.com.controller.request.userAnswer.DragAndDropList;
import tcc.com.controller.request.userAnswer.DragAndDropRequest;
import tcc.com.controller.response.userAnswer.AnswerResponse;
import tcc.com.domain.exercise.Exercise;
import tcc.com.domain.user.User;
import tcc.com.domain.userAnswer.UserAnswer;
import tcc.com.domain.userCourseProgress.UserCourseProgress;
import tcc.com.mapper.UserAnswerMapper;
import tcc.com.mapper.UserCourseProgressMapper;
import tcc.com.repository.ExerciseOptionRepository;
import tcc.com.repository.ExerciseRepository;
import tcc.com.repository.UserAnswerRepository;
import tcc.com.repository.UserCourseProgressRepository;
import tcc.com.security.AuthenticatedUserService;

@Service
public class CreateDragAndDropService {

    @Autowired
    private ExerciseOptionRepository exerciseOptionRepository;

    @Autowired
    private UserAnswerRepository userAnswerRepository;

    @Autowired
    private AuthenticatedUserService authenticatedUserService;

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private UserCourseProgressRepository userCourseProgressRepository;

    public ResponseEntity<AnswerResponse> create(Long exerciseId, DragAndDropRequest request) {

        User user = authenticatedUserService.get();

        Exercise exercise = exerciseRepository.findById(exerciseId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Esse exercício não existe."));

        UserAnswer userAnswer = userAnswerRepository.findByUserAndExercise(user, exercise);

        if(userAnswer == null) {
            userAnswer = UserAnswerMapper.toEntityGeneral(exercise, user);
        }

        String answer;

        for(DragAndDropList list : request.getDragAndDropList()) {
            if(list.category.startsWith("step_invalid")) {
                answer = list.content;
                userAnswer.setCorrect(false);
                userAnswer.setAnswer(answer);
                break;
            }else {
                answer = list.content;
                userAnswer.setCorrect(true);
                userAnswer.setAnswer(answer);
                userAnswer.setLesson(exercise.getLesson());
            }
        }

        UserCourseProgress userCourseProgress = userCourseProgressRepository.findByUserAndArea(user, exercise.getLesson().getChapter().getArea());
        if(userCourseProgress == null) {
            userCourseProgress = UserCourseProgressMapper.toEntity(user, exercise.getLesson().getChapter().getArea(), exercise.getLesson());
        }else {
            if(exercise.getLesson().getId() > userCourseProgress.getLastUnlockedLesson().getId()) {
                userCourseProgress.setLastUnlockedLesson(exercise.getLesson());
                userCourseProgress.setCompletedExercises(userCourseProgress.getCompletedExercises() + 1);
            }
        }

        userCourseProgressRepository.save(userCourseProgress);
        userAnswerRepository.save(userAnswer);

        if(!userAnswer.isCorrect()) {
            return ResponseEntity.ok(new AnswerResponse(false, "Resposta incorreta, tente novamente!"));
        }else {
            return ResponseEntity.ok(new AnswerResponse(true, "Resposta correta!"));
        }
    }
}
