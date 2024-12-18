package tcc.com.security;

import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tcc.com.domain.passwordResetToken.PasswordResetToken;
import tcc.com.domain.user.User;
import tcc.com.repository.PasswordResetTokenRepository;
import tcc.com.repository.UserRepository;
import tcc.com.service.email.EmailService;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class ResetPasswordService {

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Transactional
    public void resetPassword(String email) throws MessagingException {
        User user = userRepository.findUserByEmail(email);

        if(user == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "An error has occurred, please, try again!");
        }

        String token = UUID.randomUUID().toString();

        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetToken.setUser(user);
        passwordResetToken.setToken(token);
        passwordResetToken.setExpiration(LocalDateTime.now().plusMinutes(60));

        passwordResetTokenRepository.save(passwordResetToken);

        String body = "<html><head><style>"
                + "body { font-family: Arial, sans-serif; background-color: #f4f4f9; }"
                + ".container { width: 100%; max-width: 600px; margin: 20px auto; background: #ffffff; "
                + "border-radius: 8px; overflow: hidden; padding: 20px; text-align: center; }"
                + ".btn { display: inline-block; padding: 12px 24px; font-size: 16px; color: #ffffff; "
                + "background-color: #A855F7; text-decoration: none; border-radius: 5px; }"
                + "</style></head>"
                + "<body><div class='container'>"
                + "<h1>Password Recovery</h1>"
                + "<p>We received a request to reset your password. Click the button below to proceed:</p>"
                + "<a class='btn' style=\"display: inline-block; padding: 12px 24px; font-size: 16px; \n" +
                "          color: #ffffff !important; background-color: #A855F7; text-decoration: none; \n" +
                "          border-radius: 5px; font-weight: bold; text-align: center;\" href=\"http://localhost:5174/auth/change-password/" + user.getId() + "/" + token + "\">Reset Password</a>"
                + "<p>This link will expire in 60 minutes.</p></div></body></html>";

        emailService.sendEmail(email, "Slothify - Password Recovery", body);
    }
}
