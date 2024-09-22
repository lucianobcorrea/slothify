package tcc.com.controller;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import tcc.com.controller.request.user.EditUserRequest;
import tcc.com.controller.response.user.UserResponse;
import tcc.com.security.AuthenticatedUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import tcc.com.service.user.EditUserService;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private AuthenticatedUserService authenticatedUserService;

    @Autowired
    private EditUserService editUserService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public UserResponse user() {
        return authenticatedUserService.getResponse();
    }

    @PatchMapping("/edit")
    @ResponseStatus(HttpStatus.OK)
    public void edit(@ModelAttribute @Valid EditUserRequest request) {
        editUserService.edit(request);
    }
}
