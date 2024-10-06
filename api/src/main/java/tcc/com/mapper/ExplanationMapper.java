package tcc.com.mapper;

import tcc.com.controller.request.explanation.ExplanationRequest;
import tcc.com.domain.explanation.Explanation;
import tcc.com.domain.lesson.Lesson;

public class ExplanationMapper {

    public static Explanation toEntity(ExplanationRequest request, Lesson lesson) {
        Explanation explanation = new Explanation();
        explanation.setExample(request.getExample());
        explanation.setLesson(lesson);
        explanation.setObjective(request.getObjective());
        explanation.setTip(request.getTip());
        explanation.setTitle(request.getTitle());
        return explanation;
    }
}
