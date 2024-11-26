package tcc.com.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import tcc.com.domain.item.Subtype;
import tcc.com.domain.user.User;
import tcc.com.domain.user.UserUsedItem;

public interface UserUsedItemRepository extends JpaRepository<UserUsedItem, Long> {
    Optional<UserUsedItem> findByUserAndItem_SubtypeAndEffectEndTimeAfter(User user, Subtype subtype, LocalDateTime currentTime);
}
