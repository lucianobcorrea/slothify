package tcc.com.service.shop;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tcc.com.domain.item.Item;
import tcc.com.domain.item.Type;
import tcc.com.domain.user.User;
import tcc.com.domain.user.UserItem;
import tcc.com.mapper.UserItemMapper;
import tcc.com.repository.ItemRepository;
import tcc.com.repository.UserItemRepository;
import tcc.com.repository.UserRepository;
import tcc.com.security.AuthenticatedUserService;

@Service
public class BuyItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private AuthenticatedUserService authenticatedUserService;

    @Autowired
    private UserItemRepository userItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public void buy(Long itemId) {

        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item não encontrado!"));

        User user = authenticatedUserService.get();

        if(item.getValue() > user.getCoins()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Você não possui moedas suficientes para comprar o item " + item.getName());
        }

        UserItem userItem = userItemRepository.findByItemAndUser(item, user);

        if(userItem != null) {
            if(item.getItemType().equals(Type.UTILITY)) {
                userItem.setQuantity(userItem.getQuantity() + 1);
                user.setCoins(user.getCoins() - item.getValue());

                userRepository.save(user);
                userItemRepository.save(userItem);
            }else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Você já comprou o item " + item.getName());
            }
        }else {
            UserItem userNewItem = UserItemMapper.toEntity(user, item);
            user.setCoins(user.getCoins() - item.getValue());

            userRepository.save(user);
            userItemRepository.save(userNewItem);
        }
    }
}
