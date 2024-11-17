package tcc.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tcc.com.domain.user.User;
import tcc.com.domain.user.UserData;

public interface UserDataRepository extends JpaRepository<UserData, Long> {
    UserData findByUser(User user);
}
