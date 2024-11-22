package tcc.com.security;

import tcc.com.controller.response.user.UserResponse;
import tcc.com.mapper.UserMapper;
import tcc.com.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import tcc.com.domain.user.User;

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

        if(nonNull(user)) {
            return UserMapper.toResponse(user);
        }else {
            return new UserResponse();
        }
    }
}
