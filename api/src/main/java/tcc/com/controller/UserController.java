package tcc.com.controller;

import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import tcc.com.controller.request.user.EditUserRequest;
import tcc.com.controller.response.user.UserResponse;
import tcc.com.security.AuthenticatedUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import tcc.com.service.user.EditUserService;
import tcc.com.service.user.GetUserRankingService;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private AuthenticatedUserService authenticatedUserService;

    @Autowired
    private EditUserService editUserService;

    @Autowired
    private GetUserRankingService getUserRankingService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public UserResponse user() {
        return authenticatedUserService.getResponse();
    }

    @PatchMapping("/edit")
    @ResponseStatus(HttpStatus.OK)
    public UserResponse edit(@ModelAttribute @Valid EditUserRequest request) {
        return editUserService.edit(request);
    }

    @GetMapping("/ranking")
    @ResponseStatus(HttpStatus.OK)
    public Page<UserResponse> getRanking(Pageable pageable) {
        return getUserRankingService.getRanking(pageable);
    }
}
