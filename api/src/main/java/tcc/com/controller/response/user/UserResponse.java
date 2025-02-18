package tcc.com.controller.response.user;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private String avatar;
    private String banner;
    private String color;
    private Integer rankingPoint;
    private boolean initialForm;
    private String role;
}
