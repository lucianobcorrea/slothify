package tcc.com.mapper;

import tcc.com.controller.response.authentication.LoginResponse;

public class LoginMapper {
    public static LoginResponse toResponse(String token) {
        return LoginResponse.builder()
                .token(token)
                .build();
    }
}
