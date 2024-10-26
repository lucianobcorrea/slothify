package tcc.com.mapper;

import tcc.com.domain.area.Area;
import tcc.com.domain.lesson.Lesson;
import tcc.com.domain.user.User;
import tcc.com.domain.userCourseProgress.UserCourseProgress;


public class UserCourseProgressMapper {
    public static UserCourseProgress toEntity(User user, Area area, Lesson lesson) {
        UserCourseProgress userCourseProgress = new UserCourseProgress();
        userCourseProgress.setUser(user);
        userCourseProgress.setArea(area);
        userCourseProgress.setLastUnlockedLesson(lesson);
        userCourseProgress.setCompletedExercises(1);
        return userCourseProgress;
    }
}
