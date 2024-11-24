package tcc.com.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.com.controller.response.user.UserChallengeResponse;
import tcc.com.domain.user.User;
import tcc.com.domain.user.UserDailyChallenge;
import tcc.com.domain.user.UserDailyData;
import tcc.com.mapper.UserChallengeMapper;
import tcc.com.repository.UserDailyChallengeRepository;
import tcc.com.repository.UserDailyDataRepository;
import tcc.com.security.AuthenticatedUserService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetUserChallengesService {

    @Autowired
    private AuthenticatedUserService authenticatedUserService;

    @Autowired
    private UserDailyChallengeRepository userDailyChallengeRepository;

    @Autowired
    private UserDailyDataRepository userDailyDataRepository;

    public List<UserChallengeResponse> getUserChallenges() {

        User user = authenticatedUserService.get();
        UserDailyData userDailyData = userDailyDataRepository.findByUser(user);
        List<UserDailyChallenge> userDailyChallenges = userDailyChallengeRepository.findByUser(user);

        return userDailyChallenges.stream()
                .map(userDailyChallenge -> UserChallengeMapper.toResponse(userDailyData, userDailyChallenge, user))
                .collect(Collectors.toList());
    }
}
