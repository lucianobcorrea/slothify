package tcc.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tcc.com.domain.passwordResetToken.PasswordResetToken;
import tcc.com.domain.user.User;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    PasswordResetToken findByUserAndToken(User user, String token);
}
