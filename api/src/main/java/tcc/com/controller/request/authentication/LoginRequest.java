package tcc.com.controller.request.authentication;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LoginRequest {

    private String email;
    private String password;
}
