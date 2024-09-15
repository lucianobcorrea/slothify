package tcc.com.controller.request.reason;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter @Setter
public class ReasonRequest {

    private String title;
    private MultipartFile image;
}
