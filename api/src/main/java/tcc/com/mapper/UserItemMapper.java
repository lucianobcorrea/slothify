package tcc.com.mapper;

import tcc.com.domain.item.Item;
import tcc.com.domain.user.User;
import tcc.com.domain.user.UserItem;

public class UserItemMapper {

    public static UserItem toEntity(User user, Item item) {
        UserItem userItem = new UserItem();
        userItem.setQuantity(1);
        userItem.setUser(user);
        userItem.setItem(item);
        return userItem;
    }
}
