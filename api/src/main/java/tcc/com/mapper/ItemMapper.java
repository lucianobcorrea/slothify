package tcc.com.mapper;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tcc.com.controller.request.item.ItemRequest;
import tcc.com.controller.response.item.ItemResponse;
import tcc.com.domain.item.Item;

public class ItemMapper {

    public static Item toEntity(ItemRequest request) {
        Item item = new Item();
        item.setName(request.getName());
        item.setDescription(request.getDescription());
        item.setValue(request.getValue());
        item.setDuration(request.getDuration());
        item.setRarity(request.getRarity());
        item.setItemType(request.getItemType());
        item.setSubtype(request.getSubtype());
        return item;
    }

    static String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString() + "/files/";

    public static ItemResponse toResponse(Item item, boolean userHasItem) {
        return ItemResponse.builder()
            .id(item.getId())
            .name(item.getName())
            .description(item.getDescription())
            .image(baseUrl + item.getImage())
            .value(item.getValue())
            .duration(item.getDuration())
            .rarity(item.getRarity().toString())
            .itemType(item.getItemType().toString())
            .subtype(item.getSubtype().toString())
            .userHasItem(userHasItem)
            .build();
    }
}
