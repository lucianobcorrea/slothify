package tcc.com.controller.request.item;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
import tcc.com.domain.item.Rarity;
import tcc.com.domain.item.Subtype;
import tcc.com.domain.item.Type;

@Getter
@Setter
public class ItemRequest {

    String name;
    String description;
    MultipartFile image;
    int value;
    Integer duration;
    Rarity rarity;
    Type itemType;
    Subtype subtype;
}
