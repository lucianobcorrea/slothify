package tcc.com.mapper;

import tcc.com.controller.request.user.UserRequest;
import tcc.com.controller.response.user.UserResponse;
import tcc.com.domain.level.Level;
import tcc.com.domain.user.User;

public class UserMapper {

    public static User toEntity(UserRequest request, Level level) {
        User user = new User();
        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setCurrentXp(0);
        user.setLevel(level);
        user.setColor("#424242");
        return user;
    }

    public static UserResponse toResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .color(user.getColor())
                .avatar(user.getAvatar() != null ? "http://localhost:8080/files/" + user.getAvatar() : null)
                .banner(user.getBanner() != null ? "http://localhost:8080/files/" + user.getBanner() : null)
                .initialForm(user.isInitialForm())
                .build();
    }
}
