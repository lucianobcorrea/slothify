package tcc.com.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tcc.com.controller.request.reason.ReasonRequest;
import tcc.com.controller.response.reason.ReasonResponse;
import tcc.com.service.reason.CreateReasonService;
import tcc.com.service.reason.GetReasonService;

import java.util.List;

@RestController
@RequestMapping("/reason")
public class ReasonController {

    @Autowired
    private CreateReasonService createReasonService;

    @Autowired
    private GetReasonService getReasonService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@ModelAttribute @Valid ReasonRequest request) {
        createReasonService.create(request);
    }

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public List<ReasonResponse> getReasons() {
        return getReasonService.getReasons();
    }
}
