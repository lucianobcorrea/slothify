package tcc.com.controller.admin;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import tcc.com.controller.request.authentication.LoginRequest;
import tcc.com.controller.response.authentication.LoginResponse;
import tcc.com.domain.user.User;
import tcc.com.mapper.LoginMapper;
import tcc.com.security.TokenService;

@RestController
@RequestMapping("admin")
public class AdminAuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public LoginResponse login(@RequestBody @Valid LoginRequest data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.getEmail(), data.getPassword());
        var auth = authenticationManager.authenticate(usernamePassword);

        boolean isAdmin = auth
                .getAuthorities()
                .stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (!isAdmin) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You're not an admin!");
        }

        System.out.println(auth);

        var token = tokenService.generateToken((User) auth.getPrincipal());

        return LoginMapper.toResponse(token);
    }
}
