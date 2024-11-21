package tcc.com.controller.request.user;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class EditUserRequest {
    private String username;
    private MultipartFile avatar;
    private MultipartFile banner;
    private String color;
    private String userSelectedAvatar;
    private String userSelectedBanner;
}
