package tcc.com.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.com.controller.response.user.UserDataResponse;
import tcc.com.domain.level.Level;
import tcc.com.domain.user.User;
import tcc.com.mapper.UserDataMapper;
import tcc.com.repository.LevelRepository;
import tcc.com.repository.UserRepository;
import tcc.com.security.AuthenticatedUserService;

@Service
public class GetUserDataService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LevelRepository levelRepository;

    @Autowired
    private AuthenticatedUserService authenticatedUserService;

    public UserDataResponse getUserData() {
        User user = authenticatedUserService.get();

        Level currentLevel = user.getLevel();
        Level nextUserLevel = levelRepository.findByLevelNumber(currentLevel.getLevelNumber() + 1);

        Integer xpToNextLevel;
        int percentageToNextLevel;
        boolean maxLevel = false;
        int actualXp = user.getCurrentXp();
        int actualLevel = user.getLevel().getLevelNumber();
        Integer nextLevel;
        String levelColor = currentLevel.getColor();

        if (nextUserLevel != null) {
            xpToNextLevel = nextUserLevel.getRequiredXp();
            nextLevel = nextUserLevel.getLevelNumber();
            int xpIntoCurrentLevel = user.getCurrentXp() - currentLevel.getRequiredXp();
            int xpNeededForNextLevel = nextUserLevel.getRequiredXp() - currentLevel.getRequiredXp();

            if (xpNeededForNextLevel > 0) {
                percentageToNextLevel = (int) ((double) xpIntoCurrentLevel * 100 / xpNeededForNextLevel);
                percentageToNextLevel = Math.max(0, Math.min(percentageToNextLevel, 100));
            } else {
                percentageToNextLevel = 100;
            }
        } else {
            maxLevel = true;
            percentageToNextLevel = 100;
            nextLevel = null;
            xpToNextLevel = null;
        }

        return UserDataMapper.toResponse(percentageToNextLevel, maxLevel, actualXp, nextLevel, actualLevel, xpToNextLevel, levelColor);
    }
}
