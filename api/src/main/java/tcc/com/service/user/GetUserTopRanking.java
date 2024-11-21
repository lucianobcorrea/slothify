package tcc.com.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.com.controller.response.user.UserRankingResponse;
import tcc.com.domain.ranking.Ranking;
import tcc.com.domain.user.User;
import tcc.com.mapper.UserTopRankingMapper;
import tcc.com.repository.RankingRepository;
import tcc.com.security.AuthenticatedUserService;

@Service
public class GetUserTopRanking {

    @Autowired
    private RankingRepository rankingRepository;

    @Autowired
    private AuthenticatedUserService authenticatedUserService;

    public UserRankingResponse getUserTopRanking() {

        User user = authenticatedUserService.get();
        Ranking ranking = rankingRepository.findByUser(user);

        return UserTopRankingMapper.toResponse(ranking);
    }
}
