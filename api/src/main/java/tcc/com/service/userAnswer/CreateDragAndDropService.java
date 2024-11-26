package tcc.com.service.userAnswer;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tcc.com.controller.request.userAnswer.DragAndDropList;
import tcc.com.controller.request.userAnswer.DragAndDropRequest;
import tcc.com.controller.response.userAnswer.AnswerResponse;
import tcc.com.domain.exercise.Exercise;
import tcc.com.domain.item.Subtype;
import tcc.com.domain.level.Level;
import tcc.com.domain.ranking.Ranking;
import tcc.com.domain.user.User;
import tcc.com.domain.user.UserDailyData;
import tcc.com.domain.user.UserData;
import tcc.com.domain.userAnswer.UserAnswer;
import tcc.com.domain.userCourseProgress.UserCourseProgress;
import tcc.com.mapper.UserAnswerMapper;
import tcc.com.mapper.UserCourseProgressMapper;
import tcc.com.repository.*;
import tcc.com.security.AuthenticatedUserService;
import tcc.com.utils.AssignAchievement;
import tcc.com.utils.AssignOffensive;
import tcc.com.utils.CompleteChallenge;

@Service
public class CreateDragAndDropService {

    @Autowired
    private UserAnswerRepository userAnswerRepository;

    @Autowired
    private AuthenticatedUserService authenticatedUserService;

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private UserCourseProgressRepository userCourseProgressRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LevelRepository levelRepository;

    @Autowired
    private RankingRepository rankingRepository;

    @Autowired
    private AssignAchievement assignAchievement;

    @Autowired
    private UserDataRepository userDataRepository;

    @Autowired
    private CompleteChallenge completeChallenge;

    @Autowired
    private UserDailyDataRepository userDailyDataRepository;

    @Autowired
    private AssignOffensive assignOffensive;

    @Autowired
    private UserUsedItemRepository userUsedItemRepository;

    private static int DRAG_AND_DROP_XP = 30;
    private static int WRONG_DRAG_AND_DROP_XP = 5;

    private static int ADVERGAME_XP = 40;
    private static int BOSS_XP = 60;

    private static int WRONG_COINS = 3;

