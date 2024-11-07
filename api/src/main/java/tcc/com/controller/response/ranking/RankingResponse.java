package tcc.com.controller.response.ranking;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RankingResponse {
    Long id;
    int points;
    String username;
    String avatar;
    String color;
}
