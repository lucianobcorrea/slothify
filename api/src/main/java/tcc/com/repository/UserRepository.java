package tcc.com.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import tcc.com.controller.response.user.UserResponse;
import tcc.com.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends JpaRepository<User, Long> {
    //Metodo utilizado pelo Spring Security para consultar os users
    UserDetails findByEmail(String email);

    boolean existsByEmail(String email);

    Page<User> findAllByOrderByRankingPointDesc(Pageable pageable);
}