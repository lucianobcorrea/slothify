package auth.com.example.auth.service.seeder;

import auth.com.example.auth.domain.role.Role;
import auth.com.example.auth.domain.user.UserRole;
import auth.com.example.auth.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class RoleSeeder implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        if(!roleRepository.existsByRole(UserRole.ADMIN)) {
            Role adminRole = Role.builder()
                    .role(UserRole.ADMIN)
                    .build();
            roleRepository.save(adminRole);
        }

        if(!roleRepository.existsByRole(UserRole.USER)) {
            Role userRole = Role.builder()
                    .role(UserRole.USER)
                    .build();
            roleRepository.save(userRole);
        }
    }
}
