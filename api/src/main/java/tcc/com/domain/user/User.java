package tcc.com.domain.user;

import tcc.com.domain.area.Area;
import tcc.com.domain.level.Level;
import tcc.com.domain.offensive.Offensive;
import tcc.com.domain.ranking.Ranking;
import tcc.com.domain.reason.Reason;
import tcc.com.domain.role.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import tcc.com.domain.studyDays.StudyDay;
import tcc.com.domain.studyDurations.StudyDuration;
import tcc.com.domain.userAnswer.UserAnswer;
import tcc.com.domain.userCourseProgress.UserCourseProgress;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

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
    private boolean initialForm;
    private String avatar;
    private String banner;
    private String color;
    private Integer currentXp;
    private Integer coins;

    @OneToMany(mappedBy = "user")
    private List<UserAchievement> userAchievements;

    @OneToMany(mappedBy = "user")
    private List<UserDailyChallenge> userChallenges;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Ranking ranking;

    @OneToOne(mappedBy = "user")
    private Offensive offensive;

    @OneToMany(mappedBy = "user")
    private List<UserItem> userItems;

    @OneToMany(mappedBy = "user")
    private List<UserUsedItem> userUsedItems;

    @ManyToOne
    @JoinColumn(name = "study_duration_id")
    private StudyDuration studyDuration;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @ManyToOne
    @JoinColumn(name = "level_id")
    private Level level;

    @OneToMany(mappedBy = "user")
    private List<UserAnswer> userAnswers = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<UserCourseProgress> courseProgress;

    @OneToOne(mappedBy = "user")
    private UserData userData;

    @ManyToMany
    @JoinTable(name = "user_area",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "area_id"))
    private List<Area> areas = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "user_reason",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "reason_id"))
    private List<Reason> reasons = new ArrayList<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_day",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "week_day_id"))
    private List<StudyDay> studyDays = new ArrayList<>();

    public void createUserDay(StudyDay studyDay) {
        this.getStudyDays().add(studyDay);
        studyDay.getUserStudyDays().add(this);
    }

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

        if(role.getRole() == UserRoles.ADMIN) {
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