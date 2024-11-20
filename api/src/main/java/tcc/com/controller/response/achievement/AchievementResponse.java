package tcc.com.controller.response.achievement;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AchievementResponse {
    private String name;
    private Long id;
    private String description;
    private String image;
    private boolean userHas;

    private Integer total;
    private Integer required;
    private Integer percentage;
}
