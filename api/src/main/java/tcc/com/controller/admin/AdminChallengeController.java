package tcc.com.controller.admin;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tcc.com.controller.request.challenge.ChallengeRequest;
import tcc.com.controller.response.challenge.ChallengeResponse;
import tcc.com.service.admin.challenge.CreateChallengeService;
import tcc.com.service.admin.challenge.GetChallengeService;
import tcc.com.service.admin.challenge.GetChallengesService;
import tcc.com.service.admin.challenge.UpdateChallengeService;

import java.util.List;

@RestController
@RequestMapping("/admin/challenge")
public class AdminChallengeController {

    @Autowired
    private CreateChallengeService createChallengeService;

    @Autowired
    private GetChallengesService getChallengesService;

    @Autowired
    private GetChallengeService getChallengeService;

    @Autowired
    private UpdateChallengeService updateChallengeService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@Valid @RequestBody ChallengeRequest request) {
        createChallengeService.create(request);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ChallengeResponse> getChallenges() {
        return getChallengesService.getChallenges();
    }

    @GetMapping("/edit/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ChallengeResponse getChallenge(@PathVariable Long id) {
        return getChallengeService.getChallenge(id);
    }

    @PatchMapping("/update/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateChallenge(@PathVariable Long id, @RequestBody ChallengeRequest request) {
        updateChallengeService.update(id, request);
    }
}
