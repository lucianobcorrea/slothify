package tcc.com.controller.response.chapter;

import lombok.*;
import tcc.com.controller.response.lesson.LessonResponse;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChapterResponse {
    private String title;
    private String color;
    private List<LessonResponse> lessons;
}
