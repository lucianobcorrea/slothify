package tcc.com.service.reason;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.com.controller.response.reason.ReasonResponse;
import tcc.com.domain.user.User;
import tcc.com.mapper.ReasonMapper;
import tcc.com.repository.ReasonRepository;
import tcc.com.security.AuthenticatedUserService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetUserReasonsService {

    @Autowired
    private ReasonRepository reasonRepository;

    @Autowired
    private AuthenticatedUserService authenticatedUserService;

    public List<ReasonResponse> getUserReasons() {

        User user = authenticatedUserService.get();
        return reasonRepository.findByUserReasons(user)
                .stream()
                .map(ReasonMapper::toResponse)
                .collect(Collectors.toList());
    }
}
