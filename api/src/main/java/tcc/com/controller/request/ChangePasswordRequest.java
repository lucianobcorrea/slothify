package tcc.com.controller.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangePasswordRequest {

    private String email;
    private Long userId;
    private String token;
    private String password;
    private String rePassword;
}
