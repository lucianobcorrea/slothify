package tcc.com.service.shop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.com.controller.response.item.ItemResponse;
import tcc.com.domain.item.Item;
import tcc.com.mapper.ItemMapper;
import tcc.com.repository.ShopRepository;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ListShopService {

    @Autowired
    private ShopRepository shopRepository;

    public Map<String, List<ItemResponse>> getItems() {
        List<Item> items = shopRepository.findAllItemsInShop();

        return items.stream()
                .map(ItemMapper::toResponse)
                .collect(Collectors.groupingBy(itemResponse ->
                        "UTILITY".equalsIgnoreCase(itemResponse.getItemType())
                                ? "UTILITY"
                                : itemResponse.getSubtype()
                ));
    }
}
