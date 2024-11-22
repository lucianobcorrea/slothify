package tcc.com.service.reason;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tcc.com.controller.request.reason.ReasonRequest;
import tcc.com.domain.reason.Reason;
import tcc.com.mapper.ReasonMapper;
import tcc.com.repository.ReasonRepository;
import tcc.com.utils.ConvertImage;
import tcc.com.utils.Slug;

@Service
public class CreateReasonService {

    @Autowired
    private ConvertImage convertImage;

    @Autowired
    private ReasonRepository reasonRepository;

    @Transactional
    public void create(ReasonRequest request) {
        Reason reason = ReasonMapper.toEntity(request);

        reason.setSlug(Slug.toSlug(reason.getTitle()));

        if(reasonRepository.existsBySlug(reason.getSlug())) {
            System.out.println(reason.getSlug());
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Esse motivo já existe, por favor, cadastre um diferente!");
        }

        if(!request.getImage().isEmpty()) {
            String uuid = convertImage.uuid();
            String fileName = convertImage.createImage(request.getImage(), uuid);

            reason.setImage(uuid + fileName);

            reasonRepository.save(reason);
        }
    }
}
