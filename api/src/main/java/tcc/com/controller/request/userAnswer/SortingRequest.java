package tcc.com.controller.request.userAnswer;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class SortingRequest {
    private List<SortingList> sortingList;
    private LocalDateTime startDate;
    private LocalDateTime finalDate;
}
