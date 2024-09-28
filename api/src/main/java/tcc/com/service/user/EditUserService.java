package tcc.com.service.user;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.com.controller.request.user.EditUserRequest;
import tcc.com.controller.response.user.UserResponse;
import tcc.com.domain.user.User;
import tcc.com.mapper.UserMapper;
import tcc.com.repository.UserRepository;
import tcc.com.security.AuthenticatedUserService;
import tcc.com.utils.ConvertImage;

@Service
public class EditUserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticatedUserService authenticatedUserService;

    @Autowired
    private ConvertImage convertImage;

    @Transactional
    public UserResponse edit(EditUserRequest request) {
        User user = authenticatedUserService.get();

        user.setUsername(request.getUsername());

        if(request.getColor() != null) {
            user.setColor(request.getColor());
        }

        if(request.getAvatar() != null) {
            String uuid = convertImage.uuid();
            String fileName = convertImage.createImage(request.getAvatar(), uuid);

            user.setAvatar(uuid + fileName);
        }

        if(request.getBanner() != null) {
            String uuid = convertImage.uuid();
            String fileName = convertImage.createImage(request.getBanner(), uuid);

            user.setBanner(uuid + fileName);
        }

        userRepository.save(user);

        return UserMapper.toResponse(user);
    }
}
