package tcc.com.job;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import tcc.com.domain.challenge.Challenge;
import tcc.com.repository.ChallengeRepository;
import tcc.com.repository.UserDailyChallengeRepository;

import java.util.List;

@Component
public class DailyChallengeJob {

    @Autowired
    private ChallengeRepository challengeRepository;

    @Autowired
    private UserDailyChallengeRepository userDailyChallengeRepository;

    @Scheduled(cron = "0 0 0 * * *")
    public void execute() throws InterruptedException {

        List<Challenge> challenges = challengeRepository.findAll();
    }
}
