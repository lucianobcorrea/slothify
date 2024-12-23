package tcc.com.controller;

import jakarta.mail.MessagingException;
import tcc.com.controller.request.ChangePasswordRequest;
import tcc.com.controller.request.authentication.LoginRequest;
import tcc.com.controller.request.authentication.TokenRequest;
import tcc.com.controller.request.user.UserRequest;
import tcc.com.controller.response.authentication.LoginResponse;
import tcc.com.domain.user.User;
import tcc.com.mapper.LoginMapper;
import tcc.com.security.ResetPasswordService;
import tcc.com.security.SendResetPasswordEmailService;
import tcc.com.security.TokenService;
import tcc.com.service.user.CreateUserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
public class AuthenticationController {

    @Autowired
    private CreateUserService createUserService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private SendResetPasswordEmailService sendResetPasswordEmailService;

    @Autowired
    private ResetPasswordService resetPasswordService;

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public LoginResponse login(@RequestBody @Valid LoginRequest data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.getEmail(), data.getPassword());
        var auth = authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());

        return LoginMapper.toResponse(token);
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Void> register(@RequestBody @Valid UserRequest data) {
        return createUserService.create(data);
    }

    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void logout(@RequestBody @Valid TokenRequest request) {
        tokenService.invalidateToken(request);
    }

    @PostMapping("/reset-password/{email}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void sendResetPasswordEmail(@PathVariable String email) throws MessagingException {
        sendResetPasswordEmailService.sendResetPasswordEmail(email);
    }

    @PatchMapping("/reset-password")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void resetPassword(@RequestBody @Valid ChangePasswordRequest request) {
        resetPasswordService.resetPassword(request);
    }
}
