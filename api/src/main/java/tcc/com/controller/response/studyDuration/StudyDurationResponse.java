package tcc.com.controller.response.studyDuration;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudyDurationResponse {
    Long id;
    String duration;
    String image;
}
