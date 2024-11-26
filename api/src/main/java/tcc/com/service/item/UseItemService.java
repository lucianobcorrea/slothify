package tcc.com.service.item;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import jakarta.transaction.Transactional;
import tcc.com.controller.response.item.ItemUseResponse;
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
    public ItemUseResponse useItem(Long itemId) {
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

            if (offensive.getOffensive() != 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Você ainda está com ofensiva ativa e não precisa usar este item!");
            }

            LocalDate lostDay = offensive.getLostOffensiveDay().toLocalDate();
            long daysBetween = ChronoUnit.DAYS.between(lostDay, LocalDate.now());

            if (daysBetween < 0 || daysBetween > 1) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Você perdeu a ofensiva há mais de 1 dia e não pode recuperar!");
            }

            offensive.setLastOffensiveDay(LocalDateTime.now());
            offensive.setOffensive(offensive.getLastOffensive());
            offensiveRepository.save(offensive);
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

        return UserUsedItemMapper.toResponse(item);
    }
}
