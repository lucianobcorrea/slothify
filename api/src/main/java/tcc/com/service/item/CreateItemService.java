package tcc.com.service.item;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.com.controller.request.item.ItemRequest;
import tcc.com.domain.item.Item;
import tcc.com.domain.shop.Shop;
import tcc.com.mapper.ItemMapper;
import tcc.com.repository.ItemRepository;
import tcc.com.repository.ShopRepository;
import tcc.com.utils.ConvertImage;

@Service
public class CreateItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ConvertImage convertImage;

    @Autowired
    private ShopRepository shopRepository;

    @Transactional
    public void create(ItemRequest request) {

        Item item = ItemMapper.toEntity(request);

        if(!request.getImage().isEmpty()) {
            String uuid = convertImage.uuid();
            String fileName = convertImage.createImage(request.getImage(), uuid);

            item.setImage(uuid + fileName);

            itemRepository.save(item);

            Shop shop = new Shop();
            shop.setItem(item);
            shopRepository.save(shop);
        }
    }
}
