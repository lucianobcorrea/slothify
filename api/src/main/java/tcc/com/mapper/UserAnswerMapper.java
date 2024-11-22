package tcc.com.mapper;

import tcc.com.controller.request.userAnswer.AnswerRequest;
import tcc.com.domain.exercise.Exercise;
import tcc.com.domain.user.User;
import tcc.com.domain.userAnswer.UserAnswer;

import java.time.LocalDateTime;

public class UserAnswerMapper {

    public static UserAnswer toEntity(AnswerRequest request, Exercise exercise, User user) {
        UserAnswer userAnswer = new UserAnswer();
        userAnswer.setAnswer(request.getAnswer());
        userAnswer.setCorrect(request.isCorrect());
        userAnswer.setExercise(exercise);
        userAnswer.setAnswerDate(LocalDateTime.now());
        userAnswer.setUser(user);
        userAnswer.setLesson(exercise.getLesson());
        return userAnswer;
    }

    public static UserAnswer toEntityGeneral(Exercise exercise, User user) {
        UserAnswer userAnswer = new UserAnswer();
        userAnswer.setExercise(exercise);
        userAnswer.setAnswerDate(LocalDateTime.now());
        userAnswer.setUser(user);
        userAnswer.setLesson(exercise.getLesson());
        return userAnswer;
    }
}
