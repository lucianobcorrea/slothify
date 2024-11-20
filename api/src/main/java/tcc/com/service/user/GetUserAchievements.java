package tcc.com.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.com.controller.response.achievement.AchievementResponse;
import tcc.com.domain.achievement.Achievement;
import tcc.com.domain.user.User;
import tcc.com.domain.user.UserData;
import tcc.com.mapper.AchievementMapper;
import tcc.com.repository.AchievementRepository;
import tcc.com.repository.UserAchievementRepository;
import tcc.com.repository.UserDataRepository;
import tcc.com.security.AuthenticatedUserService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetUserAchievements {

    @Autowired
    private AchievementRepository achievementRepository;

    @Autowired
    private UserAchievementRepository userAchievementRepository;

    @Autowired
    private AuthenticatedUserService authenticatedUserService;

    @Autowired
    private UserDataRepository userDataRepository;

    public List<AchievementResponse> getUserAchievements() {

        User user = authenticatedUserService.get();
        List<Achievement> achievements = achievementRepository.findAll();
        UserData userData = userDataRepository.findByUser(user);

        return achievements.stream()
                .map((achievement -> {
                    boolean userHas = userAchievementRepository.findByAchievementAndUser(achievement, user) != null;
                    return AchievementMapper.toResponse(achievement, userData, user, userHas);
                }))
                .collect(Collectors.toList());
    }
}
