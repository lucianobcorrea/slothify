package tcc.com.job;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import tcc.com.domain.challenge.Challenge;
import tcc.com.domain.user.User;
import tcc.com.domain.user.UserDailyChallenge;
import tcc.com.repository.ChallengeRepository;
import tcc.com.repository.UserDailyChallengeRepository;
import tcc.com.repository.UserRepository;

import java.util.Collections;
import java.util.List;

@Component
public class DailyChallengeJob {

    @Autowired
    private ChallengeRepository challengeRepository;

    @Autowired
    private UserDailyChallengeRepository userDailyChallengeRepository;

    @Autowired
    private UserRepository userRepository;

    @Scheduled(cron = "0 0 0 * * *")
    public void execute() throws InterruptedException {

        userDailyChallengeRepository.deleteAllInBatch();

        List<Challenge> challenges = challengeRepository.findAll();
        List<User> users = userRepository.findAll();

        for (User user : users) {
            Collections.shuffle(challenges);
            List<Challenge> shuffledElements = challenges.subList(0, 3);

            for (Challenge challenge : shuffledElements) {
                UserDailyChallenge userDailyChallenge = new UserDailyChallenge();
                userDailyChallenge.setUser(user);
                userDailyChallenge.setChallenge(challenge);
                userDailyChallenge.setCollected(false);
                userDailyChallenge.setCompleted(false);
                userDailyChallengeRepository.save(userDailyChallenge);
            }
        }
    }
}