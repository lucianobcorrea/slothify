package tcc.com.service.explanation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tcc.com.controller.request.exerciseCategory.KeyPointRequest;
import tcc.com.domain.explanation.Explanation;
import tcc.com.domain.explanation.KeyPoint;
import tcc.com.mapper.KeyPointMapper;
import tcc.com.repository.ExplanationRepository;
import tcc.com.repository.KeyPointRepository;

@Service
public class CreateKeyPointService {

    @Autowired
    private ExplanationRepository explanationRepository;

    @Autowired
    private KeyPointRepository keyPointRepository;

    public void create(KeyPointRequest request, Long explanationId) {

        Explanation explanation = explanationRepository.findById(explanationId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Explicação não encontrada."));

        KeyPoint keyPoint = KeyPointMapper.toEntity(request, explanation);

        keyPointRepository.save(keyPoint);
    }
}
