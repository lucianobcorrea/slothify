package tcc.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tcc.com.domain.user.User;
import tcc.com.domain.user.UserDailyData;

public interface UserDailyDataRepository extends JpaRepository<UserDailyData, Long> {
    UserDailyData findByUser(User user);
}
