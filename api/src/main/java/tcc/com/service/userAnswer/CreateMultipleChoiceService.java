package tcc.com.service.userAnswer;

import java.time.Duration;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tcc.com.controller.request.userAnswer.AnswerRequest;
import tcc.com.controller.response.userAnswer.AnswerResponse;
import tcc.com.domain.exercise.Exercise;
import tcc.com.domain.exerciseCategory.ExerciseCategoryTypes;
import tcc.com.domain.exerciseOption.ExerciseOption;
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
import tcc.com.utils.UserStudyTimeCheck;

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

    @Autowired
    private UserStudyTimeCheck userStudyTimeCheck;

    private static final int MULTIPLE_CHOICE_XP = 20;
    private static final int WRONG_MULTIPLE_CHOICE_XP = 5;

    private static final int ADVERGAME_XP = 30;
    private static final int BOSS_XP = 50;

    private static final int WRONG_COINS = 3;

    public ResponseEntity<AnswerResponse> create(Long exerciseId, AnswerRequest request) {
        ExerciseOption exerciseOption = exerciseOptionRepository.findByExerciseIdAndCorrectTrue(exerciseId);

        User user = authenticatedUserService.get();
        Ranking ranking = rankingRepository.findByUser(user);

        boolean isXpPotionActive = userUsedItemRepository
                .findByUserAndItem_SubtypeAndEffectEndTimeAfter(user, Subtype.XP_POTION, LocalDateTime.now())
                .isPresent();

        int multipleChoiceXp = MULTIPLE_CHOICE_XP;
        int wrongMultipleChoiceXp = WRONG_MULTIPLE_CHOICE_XP;
        int advergameXp = ADVERGAME_XP;
        int bossXp = BOSS_XP;

        if (isXpPotionActive) {
            multipleChoiceXp *= 2;
            wrongMultipleChoiceXp *= 2;
            advergameXp *= 2;
            bossXp *= 2;
        }

        Exercise exercise = exerciseRepository.findById(exerciseId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Esse exercício não existe."));

        boolean isCorrect = exerciseOption.getContent().equals(request.getAnswer());
        request.setCorrect(isCorrect);

        UserAnswer userAnswer = userAnswerRepository.findByUserAndExercise(user, exercise);

        if (userAnswer == null) {
            userAnswer = UserAnswerMapper.toEntity(request, exercise, user);
        } else {
            userAnswer.setAnswer(request.getAnswer());
            userAnswer.setCorrect(request.isCorrect());
            userAnswer.setLesson(exercise.getLesson());
        }

        int xpReward = 0;
        int coinsReward = 0;

        UserDailyData userDailyData = userDailyDataRepository.findByUser(user);

        if (userDailyData == null) {
            userDailyData = new UserDailyData();
            userDailyData.setUser(user);
            userDailyDataRepository.save(userDailyData);
        }

        if (isCorrect) {
            if (!userAnswer.isAlreadyAnswered()) {
                userAnswer.setAlreadyAnswered(true);

                UserData userData = userDataRepository.findByUser(user);
                userData.setCompletedTotalExercises(userData.getCompletedTotalExercises() + 1);
                userData.setCompletedMultipleChoiceExercises(userData.getCompletedMultipleChoiceExercises() + 1);
                userDataRepository.save(userData);

                userDailyData.setCompletedTotalExercises(userDailyData.getCompletedTotalExercises() + 1);
                userDailyData.setCompletedMultipleChoiceExercises(userDailyData.getCompletedMultipleChoiceExercises() + 1);

                ExerciseCategoryTypes exerciseCategoryType = exercise.getLesson().getExerciseCategory().getName();

                coinsReward = switch (exerciseCategoryType) {
                    case ADVERGAME -> {
                        xpReward = advergameXp;
                        yield 5 + (advergameXp / 10);
                    }
                    case BOSS -> {
                        xpReward = bossXp;
                        yield 5 + (bossXp / 10);
                    }
                    default -> {
                        xpReward = multipleChoiceXp;
                        yield 5 + (multipleChoiceXp / 10);
                    }
                };

                ranking.setPoints(ranking.getPoints() + xpReward);
                user.setCurrentXp(user.getCurrentXp() + xpReward);
                user.setCoins(user.getCoins() + coinsReward);
                userDailyData.setTotalXp(userDailyData.getTotalXp() + xpReward);

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
                xpReward = wrongMultipleChoiceXp;
                coinsReward = WRONG_COINS;

                user.setCurrentXp(user.getCurrentXp() + xpReward);
                user.setCoins(user.getCoins() + coinsReward);
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

        LocalDateTime startDate = request.getStartDate();
        LocalDateTime finalDate = request.getFinalDate();
        long durationInSeconds = Duration.between(startDate, finalDate).getSeconds();

        userDailyData.setStudyTimeSeconds((int) (userDailyData.getStudyTimeSeconds() + durationInSeconds));

        userDailyDataRepository.save(userDailyData);
        userAnswerRepository.save(userAnswer);

        userStudyTimeCheck.checkUserStudyTime(user, userDailyData);

        if (!isCorrect) {
            return ResponseEntity.ok(new AnswerResponse(false, "Resposta incorreta, tente novamente!", xpReward, coinsReward));
        } else {
            return ResponseEntity.ok(new AnswerResponse(true, "Resposta correta!", xpReward, coinsReward));
        }
    }
}

