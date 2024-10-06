package tcc.com.service.explanation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tcc.com.controller.request.explanation.ExplanationRequest;
import tcc.com.domain.explanation.Explanation;
import tcc.com.domain.lesson.Lesson;
import tcc.com.mapper.ExplanationMapper;
import tcc.com.repository.ExplanationRepository;
import tcc.com.repository.LessonRepository;

@Service
public class CreateExplanationService {

    @Autowired
    private ExplanationRepository explanationRepository;

    @Autowired
    private LessonRepository lessonRepository;

    public void create(ExplanationRequest request, Long lessonId) {

        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Lição não encontrada."));

        Explanation explanation = ExplanationMapper.toEntity(request, lesson);

        explanationRepository.save(explanation);
    }
}
