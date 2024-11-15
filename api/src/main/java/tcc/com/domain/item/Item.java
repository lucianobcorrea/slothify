package tcc.com.domain.item;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import tcc.com.domain.user.UserItem;
import tcc.com.domain.user.UserUsedItem;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "item")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String image;
    private int value;
    private Integer duration;

    @Enumerated(EnumType.STRING)
    private Rarity rarity;

    @Enumerated(EnumType.STRING)
    private Type itemType;

    @Enumerated(EnumType.STRING)
    private Subtype subtype;

    @OneToMany(mappedBy = "item")
    private List<UserItem> userItems;

    @OneToMany(mappedBy = "item")
    private List<UserUsedItem> userUsedItems;
}
