package tcc.com.security;

import tcc.com.controller.response.user.UserResponse;
import tcc.com.domain.level.Level;
import tcc.com.mapper.UserMapper;
import tcc.com.repository.LevelRepository;
import tcc.com.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import tcc.com.domain.user.User;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@Service
public class AuthenticatedUserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LevelRepository levelRepository;

    public Long getId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication.getPrincipal() instanceof User) {
            return ((User) authentication.getPrincipal()).getId();
        }

        return null;
    }

    public User get() {
        Long id = getId();

        if (isNull(id)) {
            return null;
        }

        return userRepository.findById(getId()).orElse(null);
    }

    public UserResponse getResponse() {
        User user = get();

        if(nonNull(user)) {
            int percentageToNextLevel;

            Level currentLevel = user.getLevel();
            Level nextLevel = levelRepository.findByLevelNumber(currentLevel.getLevelNumber() + 1);

            if (nextLevel != null) {
                int xpIntoCurrentLevel = user.getCurrentXp() - currentLevel.getRequiredXp();
                int xpNeededForNextLevel = nextLevel.getRequiredXp() - currentLevel.getRequiredXp();

                if (xpNeededForNextLevel > 0) {
                    percentageToNextLevel = (int) ((double) xpIntoCurrentLevel * 100 / xpNeededForNextLevel);
                    percentageToNextLevel = Math.max(0, Math.min(percentageToNextLevel, 100));
                } else {
                    percentageToNextLevel = 100;
                }
            } else {
                percentageToNextLevel = 100;
            }
            System.out.println("NSDGNIOJKDFGS" + percentageToNextLevel);
            return UserMapper.toResponse(user, percentageToNextLevel);
        }else {
            return new UserResponse();
        }
    }
}
