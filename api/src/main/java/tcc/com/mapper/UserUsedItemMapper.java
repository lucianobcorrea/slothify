package tcc.com.mapper;

import java.time.LocalDateTime;

import tcc.com.domain.user.User;
import tcc.com.domain.user.UserItem;
import tcc.com.domain.user.UserUsedItem;

public class UserUsedItemMapper {
    public static UserUsedItem toEntity(UserItem userItem, User user) {
        UserUsedItem userUsedItem = new UserUsedItem();
        userUsedItem.setEffectEndTime(userItem.getItem().getDuration() != null
                ? LocalDateTime.now().plusMinutes(userItem.getItem().getDuration())
                : null);
        userUsedItem.setItem(userItem.getItem());
        userUsedItem.setUser(user);
        return userUsedItem;
    }
}
