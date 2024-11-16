package tcc.com.service.achievement;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tcc.com.controller.request.achievement.AchievementRequest;
import tcc.com.domain.achievement.Achievement;
import tcc.com.mapper.AchievementMapper;
import tcc.com.repository.AchievementRepository;
import tcc.com.utils.ConvertImage;

@Service
public class CreateAchievementService {

    @Autowired
    private AchievementRepository achievementRepository;

    @Autowired
    private ConvertImage convertImage;

    @Transactional
    public void create(AchievementRequest request) {

        Achievement achievement = AchievementMapper.toEntity(request);

        if(!request.getImage().isEmpty()) {
            String uuid = convertImage.uuid();
            String fileName = convertImage.createImage(request.getImage(), uuid);

            achievement.setImage(uuid + fileName);

            achievementRepository.save(achievement);
        }
    }
}
