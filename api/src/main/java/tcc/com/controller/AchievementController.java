package tcc.com.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tcc.com.controller.request.achievement.AchievementRequest;
import tcc.com.service.achievement.CreateAchievementService;

@RestController
@RequestMapping("/achievement")
public class AchievementController {

    @Autowired
    private CreateAchievementService createAchievementService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@ModelAttribute @Valid AchievementRequest request) {
        createAchievementService.create(request);
    }
}
