package tcc.com.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import tcc.com.domain.item.Subtype;
import tcc.com.domain.level.Level;
import tcc.com.domain.user.User;
import tcc.com.domain.user.UserDailyData;
import tcc.com.repository.*;

import java.time.LocalDateTime;

@Component
public class UserStudyTimeCheck {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserUsedItemRepository userUsedItemRepository;

    @Autowired
    private LevelRepository levelRepository;

    @Autowired
    private UserDailyDataRepository userDailyDataRepository;

    public void checkUserStudyTime(User user, UserDailyData userDailyData) {

        int minutes = (userDailyData.getStudyTimeSeconds() % 3600) / 60;
        int userChosenStudyTime = user.getStudyDuration().getDuration().getDuration();

        int xpReward = 100;
        int coinsReward = 100;

        boolean isXpPotionActive = userUsedItemRepository
                .findByUserAndItem_SubtypeAndEffectEndTimeAfter(user, Subtype.XP_POTION, LocalDateTime.now())
                .isPresent();

        if(userChosenStudyTime >= minutes && !userDailyData.isStudyTimeReward()) {
            if(isXpPotionActive) {
                xpReward *= 2;
                coinsReward *= 2;
            }

            user.setCurrentXp(user.getCurrentXp() + xpReward);

            Level level = user.getLevel();
            int userLevel = level.getLevelNumber();

            Level nextLevel = levelRepository.findByLevelNumber(userLevel + 1);

            if (nextLevel != null) {
                if (user.getCurrentXp() >= nextLevel.getRequiredXp()) {
                    user.setLevel(nextLevel);
                }
            }

            user.setCoins(user.getCoins() + coinsReward);

            userDailyData.setStudyTimeReward(true);
            userDailyDataRepository.save(userDailyData);
            userRepository.save(user);
        }
    }
}
