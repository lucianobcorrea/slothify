package tcc.com.service.user;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tcc.com.controller.request.user.EditUserRequest;
import tcc.com.controller.response.user.UserResponse;
import tcc.com.domain.user.User;
import tcc.com.domain.user.UserItem;
import tcc.com.mapper.UserMapper;
import tcc.com.repository.UserItemRepository;
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

    @Autowired
    private UserItemRepository userItemRepository;

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

        if(request.getUserSelectedBanner() != null) {
            int id = Integer.parseInt(request.getUserSelectedBanner());
            UserItem userItem = userItemRepository.findByItemIdAndUser(id, user);

            if(userItem == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Você não possui este banner!");
            }

            user.setBanner(userItem.getItem().getImage());
        }

        if(request.getUserSelectedAvatar() != null) {
            int id = Integer.parseInt(request.getUserSelectedAvatar());
            UserItem userItem = userItemRepository.findByItemIdAndUser(id, user);

            if(userItem == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Você não possui este avatar!");
            }

            user.setAvatar(userItem.getItem().getImage());
        }

        userRepository.save(user);

        return UserMapper.toResponse(user);
    }
}
