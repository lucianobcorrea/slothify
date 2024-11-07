package tcc.com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import tcc.com.controller.response.ranking.RankingResponse;
import tcc.com.service.ranking.GetUserRankingService;

@RestController
@RequestMapping("/ranking")
public class RankingController {

    @Autowired
    private GetUserRankingService getUserRankingService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Page<RankingResponse> getRanking(Pageable pageable) {
        return getUserRankingService.getRanking(pageable);
    }
}
