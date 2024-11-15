package tcc.com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tcc.com.controller.response.item.ItemResponse;
import tcc.com.service.shop.BuyItemService;
import tcc.com.service.shop.ListShopService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/shop")
public class ShopController {

    @Autowired
    private ListShopService listShopService;

    @Autowired
    private BuyItemService buyItemService;

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Map<String, List<ItemResponse>>> getShopItems() {
        Map<String, List<ItemResponse>> items = listShopService.getItems();
        return ResponseEntity.ok(items);
    }

    @PostMapping("/buy/{itemId}")
    @ResponseStatus(HttpStatus.CREATED)
    public void buyItem(@PathVariable Long itemId) {
        buyItemService.buy(itemId);
    }
}
