package tcc.com.service.admin.challenge;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tcc.com.controller.request.challenge.ChallengeRequest;
import tcc.com.domain.challenge.Challenge;
import tcc.com.mapper.ChallengeMapper;
import tcc.com.repository.ChallengeRepository;

@Service
public class UpdateChallengeService {

    @Autowired
    private ChallengeRepository challengeRepository;

    public void update(Long id, ChallengeRequest request) {

        Challenge challenge = challengeRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Challenge not found!"));

        Challenge updatedChallenge = ChallengeMapper.toEntityUpdate(request, challenge);

        challengeRepository.save(updatedChallenge);
    }
}
