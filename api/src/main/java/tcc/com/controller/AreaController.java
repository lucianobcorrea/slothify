package tcc.com.controller;

import org.springframework.web.bind.annotation.*;
import tcc.com.controller.request.area.AreaRequest;
import tcc.com.controller.response.area.AreaResponse;
import tcc.com.service.area.CreateAreaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import tcc.com.service.area.GetAreaService;

import java.util.List;

@RestController
@RequestMapping("/area")
public class AreaController {

    @Autowired
    private CreateAreaService createAreaService;

    @Autowired
    private GetAreaService getAreaService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@ModelAttribute @Valid AreaRequest request) {
        createAreaService.create(request);
    }

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public List<AreaResponse> getAreas() {
        return getAreaService.getAreas();
    }
}
