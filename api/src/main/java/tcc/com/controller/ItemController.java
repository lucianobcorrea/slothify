package tcc.com.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tcc.com.controller.request.item.ItemRequest;
import tcc.com.service.item.CreateItemService;

@RestController
@RequestMapping("/item")
public class ItemController {

    @Autowired
    private CreateItemService createItemService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@Valid @ModelAttribute ItemRequest request) {
        createItemService.create(request);
    }
}
