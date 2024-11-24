package tcc.com.service.userAnswer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tcc.com.controller.request.userAnswer.SortingList;
import tcc.com.controller.request.userAnswer.SortingRequest;
import tcc.com.controller.response.userAnswer.AnswerResponse;
import tcc.com.domain.exercise.Exercise;
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
import tcc.com.utils.CompleteChallenge;

@Service
public class CreateSortingService {

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

    private static final int SORTING_XP = 30;
    private static final int WRONG_SORTING_XP = 5;

    private static final int ADVERGAME_XP = 40;
    private static final int BOSS_XP = 60;

    private static final int WRONG_COINS = 3;

    public ResponseEntity<AnswerResponse> create(Long exerciseId, SortingRequest request) {

        User user = authenticatedUserService.get();
        Ranking ranking = rankingRepository.findByUser(user);

        Exercise exercise = exerciseRepository.findById(exerciseId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Esse exercício não existe."));

        UserAnswer userAnswer = userAnswerRepository.findByUserAndExercise(user, exercise);

        if(userAnswer == null) {
            userAnswer = UserAnswerMapper.toEntityGeneral(exercise, user);
        }

        String answer;
        int index = 1;

        for(SortingList list : request.getSortingList()) {
            if(list.correctOrder != index) {
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
            index++;
        }

        if(userAnswer.isCorrect()) {
            if(!userAnswer.isAlreadyAnswered()) {
                userAnswer.setAlreadyAnswered(true);

                UserData userData = userDataRepository.findByUser(user);
                userData.setCompletedTotalExercises(userData.getCompletedTotalExercises() + 1);
                userData.setCompletedSortingExercises(userData.getCompletedSortingExercises() + 1);
                userDataRepository.save(userData);

                UserDailyData userDailyData = userDailyDataRepository.findByUser(user);

                if(userDailyData == null) {
                    userDailyData = new UserDailyData();
                    userDailyData.setUser(user);
                    userDailyDataRepository.save(userDailyData);
                }

                userDailyData.setCompletedTotalExercises(userDailyData.getCompletedTotalExercises() + 1);
                userDailyData.setCompletedSortingExercises(userDailyData.getCompletedSortingExercises() + 1);

                switch (exercise.getLesson().getExerciseCategory().getName()) {
                    case ADVERGAME:
                        ranking.setPoints(ranking.getPoints() + ADVERGAME_XP);
                        user.setCurrentXp(user.getCurrentXp() + ADVERGAME_XP);
                        userDailyData.setTotalXp(userDailyData.getTotalXp() + ADVERGAME_XP);
                        user.setCoins(user.getCoins() + (5 + (ADVERGAME_XP/10)));
                        break;
                    case BOSS:
                        ranking.setPoints(ranking.getPoints() + BOSS_XP);
                        user.setCurrentXp(user.getCurrentXp() + BOSS_XP);
                        userDailyData.setTotalXp(userDailyData.getTotalXp() + BOSS_XP);
                        user.setCoins(user.getCoins() + (5 + (BOSS_XP/10)));
                        break;
                    default:
                        ranking.setPoints(ranking.getPoints() + SORTING_XP);
                        user.setCurrentXp(user.getCurrentXp() + SORTING_XP);
                        userDailyData.setTotalXp(userDailyData.getTotalXp() + SORTING_XP);
                        user.setCoins(user.getCoins() + (5 + (SORTING_XP/10)));
                        break;
                }

                rankingRepository.save(ranking);
                userDailyDataRepository.save(userDailyData);
            }
            UserCourseProgress userCourseProgress = userCourseProgressRepository.findByUserAndArea(user, exercise.getLesson().getChapter().getArea());
            if (userCourseProgress == null) {
                userCourseProgress = UserCourseProgressMapper.toEntity(user, exercise.getLesson().getChapter().getArea(), exercise.getLesson());
            } else {
                if (exercise.getLesson().getId() > userCourseProgress.getLastUnlockedLesson().getId()) {
                    userCourseProgress.setLastUnlockedLesson(exercise.getLesson());
                    userCourseProgress.setCompletedExercises(userCourseProgress.getCompletedExercises() + 1);
                }
            }
            userCourseProgressRepository.save(userCourseProgress);
        }else {
            if(!userAnswer.isAlreadyAnswered()) {
                user.setCurrentXp(user.getCurrentXp() + WRONG_SORTING_XP);
                user.setCoins(user.getCoins() + WRONG_COINS);
                userAnswer.setAlreadyAnswered(false);
            }
        }

        Level currentLevel = user.getLevel();
        Level nextLevel = levelRepository.findByLevelNumber(currentLevel.getLevelNumber() + 1);

        if(nextLevel != null) {
            if(user.getCurrentXp() >= nextLevel.getRequiredXp()) {
                user.setLevel(nextLevel);
            }
        }

        userRepository.save(user);

        assignAchievement.checkAndAssignAchievement(user);
        completeChallenge.checkAndCompleteChallenge(user);

        if(!userAnswer.isCorrect()) {
            userAnswerRepository.save(userAnswer);
            return ResponseEntity.ok(new AnswerResponse(false, "Resposta incorreta, tente novamente!"));
        }else {
            userAnswerRepository.save(userAnswer);
            return ResponseEntity.ok(new AnswerResponse(true, "Resposta correta!"));
        }
    }
}
