package tcc.com.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tcc.com.controller.request.item.ItemRequest;
import tcc.com.controller.response.item.ItemUseResponse;
import tcc.com.service.item.CreateItemService;
import tcc.com.service.item.UseItemService;

@RestController
@RequestMapping("/item")
public class ItemController {

    @Autowired
    private CreateItemService createItemService;

    @Autowired
    private UseItemService useItemService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@Valid @ModelAttribute ItemRequest request) {
        createItemService.create(request);
    }

    @PostMapping("/use/{itemId}")
    @ResponseStatus(HttpStatus.OK)
    public ItemUseResponse useItem(@PathVariable Long itemId) {
        return useItemService.useItem(itemId);
    }
}
