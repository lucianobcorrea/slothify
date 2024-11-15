package tcc.com.service.shop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.com.controller.response.item.ItemResponse;
import tcc.com.domain.item.Item;
import tcc.com.domain.item.Type;
import tcc.com.domain.user.User;
import tcc.com.domain.user.UserItem;
import tcc.com.mapper.ItemMapper;
import tcc.com.repository.ShopRepository;
import tcc.com.repository.UserItemRepository;
import tcc.com.security.AuthenticatedUserService;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ListShopService {

    @Autowired
    private ShopRepository shopRepository;

    @Autowired
    private AuthenticatedUserService authenticatedUserService;

    @Autowired
    private UserItemRepository userItemRepository;

    public Map<String, List<ItemResponse>> getItems() {
        List<Item> items = shopRepository.findAllItemsInShop();
        User user = authenticatedUserService.get();

        return items.stream()
                .map((item -> {
                    UserItem userItem = userItemRepository.findByItemAndUser(item, user);
                    boolean userHasItem = userItem != null && item.getItemType() != Type.UTILITY;

                    return ItemMapper.toResponse(item, userHasItem);
                }))
                .collect(Collectors.groupingBy(itemResponse ->
                        "UTILITY".equalsIgnoreCase(itemResponse.getItemType())
                                ? "UTILITY"
                                : itemResponse.getSubtype()
                ));
    }
}
