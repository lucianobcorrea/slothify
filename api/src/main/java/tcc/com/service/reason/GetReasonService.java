package tcc.com.service.reason;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tcc.com.controller.response.reason.ReasonResponse;
import tcc.com.mapper.ReasonMapper;
import tcc.com.repository.ReasonRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetReasonService {

    @Autowired
    private ReasonRepository reasonRepository;

    public List<ReasonResponse> getReasons() {
        String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString() + "/files/";

        return reasonRepository.findAll().stream()
                .peek(reason -> reason.setImage(baseUrl + reason.getImage()))
                .map(ReasonMapper::toResponse)
                .collect(Collectors.toList());
    }
}
