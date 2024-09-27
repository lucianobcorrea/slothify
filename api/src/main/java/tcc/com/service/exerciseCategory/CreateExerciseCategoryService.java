package tcc.com.service.exerciseCategory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tcc.com.controller.request.exerciseCategory.ExerciseCategoryRequest;
import tcc.com.domain.exerciseCategory.ExerciseCategory;
import tcc.com.mapper.ExerciseCategoryMapper;
import tcc.com.repository.ExerciseCategoryRepository;
import tcc.com.utils.ConvertImage;

@Service
public class CreateExerciseCategoryService {

    @Autowired
    private ConvertImage convertImage;

    @Autowired
    private ExerciseCategoryRepository exerciseCategoryRepository;

    public void create(ExerciseCategoryRequest request) {
        ExerciseCategory exerciseCategory = ExerciseCategoryMapper.toEntity(request);

        if(!request.getImage().isEmpty()) {
            String uuid = convertImage.uuid();
            String fileName = convertImage.createImage(request.getImage(), uuid);

            exerciseCategory.setImage(uuid + fileName);

            exerciseCategoryRepository.save(exerciseCategory);
        }else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A imagem é obrigatória!");
        }
    }
}
