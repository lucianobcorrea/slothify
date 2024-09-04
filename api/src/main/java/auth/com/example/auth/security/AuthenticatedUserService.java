package auth.com.example.auth.security;

import auth.com.example.auth.controller.response.user.UserResponse;
import auth.com.example.auth.mapper.UserMapper;
import auth.com.example.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import auth.com.example.auth.domain.user.User;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@Service
public class AuthenticatedUserService {

    @Autowired
    private UserRepository userRepository;

    public Long getId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication.getPrincipal() instanceof User) {
            return ((User) authentication.getPrincipal()).getId();
        }

        return null;
    }

    public User get() {
        Long id = getId();

        if (isNull(id)) {
            return null;
        }

        return userRepository.findById(getId()).orElse(null);
    }

    public UserResponse getResponse() {
        User user = get();
        return nonNull(user) ? UserMapper.toResponse(user) : new UserResponse();
    }
}
