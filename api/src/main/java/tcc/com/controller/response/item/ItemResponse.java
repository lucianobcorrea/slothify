package tcc.com.controller.response.item;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItemResponse {
    private Long id;
    private String name;
    private String description;
    private String image;
    private int value;
    private Integer duration;
    private String rarity;
    private String itemType;
    private String subtype;
}
