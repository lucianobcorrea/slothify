package tcc.com.controller.request.achievement;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class AchievementRequest {

    private String name;
    private String description;
    private MultipartFile image;

    private Integer xpReward;
    private Integer coinsReward;
    private Integer requiredExercises;
    private Integer requiredMultipleChoiceExercises;
    private Integer requiredSortingExercises;
    private Integer requiredDragAndDropExercises;
    private Integer requiredXp;
    private Integer requiredUserLevel;
}
