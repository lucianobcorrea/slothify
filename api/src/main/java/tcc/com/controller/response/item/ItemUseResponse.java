package tcc.com.controller.response.item;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import tcc.com.domain.item.Subtype;

@Getter
@Setter
@Builder
public class ItemUseResponse {
    private Subtype subtype;
    private Integer duration;
    private String image;
}
