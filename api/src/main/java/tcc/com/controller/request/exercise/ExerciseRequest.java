package tcc.com.controller.request.exercise;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter @Setter
public class ExerciseRequest {
    String statement;
    MultipartFile image;
}
