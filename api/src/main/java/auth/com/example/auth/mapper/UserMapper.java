package auth.com.example.auth.mapper;

import auth.com.example.auth.controller.request.user.UserRequest;
import auth.com.example.auth.controller.response.authentication.LoginResponse;
import auth.com.example.auth.controller.response.user.UserResponse;
import auth.com.example.auth.domain.user.User;

public class UserMapper {

    public static User toEntity(UserRequest request) {
        User user = new User();
        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        return user;
    }

    public static UserResponse toResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .build();
    }
}
