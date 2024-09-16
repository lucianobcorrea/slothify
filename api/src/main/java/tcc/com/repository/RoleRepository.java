package tcc.com.repository;

import tcc.com.domain.role.Role;
import tcc.com.domain.user.UserRoles;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    boolean existsByRole(UserRoles role);
    Role findByRole(UserRoles role);
}
