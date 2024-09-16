package tcc.com.controller.response.reason;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReasonResponse {
    String image;
    String slug;
    Long id;
    String title;
}
