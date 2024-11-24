package tcc.com.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tcc.com.controller.request.challenge.ChallengeRequest;
import tcc.com.controller.response.challenge.ChallengeCollectResponse;
import tcc.com.service.challenge.CollectChallengeService;
import tcc.com.service.challenge.CreateChallengeService;

@RestController
@RequestMapping("/challenge")
public class ChallengeController {

    @Autowired
    private CreateChallengeService createChallengeService;

    @Autowired
    private CollectChallengeService collectChallengeService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@Valid @RequestBody ChallengeRequest request) {
        createChallengeService.create(request);
    }

    @PatchMapping("/collect/{userDailyChallengeId}")
    @ResponseStatus(HttpStatus.OK)
    public ChallengeCollectResponse collect(@PathVariable Long userDailyChallengeId) {
        return collectChallengeService.collect(userDailyChallengeId);
    }
}
