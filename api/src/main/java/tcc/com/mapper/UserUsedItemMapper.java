package tcc.com.mapper;

import java.time.LocalDateTime;

import tcc.com.controller.response.item.ItemUseResponse;
import tcc.com.controller.response.user.UserRankingResponse;
import tcc.com.domain.ranking.Ranking;
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

    public static ItemUseResponse toResponse(UserItem userItem) {
        return ItemUseResponse.builder()
                .duration(userItem.getItem().getDuration())
                .subtype(userItem.getItem().getSubtype())
                .build();
    }
}
