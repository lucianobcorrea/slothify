package tcc.com.controller.response.area;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AreaResponse {
    String image;
    String slug;
    Long id;
    String title;
    String description;
    boolean active;
}
