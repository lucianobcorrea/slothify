package tcc.com.service.seeder;

import tcc.com.domain.role.Role;
import tcc.com.domain.user.UserRoles;
import tcc.com.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class RoleSeeder implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        if(!roleRepository.existsByRole(UserRoles.ADMIN)) {
            Role adminRole = Role.builder()
                    .role(UserRoles.ADMIN)
                    .build();
            roleRepository.save(adminRole);
        }

        if(!roleRepository.existsByRole(UserRoles.USER)) {
            Role userRole = Role.builder()
                    .role(UserRoles.USER)
                    .build();
            roleRepository.save(userRole);
        }
    }
}
