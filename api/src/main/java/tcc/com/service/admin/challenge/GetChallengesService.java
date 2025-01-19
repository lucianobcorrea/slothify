package tcc.com.service.admin.challenge;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.com.controller.response.challenge.ChallengeResponse;
import tcc.com.mapper.ChallengeMapper;
import tcc.com.repository.ChallengeRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetChallengesService {

    @Autowired
    private ChallengeRepository challengeRepository;

    public List<ChallengeResponse> getChallenges() {

        return challengeRepository.findAll().stream()
                .map(ChallengeMapper::toResponseAdmin)
                .collect(Collectors.toList());
    }
}
