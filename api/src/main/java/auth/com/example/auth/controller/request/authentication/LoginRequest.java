package auth.com.example.auth.controller.request.authentication;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LoginRequest {

    private String email;
    private String password;
}