    public ResponseEntity<AnswerResponse> create(Long exerciseId, DragAndDropRequest request) {

        User user = authenticatedUserService.get();
        Ranking ranking = rankingRepository.findByUser(user);

        boolean isXpPotionActive = userUsedItemRepository
                .findByUserAndItem_SubtypeAndEffectEndTimeAfter(user, Subtype.XP_POTION, LocalDateTime.now())
                .isPresent();

        if (isXpPotionActive) {
            DRAG_AND_DROP_XP *= 2;
            WRONG_DRAG_AND_DROP_XP *= 2;
            ADVERGAME_XP *= 2;
            BOSS_XP *= 2;
        }

        Exercise exercise = exerciseRepository.findById(exerciseId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Esse exercício não existe."));

        UserAnswer userAnswer = userAnswerRepository.findByUserAndExercise(user, exercise);

        if (userAnswer == null) {
            userAnswer = UserAnswerMapper.toEntityGeneral(exercise, user);
        }

        String answer;

        for (DragAndDropList list : request.getDragAndDropList()) {
            if (list.category.startsWith("step_invalid")) {
                answer = list.content;
                userAnswer.setCorrect(false);
                userAnswer.setAnswer(answer);
                break;
            } else {
                answer = list.content;
                userAnswer.setCorrect(true);
                userAnswer.setAnswer(answer);
                userAnswer.setLesson(exercise.getLesson());
            }
        }

        if (userAnswer.isCorrect()) {
            if (!userAnswer.isAlreadyAnswered()) {
                userAnswer.setAlreadyAnswered(true);

                UserData userData = userDataRepository.findByUser(user);
                userData.setCompletedTotalExercises(userData.getCompletedTotalExercises() + 1);
                userData.setCompletedDragAndDropExercises(userData.getCompletedDragAndDropExercises() + 1);
                userDataRepository.save(userData);

                UserDailyData userDailyData = userDailyDataRepository.findByUser(user);

                if (userDailyData == null) {
                    userDailyData = new UserDailyData();
                    userDailyData.setUser(user);
                    userDailyDataRepository.save(userDailyData);
                }

                userDailyData.setCompletedTotalExercises(userDailyData.getCompletedTotalExercises() + 1);
                userDailyData.setCompletedDragAndDropExercises(userDailyData.getCompletedDragAndDropExercises() + 1);

                switch (exercise.getLesson().getExerciseCategory().getName()) {
                    case ADVERGAME:
                        ranking.setPoints(ranking.getPoints() + ADVERGAME_XP);
                        user.setCurrentXp(user.getCurrentXp() + ADVERGAME_XP);
                        user.setCoins(user.getCoins() + (5 + (ADVERGAME_XP / 10)));
                        userDailyData.setTotalXp(userDailyData.getTotalXp() + ADVERGAME_XP);
                        break;
                    case BOSS:
                        ranking.setPoints(ranking.getPoints() + BOSS_XP);
                        user.setCurrentXp(user.getCurrentXp() + BOSS_XP);
                        user.setCoins(user.getCoins() + (5 + (BOSS_XP / 10)));
                        userDailyData.setTotalXp(userDailyData.getTotalXp() + BOSS_XP);
                        break;
                    default:
                        ranking.setPoints(ranking.getPoints() + DRAG_AND_DROP_XP);
                        user.setCurrentXp(user.getCurrentXp() + DRAG_AND_DROP_XP);
                        user.setCoins(user.getCoins() + (5 + (DRAG_AND_DROP_XP / 10)));
                        userDailyData.setTotalXp(userDailyData.getTotalXp() + DRAG_AND_DROP_XP);
                        break;
                }

                userDailyDataRepository.save(userDailyData);
                rankingRepository.save(ranking);
            }
            UserCourseProgress userCourseProgress = userCourseProgressRepository.findByUserAndArea(user,
                    exercise.getLesson().getChapter().getArea());
            if (userCourseProgress == null) {
                userCourseProgress = UserCourseProgressMapper.toEntity(user,
                        exercise.getLesson().getChapter().getArea(), exercise.getLesson());
            } else {
                if (exercise.getLesson().getId() > userCourseProgress.getLastUnlockedLesson().getId()) {
                    userCourseProgress.setLastUnlockedLesson(exercise.getLesson());
                    userCourseProgress.setCompletedExercises(userCourseProgress.getCompletedExercises() + 1);
                }
            }
            userCourseProgressRepository.save(userCourseProgress);
        } else {
            if (!userAnswer.isAlreadyAnswered()) {
                user.setCurrentXp(user.getCurrentXp() + WRONG_DRAG_AND_DROP_XP);
                user.setCoins(user.getCoins() + WRONG_COINS);
                userAnswer.setAlreadyAnswered(false);
            }
        }

        Level currentLevel = user.getLevel();
        Level nextLevel = levelRepository.findByLevelNumber(currentLevel.getLevelNumber() + 1);

        if (nextLevel != null) {
            if (user.getCurrentXp() >= nextLevel.getRequiredXp()) {
                user.setLevel(nextLevel);
            }
        }

        userRepository.save(user);

        assignAchievement.checkAndAssignAchievement(user);
        completeChallenge.checkAndCompleteChallenge(user);
        assignOffensive.checkOffensive(user);

        if (!userAnswer.isCorrect()) {
            userAnswerRepository.save(userAnswer);
            return ResponseEntity.ok(new AnswerResponse(false, "Resposta incorreta, tente novamente!"));
        } else {
            userAnswerRepository.save(userAnswer);
            return ResponseEntity.ok(new AnswerResponse(true, "Resposta correta!"));
        }
    }
}
