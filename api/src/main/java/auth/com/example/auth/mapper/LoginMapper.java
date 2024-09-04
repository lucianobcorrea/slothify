package auth.com.example.auth.mapper;

import auth.com.example.auth.controller.response.authentication.LoginResponse;

public class LoginMapper {
    public static LoginResponse toResponse(String token) {
        return LoginResponse.builder()
                .token(token)
                .build();
    }
}
