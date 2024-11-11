package tcc.com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import tcc.com.controller.response.item.ItemResponse;
import tcc.com.service.shop.ListShopService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/shop")
public class ShopController {

    @Autowired
    private ListShopService listShopService;

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Map<String, List<ItemResponse>>> getShopItems() {
        Map<String, List<ItemResponse>> items = listShopService.getItems();
        return ResponseEntity.ok(items);
    }
}
