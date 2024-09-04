package auth.com.example.auth.controller;

import auth.com.example.auth.controller.response.user.UserResponse;
import auth.com.example.auth.security.AuthenticatedUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private AuthenticatedUserService authenticatedUserService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public UserResponse user() {
        return authenticatedUserService.getResponse();
    }
}
