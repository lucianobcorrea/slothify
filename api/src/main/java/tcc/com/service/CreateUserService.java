package tcc.com.service;

import tcc.com.controller.request.user.UserRequest;
import tcc.com.domain.role.Role;
import tcc.com.domain.user.User;
import tcc.com.domain.user.UserRoles;
import tcc.com.mapper.UserMapper;
import tcc.com.repository.RoleRepository;
import tcc.com.repository.UserRepository;
import tcc.com.validator.user.PasswordValidator;
import tcc.com.validator.user.UniqueEmailValidator;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

    @Transactional
    public ResponseEntity<Void> create(UserRequest data) {

        emailValidator.validate(data.getEmail());
        passwordValidator.validate(data.getPassword(), data.getRePassword());

        User user = UserMapper.toEntity(data);
        user.setPassword(passwordEncoder.encode(data.getPassword()));
        user.setActive(true);

        Role role = roleRepository.findByRole(UserRoles.USER);

        user.setRole(role);

        userRepository.save(user);

        return ResponseEntity.ok().build();
    }
}
