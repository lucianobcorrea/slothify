package tcc.com.service.area;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.com.FileStorageConfig;
import tcc.com.controller.response.area.AreaResponse;
import tcc.com.mapper.AreaMapper;
import tcc.com.repository.AreaRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetAreaService {

    @Autowired
    private AreaRepository areaRepository;

    @Autowired
    private FileStorageConfig fileStorageConfig;

    public List<AreaResponse> getAreas() {

        return areaRepository.findAll().stream()
                .peek(area -> area.setImage("http://localhost:8080/files/" + area.getImage()))
                .map(AreaMapper::toResponse)
                .collect(Collectors.toList());
    }
}
