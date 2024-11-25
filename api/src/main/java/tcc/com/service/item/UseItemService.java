package tcc.com.service.item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tcc.com.domain.item.Item;
import tcc.com.domain.item.Subtype;
import tcc.com.domain.user.User;
import tcc.com.domain.user.UserItem;
import tcc.com.repository.UserItemRepository;
import tcc.com.repository.UserUsedItemRepository;
import tcc.com.security.AuthenticatedUserService;

@Service
public class UseItemService {

    @Autowired
    private AuthenticatedUserService authenticatedUserService;

    @Autowired
    private UserItemRepository userItemRepository;

    @Autowired
    private UserUsedItemRepository userUsedItemRepository;

    public void useItem(Long itemId) {
        User user = authenticatedUserService.get();
        UserItem item = userItemRepository.findByItemIdAndUser(Math.toIntExact(itemId), user);

        if(item == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Você não possui este item!");
        }

        if(item.getQuantity() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Você não possui nenhum item deste tipo.");
        }

        if(item.getItem().getSubtype().equals(Subtype.OFFENSIVE_POTION)) {

        }else if(item.getItem().getSubtype().equals(Subtype.XP_POTION)) {

        }
    }
}
