package tcc.com.mapper;

import tcc.com.controller.request.lesson.LessonRequest;
import tcc.com.domain.lesson.Lesson;

public class LessonMapper {

    public static Lesson toEntity(LessonRequest request) {
        Lesson lesson = new Lesson();
        lesson.setTitle(request.getTitle());
        return lesson;
    }
}
