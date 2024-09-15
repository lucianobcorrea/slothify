package tcc.com.domain.user;

import tcc.com.domain.area.Area;
import tcc.com.domain.reason.Reason;
import tcc.com.domain.role.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private String email;
    private boolean active;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @ManyToMany
    @JoinTable(name = "user_areas",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "area_id"))
    private List<Area> areas = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "user_reasons",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "reason_id"))
    private List<Reason> reasons = new ArrayList<>();

    public void createUserArea(Area area) {
        this.getAreas().add(area);
        area.getUserAreas().add(this);
    }

    public void createUserReason(Reason reason) {
        this.getReasons().add(reason);
        reason.getUserReasons().add(this);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        if(role.getRole() == UserRole.ADMIN) {
            return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USER"));
        }else {
            return List.of(new SimpleGrantedAuthority("ROLE_USER"));
        }
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}