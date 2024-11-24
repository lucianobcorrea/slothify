package tcc.com.service.challenge;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import tcc.com.controller.response.challenge.ChallengeCollectResponse;
import tcc.com.domain.level.Level;
import tcc.com.domain.user.User;
import tcc.com.domain.user.UserDailyChallenge;
import tcc.com.mapper.ChallengeMapper;
import tcc.com.repository.LevelRepository;
import tcc.com.repository.UserDailyChallengeRepository;
import tcc.com.repository.UserRepository;
import tcc.com.security.AuthenticatedUserService;

@Service
public class CollectChallengeService {

    @Autowired
    private UserDailyChallengeRepository userDailyChallengeRepository;

    @Autowired
    private AuthenticatedUserService authenticatedUserService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LevelRepository levelRepository;

    public ChallengeCollectResponse collect(Long userDailyChallengeId) {
        User user = authenticatedUserService.get();
        UserDailyChallenge userDailyChallenge = userDailyChallengeRepository.findByIdAndUser(userDailyChallengeId, user);

        if(userDailyChallenge == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ocorreu um erro ao coletar recompensa, tente novamente!");
        }

        if(userDailyChallenge.isCompleted()) {
            if(!userDailyChallenge.isCollected()) {
                userDailyChallenge.setCollected(true);
                userDailyChallengeRepository.save(userDailyChallenge);

                if(userDailyChallenge.getChallenge().getCoinsReward() != null) {
                    user.setCoins(user.getCoins() + userDailyChallenge.getChallenge().getCoinsReward());
                }

                if(userDailyChallenge.getChallenge().getXpReward() != null) {
                    user.setCurrentXp(user.getCurrentXp() + userDailyChallenge.getChallenge().getXpReward());
                }

                Level level = user.getLevel();
                int userLevel = level.getLevelNumber();

                Level nextLevel = levelRepository.findByLevelNumber(userLevel + 1);

                if (nextLevel != null) {
                    if (user.getCurrentXp() >= nextLevel.getRequiredXp()) {
                        user.setLevel(nextLevel);
                    }
                }

                userRepository.save(user);

                return ChallengeMapper.toResponse(userDailyChallenge);
            }else { 
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Você já coletou essa recompensa!");
            }
        }else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Você ainda não completou este desafio, volte mais tarde!");
        }
    }
    
}
