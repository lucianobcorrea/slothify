package tcc.com.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import tcc.com.controller.response.user.UserResponse;
import tcc.com.mapper.UserMapper;
import tcc.com.repository.UserRepository;

@Service
public class GetUserRankingService {

    @Autowired
    private UserRepository userRepository;

    public Page<UserResponse> getRanking(Pageable pageable) {
        return userRepository.findAllByOrderByRankingPointDesc(pageable)
                .map(UserMapper::toResponse);
    }
}
