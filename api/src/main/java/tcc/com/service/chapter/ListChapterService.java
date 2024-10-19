package tcc.com.service.chapter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.com.controller.response.chapter.ChapterResponse;
import tcc.com.controller.response.exerciseCategory.ExerciseCategoryResponse;
import tcc.com.controller.response.lesson.LessonResponse;
import tcc.com.domain.area.Area;
import tcc.com.domain.chapter.Chapter;
import tcc.com.domain.exerciseCategory.ExerciseCategory;
import tcc.com.domain.user.User;
import tcc.com.domain.userCourseProgress.UserCourseProgress;
import tcc.com.repository.*;
import tcc.com.security.AuthenticatedUserService;

import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.stream.Collectors;

@Service
public class ListChapterService {

    @Autowired
    private AreaRepository areaRepository;

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private ChapterRepository chapterRepository;

    @Autowired
    private UserAnswerRepository userAnswerRepository;

    @Autowired
    private UserCourseProgressRepository userCourseProgressRepository;

    @Autowired
    private AuthenticatedUserService authenticatedUserService;

    public List<ChapterResponse> list(Long areaId) {
        Area area = areaRepository.findById(areaId)
                .orElseThrow(() -> new RuntimeException("Área não encontrada"));

        User user = authenticatedUserService.get();

        List<Chapter> chapters = chapterRepository.findByArea(area);

        UserCourseProgress userCourseProgress = userCourseProgressRepository.findByUserAndArea(user, area);

        AtomicBoolean canBeDoneOnce = new AtomicBoolean();

        return chapters.stream().map(chapter -> {
            List<LessonResponse> lessonResponses = chapter.getLessons().stream().map(lesson -> {

                ExerciseCategory category = lesson.getExerciseCategory();
                ExerciseCategoryResponse categoryResponse = ExerciseCategoryResponse.builder()
                        .image("http://localhost:8080/files/" + category.getImage())
                        .name(String.valueOf(category.getName()))
                        .build();

                boolean canBeDone = false;

                if((userCourseProgress == null || userCourseProgress.getCompletedExercises() == 0) && !canBeDoneOnce.get()) {
                    canBeDoneOnce.set(true);
                    canBeDone = true;
                }else {
                    if(userCourseProgress != null && userCourseProgress.getLastUnlockedLesson() != null) {
                        canBeDone = lesson.getId() <= userCourseProgress.getLastUnlockedLesson().getId() + 1;
                    }
                }

                return LessonResponse.builder()
                        .id(lesson.getId())
                        .title(lesson.getTitle())
                        .canBeDone(canBeDone)
                        .exerciseType(lesson.getExerciseType())
                        .exerciseCategory(categoryResponse)
                        .build();
            }).collect(Collectors.toList());

            return ChapterResponse.builder()
                    .title(chapter.getTitle())
                    .color(chapter.getColor())
                    .lessons(lessonResponses)
                    .build();
        }).collect(Collectors.toList());
    }
}