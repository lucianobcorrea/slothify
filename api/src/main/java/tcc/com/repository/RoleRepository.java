package tcc.com.repository;

import tcc.com.domain.role.Role;
import tcc.com.domain.user.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    boolean existsByRole(UserRole role);
    Role findByRole(UserRole role);
}
