package tcc.com.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.com.controller.response.user.UserDataResponse;
import tcc.com.domain.level.Level;
import tcc.com.domain.offensive.Offensive;
import tcc.com.domain.user.User;
import tcc.com.mapper.UserDataMapper;
import tcc.com.repository.LevelRepository;
import tcc.com.repository.OffensiveRepository;
import tcc.com.security.AuthenticatedUserService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

@Service
public class GetUserDataService {

    @Autowired
    private LevelRepository levelRepository;

    @Autowired
    private AuthenticatedUserService authenticatedUserService;

    @Autowired
    private OffensiveRepository offensiveRepository;

    public UserDataResponse getUserData() {
        User user = authenticatedUserService.get();

        Offensive offensive = getOrCreateOffensive(user);
        boolean completedOffensiveToday = Objects.equals(offensive.getLastOffensiveDay().toLocalDate(), LocalDate.now());

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

        return UserDataMapper.toResponse(percentageToNextLevel, maxLevel, actualXp, nextLevel, actualLevel, xpToNextLevel, levelColor, user.getCoins(), completedOffensiveToday, offensive);
    }

    private Offensive getOrCreateOffensive(User user) {
        Offensive offensive = offensiveRepository.findByUser(user);

        if (offensive == null) {
            offensive = new Offensive();
            offensive.setUser(user);
            offensive.setOffensive(0);
            offensive.setLastOffensive(0);
            offensive.setLastOffensiveDay(LocalDateTime.now().minusDays(1));
            offensiveRepository.save(offensive);
        }

        return offensive;
    }
}
