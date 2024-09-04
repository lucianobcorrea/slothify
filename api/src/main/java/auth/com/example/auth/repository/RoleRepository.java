package auth.com.example.auth.repository;

import auth.com.example.auth.domain.role.Role;
import auth.com.example.auth.domain.user.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    boolean existsByRole(UserRole role);
    Role findByRole(UserRole role);
}
