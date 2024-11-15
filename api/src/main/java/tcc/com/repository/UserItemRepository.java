package tcc.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tcc.com.domain.item.Item;
import tcc.com.domain.user.User;
import tcc.com.domain.user.UserItem;

public interface UserItemRepository extends JpaRepository<UserItem, Long> {
    UserItem findByItemAndUser(Item item, User user);
}
