package tcc.com.controller.request.exerciseCategory;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
import tcc.com.domain.exerciseCategory.ExerciseCategoryTypes;

@Getter
@Setter
public class ExerciseCategoryRequest {
    ExerciseCategoryTypes name;
    MultipartFile image;
}
