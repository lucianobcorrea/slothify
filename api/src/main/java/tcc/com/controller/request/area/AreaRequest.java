package tcc.com.controller.request.area;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter @Setter
public class AreaRequest {

    private String title;
    private String description;
    private MultipartFile image;
}
