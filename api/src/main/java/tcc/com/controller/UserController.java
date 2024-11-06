package tcc.com.controller;

import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import tcc.com.controller.request.user.EditUserRequest;
import tcc.com.controller.response.area.AreaResponse;
import tcc.com.controller.response.user.UserDataResponse;
import tcc.com.controller.response.user.UserResponse;
import tcc.com.security.AuthenticatedUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import tcc.com.service.user.EditUserService;
import tcc.com.service.user.GetUserAreasService;
import tcc.com.service.user.GetUserDataService;
import tcc.com.service.user.GetUserRankingService;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private AuthenticatedUserService authenticatedUserService;

    @Autowired
    private EditUserService editUserService;

    @Autowired
    private GetUserRankingService getUserRankingService;

    @Autowired
    private GetUserAreasService getUserAreasService;

    @Autowired
    private GetUserDataService getUserDataService;

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

    @GetMapping("/areas")
    @ResponseStatus(HttpStatus.OK)
    public List<AreaResponse> getAreas() {
        return getUserAreasService.getUserAreas();
    }

    @GetMapping("/data")
    @ResponseStatus(HttpStatus.OK)
    public UserDataResponse getUserData() {
        return getUserDataService.getUserData();
    }
}
