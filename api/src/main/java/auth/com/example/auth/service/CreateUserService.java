package auth.com.example.auth.service;

import auth.com.example.auth.controller.request.user.UserRequest;
import auth.com.example.auth.domain.role.Role;
import auth.com.example.auth.domain.user.User;
import auth.com.example.auth.domain.user.UserRole;
import auth.com.example.auth.mapper.UserMapper;
import auth.com.example.auth.repository.RoleRepository;
import auth.com.example.auth.repository.UserRepository;
import auth.com.example.auth.validator.UniqueEmailValidator;
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
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    @Transactional
    public ResponseEntity<Void> create(UserRequest data) {

        emailValidator.validate(data.getEmail());

        User user = UserMapper.toEntity(data);
        user.setPassword(passwordEncoder.encode(data.getPassword()));
        user.setActive(true);

        Role role = roleRepository.findByRole(UserRole.USER);

        user.setRole(role);

        userRepository.save(user);

        return ResponseEntity.ok().build();
    }
}
