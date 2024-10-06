package tcc.com.controller.response.explanation;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExplanationResponse {

    private String title;
    private String objective;
    private String example;
    private String tip;
    private Long lesson_id;
    private List<KeyPointResponse> keyPoints;
}
