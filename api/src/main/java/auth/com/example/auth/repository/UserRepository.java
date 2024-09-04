package auth.com.example.auth.repository;

import auth.com.example.auth.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends JpaRepository<User, Long> {
    //Metodo utilizado pelo Spring Security para consultar os users
    UserDetails findByEmail(String email);

    boolean existsByEmail(String email);
}