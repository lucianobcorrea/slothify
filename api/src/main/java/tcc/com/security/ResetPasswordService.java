package tcc.com.security;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tcc.com.controller.request.ChangePasswordRequest;
import tcc.com.domain.passwordResetToken.PasswordResetToken;
import tcc.com.domain.user.User;
import tcc.com.repository.PasswordResetTokenRepository;
import tcc.com.repository.UserRepository;
import tcc.com.validator.user.PasswordValidator;

import java.time.LocalDateTime;

@Service
public class ResetPasswordService {

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordValidator passwordValidator;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public void resetPassword(ChangePasswordRequest request) {

        passwordValidator.validate(request.getPassword(), request.getRePassword());

        User user = userRepository.findUserByEmail(request.getEmail());

        PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByUserAndToken(user, request.getToken());

        if(passwordResetToken == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Please, verify the email you entered!");
        }

        if(passwordResetToken.getExpiration().isBefore(LocalDateTime.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Your token has expired, please, try again.");
        }

        user.setPassword(passwordEncoder.encode(request.getPassword()));
        passwordResetToken.setExpiration(LocalDateTime.now());

        passwordResetTokenRepository.save(passwordResetToken);
        userRepository.save(user);
    }
}
