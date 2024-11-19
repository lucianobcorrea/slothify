package tcc.com.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.com.controller.response.item.ItemResponse;
import tcc.com.domain.user.User;
import tcc.com.mapper.ItemMapper;
import tcc.com.security.AuthenticatedUserService;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class GetUserItemsService {

    @Autowired
    private AuthenticatedUserService authenticatedUserService;

    public Map<String, List<ItemResponse>> getItems() {
        User user = authenticatedUserService.get();

        return user.getUserItems().stream()
                .map((userItem -> ItemMapper.toResponse(userItem.getItem())))
                .collect(Collectors.groupingBy(itemResponse ->
                        "UTILITY".equalsIgnoreCase(itemResponse.getItemType())
                                ? "UTILITY"
                                : itemResponse.getSubtype()
                ));
    }
}
