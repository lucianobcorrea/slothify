package tcc.com.service.area;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tcc.com.controller.response.area.AreaResponse;
import tcc.com.mapper.AreaMapper;
import tcc.com.repository.AreaRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetAreaService {

    @Autowired
    private AreaRepository areaRepository;

    public List<AreaResponse> getAreas() {

        String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString() + "/files/";

        return areaRepository.findAll().stream()
                .peek(area -> area.setImage(baseUrl + area.getImage()))
                .map(AreaMapper::toResponse)
                .collect(Collectors.toList());
    }
}
