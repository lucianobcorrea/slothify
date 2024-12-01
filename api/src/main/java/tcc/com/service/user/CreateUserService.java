package tcc.com.service.user;

import tcc.com.controller.request.user.UserRequest;
import tcc.com.domain.level.Level;
import tcc.com.domain.offensive.Offensive;
import tcc.com.domain.ranking.Ranking;
import tcc.com.domain.role.Role;
import tcc.com.domain.user.User;
import tcc.com.domain.user.UserDailyData;
import tcc.com.domain.user.UserData;
import tcc.com.domain.user.UserRoles;
import tcc.com.mapper.UserMapper;
import tcc.com.repository.*;
import tcc.com.validator.user.PasswordValidator;
import tcc.com.validator.user.UniqueEmailValidator;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CreateUserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UniqueEmailValidator emailValidator;

    @Autowired
    private PasswordValidator passwordValidator;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private RankingRepository rankingRepository;

    @Autowired
    private LevelRepository levelRepository;

    @Autowired
    private UserDataRepository userDataRepository;

    @Autowired
    private UserDailyDataRepository userDailyDataRepository;

    @Autowired
    private OffensiveRepository offensiveRepository;

    @Transactional
    public ResponseEntity<Void> create(UserRequest data) {

        emailValidator.validate(data.getEmail());
        passwordValidator.validate(data.getPassword(), data.getRePassword());

        Level level = levelRepository.findByLevelNumber(1);
        User user = UserMapper.toEntity(data, level);
        user.setPassword(passwordEncoder.encode(data.getPassword()));
        user.setCoins(0);
        user.setActive(true);

        Role role = roleRepository.findByRole(UserRoles.USER);

        user.setRole(role);
        userRepository.save(user);

        Ranking ranking = new Ranking();
        ranking.setUser(user);
        rankingRepository.save(ranking);

        UserData userData = new UserData();
        userData.setUser(user);
        userDataRepository.save(userData);

        UserDailyData userDailyData = new UserDailyData();
        userDailyData.setUser(user);
        userDailyDataRepository.save(userDailyData);

        Offensive offensive = new Offensive();
        offensive.setOffensive(0);
        offensive.setLastOffensive(0);
        offensive.setLastOffensiveDay(LocalDateTime.now().minusDays(1));
        offensive.setUser(user);
        offensiveRepository.save(offensive);

        return ResponseEntity.ok().build();
    }
}
