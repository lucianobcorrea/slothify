package tcc.com.service.item;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import jakarta.transaction.Transactional;
import tcc.com.domain.item.Subtype;
import tcc.com.domain.offensive.Offensive;
import tcc.com.domain.user.User;
import tcc.com.domain.user.UserItem;
import tcc.com.domain.user.UserUsedItem;
import tcc.com.mapper.UserUsedItemMapper;
import tcc.com.repository.OffensiveRepository;
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

    @Autowired
    private OffensiveRepository offensiveRepository;

    @Transactional
    public void useItem(Long itemId) {
        User user = authenticatedUserService.get();
        UserItem item = userItemRepository.findByItemIdAndUser(Math.toIntExact(itemId), user);

        if (item == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Você não possui este item!");
        }

        if (item.getQuantity() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Você não possui nenhum item deste tipo.");
        }

        UserUsedItem usedItem = UserUsedItemMapper.toEntity(item, user);

        if (item.getItem().getSubtype().equals(Subtype.OFFENSIVE_POTION)) {
            Offensive offensive = offensiveRepository.findByUser(user);
            if (offensive.getLostOffensiveDay().toLocalDate().equals(LocalDate.now().minusDays(1))) {
                if (offensive.getOffensive() == 0) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                            "Você não pode usar este item, ainda está em dia!");
                } else {
                    offensive.setOffensive(offensive.getLastOffensive());
                    offensiveRepository.save(offensive);
                }
            } else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Você perdeu a ofensiva a mais de 1 dia, não pode recuperar!");
            }
        } else if (item.getItem().getSubtype().equals(Subtype.XP_POTION)) {
            Optional<UserUsedItem> activeItem = userUsedItemRepository.findByUserAndItem_SubtypeAndEffectEndTimeAfter(
                    user,
                    Subtype.XP_POTION,
                    LocalDateTime.now());

            if (activeItem.isPresent()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Você já está com o efeito de XP dobrado ativo!");
            }
        }

        item.setQuantity(item.getQuantity() - 1);
        userItemRepository.save(item);
        userUsedItemRepository.save(usedItem);
    }
}
