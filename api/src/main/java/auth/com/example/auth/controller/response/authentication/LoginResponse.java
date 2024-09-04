package auth.com.example.auth.controller.response.authentication;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class LoginResponse {
    String token;
}
