package tcc.com.service.area;

import org.springframework.http.HttpStatus;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;
import tcc.com.FileStorageConfig;
import tcc.com.controller.request.area.AreaRequest;
import tcc.com.domain.area.Area;
import tcc.com.mapper.AreaMapper;
import tcc.com.repository.AreaRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.com.utils.Slug;
import tcc.com.validator.image.ImageValidator;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class CreateAreaService {

    @Autowired
    private AreaRepository areaRepository;

    @Autowired
    private ImageValidator imageValidator;

    @Autowired
    private FileStorageConfig fileStorageConfig;

    @Transactional
    public void create(AreaRequest request) {

        try {
            Area area = AreaMapper.toEntity(request);
            area.setSlug(Slug.toSlug(area.getTitle()));

            if(!request.getImage().isEmpty()) {
                String fileName = StringUtils.cleanPath(request.getImage().getOriginalFilename());
                imageValidator.validate(fileName);

                byte[] bytes = request.getImage().getBytes();

                String uuid = UUID.randomUUID().toString();

                Path path = Paths.get(fileStorageConfig.getStoragePath() + uuid + fileName);

                Files.write(path, bytes);

                area.setImage(uuid + fileName);

                areaRepository.save(area);
            }
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Erro ao subir imagem, por favor, tente novamente.");
        }
    }
}
