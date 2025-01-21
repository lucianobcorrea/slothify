package tcc.com.service.admin.challenge;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tcc.com.controller.response.challenge.ChallengeResponse;
import tcc.com.domain.challenge.Challenge;
import tcc.com.mapper.ChallengeMapper;
import tcc.com.repository.ChallengeRepository;

@Service
public class GetChallengeService {

    @Autowired
    private ChallengeRepository challengeRepository;

    public ChallengeResponse getChallenge(Long id) {
        Challenge challenge = challengeRepository.findById(id).
                orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't find the challenge, please, try again!"));

        return ChallengeMapper.toResponseAdmin(challenge);
    }
}
