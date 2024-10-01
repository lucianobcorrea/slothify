package tcc.com.mapper;

import tcc.com.controller.request.lesson.LessonRequest;
import tcc.com.domain.chapter.Chapter;
import tcc.com.domain.exerciseCategory.ExerciseCategory;
import tcc.com.domain.lesson.Lesson;

public class LessonMapper {

    public static Lesson toEntity(LessonRequest request, Chapter chapter, ExerciseCategory exerciseCategory) {
        Lesson lesson = new Lesson();
        lesson.setTitle(request.getTitle());
        lesson.setChapter(chapter);
        lesson.setExerciseCategory(exerciseCategory);
        lesson.setExerciseType(request.getExerciseType());
        return lesson;
    }
}
