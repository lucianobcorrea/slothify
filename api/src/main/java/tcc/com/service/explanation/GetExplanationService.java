package tcc.com.service.explanation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tcc.com.controller.response.explanation.ExplanationResponse;
import tcc.com.controller.response.explanation.KeyPointResponse;
import tcc.com.domain.explanation.Explanation;
import tcc.com.domain.explanation.KeyPoint;
import tcc.com.domain.lesson.Lesson;
import tcc.com.repository.ExplanationRepository;
import tcc.com.repository.KeyPointRepository;
import tcc.com.repository.LessonRepository;

import java.util.List;

@Service
public class GetExplanationService {

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private ExplanationRepository explanationRepository;

    @Autowired
    private KeyPointRepository keyPointRepository;

    public ExplanationResponse get(Long lessonId) {

        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Lição não encontrada."));

        Explanation explanation = explanationRepository.findByLesson(lesson)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Explicação não encontrada"));

        List<KeyPoint> keyPoints = keyPointRepository.findByExplanation(explanation)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pontos chave não encontrados"));

        List<KeyPointResponse> keyPointResponses = keyPoints.stream()
                .map(keyPoint -> KeyPointResponse.builder()
                        .content(keyPoint.getContent())
                        .build())
                .toList();

        return ExplanationResponse.builder()
                .title(explanation.getTitle())
                .objective(explanation.getObjective())
                .example(explanation.getExample())
                .tip(explanation.getTip())
                .lesson_id(lessonId)
                .keyPoints(keyPointResponses)
                .build();
    }
}
