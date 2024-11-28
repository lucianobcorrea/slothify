package tcc.com.controller.request.userAnswer;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class DragAndDropRequest {
    private List<DragAndDropList> dragAndDropList;
    private LocalDateTime startDate;
    private LocalDateTime finalDate;
 }
