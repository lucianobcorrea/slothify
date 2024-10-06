package tcc.com.mapper;

import tcc.com.controller.request.exerciseCategory.KeyPointRequest;
import tcc.com.domain.explanation.Explanation;
import tcc.com.domain.explanation.KeyPoint;

public class KeyPointMapper {

    public static KeyPoint toEntity(KeyPointRequest request, Explanation explanation) {
        KeyPoint keyPoint = new KeyPoint();
        keyPoint.setContent(request.getContent());
        keyPoint.setExplanation(explanation);
        return keyPoint;
    }
}
