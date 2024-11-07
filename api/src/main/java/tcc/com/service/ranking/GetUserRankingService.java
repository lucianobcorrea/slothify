package tcc.com.service.ranking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import tcc.com.controller.response.ranking.RankingResponse;
import tcc.com.mapper.RankingMapper;
import tcc.com.repository.RankingRepository;

@Service
public class GetUserRankingService {

    @Autowired
    private RankingRepository rankingRepository;

    public Page<RankingResponse> getRanking(Pageable pageable) {
        return rankingRepository.findAllByOrderByPointsDesc(pageable)
                .map((ranking) -> RankingMapper.toResponse(ranking.getUser(), ranking));
    }
}
