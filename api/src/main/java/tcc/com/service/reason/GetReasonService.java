package tcc.com.service.reason;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.com.FileStorageConfig;
import tcc.com.controller.response.reason.ReasonResponse;
import tcc.com.mapper.ReasonMapper;
import tcc.com.repository.ReasonRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetReasonService {

    @Autowired
    private ReasonRepository reasonRepository;

    @Autowired
    private FileStorageConfig fileStorageConfig;

    public List<ReasonResponse> getReasons() {
        return reasonRepository.findAll().stream()
                .peek(reason -> reason.setImage("http://localhost:8080/files/" + reason.getImage()))
                .map(ReasonMapper::toResponse)
                .collect(Collectors.toList());
    }
}
