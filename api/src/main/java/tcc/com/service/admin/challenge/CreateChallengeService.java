package tcc.com.service.admin.challenge;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.com.controller.request.challenge.ChallengeRequest;
import tcc.com.domain.challenge.Challenge;
import tcc.com.mapper.ChallengeMapper;
import tcc.com.repository.ChallengeRepository;

@Service
public class CreateChallengeService {

    @Autowired
    private ChallengeRepository challengeRepository;

    public void create(ChallengeRequest request) {

        Challenge challenge = ChallengeMapper.toEntity(request);
        challengeRepository.save(challenge);
    }
}
