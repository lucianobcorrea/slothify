package tcc.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tcc.com.domain.area.Area;
import tcc.com.domain.user.User;
import tcc.com.domain.userCourseProgress.UserCourseProgress;

public interface UserCourseProgressRepository extends JpaRepository<UserCourseProgress, Long> {
    UserCourseProgress findByUserAndArea(User user, Area area);
}
