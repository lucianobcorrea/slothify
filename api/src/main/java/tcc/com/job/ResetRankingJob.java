package tcc.com.job;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import tcc.com.domain.ranking.Ranking;
import tcc.com.repository.RankingRepository;

import java.util.ArrayList;
import java.util.List;

@Component
public class ResetRankingJob {

    @Autowired
    private RankingRepository rankingRepository;

    @Scheduled(cron = "0 0 0 * * SUN")
    public void execute() throws InterruptedException {
        List<Ranking> topThree = rankingRepository.findTop3ByOrderByPointsDesc();

        List<Ranking> updatedRankings = new ArrayList<>();

        if (topThree.size() == 3) {
            for (int i = 0; i < topThree.size(); i++) {
                Ranking ranking = topThree.get(i);
                switch (i) {
                    case 0:
                        ranking.setTimesInFirstPlace(ranking.getTimesInFirstPlace() + 1);
                        break;
                    case 1:
                        ranking.setTimesInSecondPlace(ranking.getTimesInSecondPlace() + 1);
                        break;
                    case 2:
                        ranking.setTimesInThirdPlace(ranking.getTimesInThirdPlace() + 1);
                        break;
                }
                updatedRankings.add(ranking);
            }
            rankingRepository.saveAll(updatedRankings);
        }

        rankingRepository.resetAllPoints();
    }
}
