package tcc.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tcc.com.domain.user.UserUsedItem;

public interface UserUsedItemRepository extends JpaRepository<UserUsedItem, Long> {
}
