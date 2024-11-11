package tcc.com.service.area;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import tcc.com.controller.request.area.AreaRequest;
import tcc.com.domain.area.Area;
import tcc.com.mapper.AreaMapper;
import tcc.com.repository.AreaRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.com.utils.ConvertImage;
import tcc.com.utils.Slug;

@Service
public class CreateAreaService {

    @Autowired
    private AreaRepository areaRepository;

    @Autowired
    private  ConvertImage convertImage;

    @Transactional
    public void create(AreaRequest request) {

        Area area = AreaMapper.toEntity(request);

        area.setSlug(Slug.toSlug(area.getTitle()));

        if(areaRepository.existsBySlug(area.getSlug())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Essa área já existe, por favor, cadastre uma diferente!");
        }

        if(!request.getImage().isEmpty()) {
            String uuid = convertImage.uuid();
            String fileName = convertImage.createImage(request.getImage(), uuid);

            area.setImage(uuid + fileName);

            areaRepository.save(area);
        }
    }
}
