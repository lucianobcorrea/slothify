package tcc.com.service.chapter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.com.controller.response.chapter.ChapterResponse;
import tcc.com.controller.response.exerciseCategory.ExerciseCategoryResponse;
import tcc.com.controller.response.lesson.LessonResponse;
import tcc.com.domain.area.Area;
import tcc.com.domain.chapter.Chapter;
import tcc.com.domain.exerciseCategory.ExerciseCategory;
import tcc.com.repository.AreaRepository;
import tcc.com.repository.ChapterRepository;
import tcc.com.repository.LessonRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ListChapterService {

    @Autowired
    private AreaRepository areaRepository;

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private ChapterRepository chapterRepository;

    public List<ChapterResponse> list(Long areaId) {
        Area area = areaRepository.findById(areaId)
                .orElseThrow(() -> new RuntimeException("Área não encontrada"));

        List<Chapter> chapters = chapterRepository.findByArea(area);

        return chapters.stream().map(chapter -> {
            List<LessonResponse> lessonResponses = chapter.getLessons().stream().map(lesson -> {

                ExerciseCategory category = lesson.getExerciseCategory();
                ExerciseCategoryResponse categoryResponse = ExerciseCategoryResponse.builder()
                        .image("http://localhost:8080/files/" + category.getImage())
                        .name(String.valueOf(category.getName()))
                        .build();

                return LessonResponse.builder()
                        .id(lesson.getId())
                        .title(lesson.getTitle())
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