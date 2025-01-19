package tcc.com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tcc.com.controller.response.challenge.ChallengeCollectResponse;
import tcc.com.service.challenge.CollectChallengeService;

@RestController
@RequestMapping("/challenge")
public class ChallengeController {

    @Autowired
    private CollectChallengeService collectChallengeService;

    @PatchMapping("/collect/{userDailyChallengeId}")
    @ResponseStatus(HttpStatus.OK)
    public ChallengeCollectResponse collect(@PathVariable Long userDailyChallengeId) {
        return collectChallengeService.collect(userDailyChallengeId);
    }
}
