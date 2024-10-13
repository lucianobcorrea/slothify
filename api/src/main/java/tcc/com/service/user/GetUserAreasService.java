package tcc.com.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.com.controller.response.area.AreaResponse;
import tcc.com.domain.user.User;
import tcc.com.mapper.AreaMapper;
import tcc.com.repository.AreaRepository;
import tcc.com.security.AuthenticatedUserService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetUserAreasService {

    @Autowired
    private AuthenticatedUserService authenticatedUserService;

    @Autowired
    private AreaRepository areaRepository;

    public List<AreaResponse> getUserAreas() {

        User user = authenticatedUserService.get();
        return areaRepository.findByUserAreas(user)
                .stream()
                .map(AreaMapper::toResponse)
                .collect(Collectors.toList());
    }
}
