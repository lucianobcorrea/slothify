package tcc.com.controller.request.initialForm;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class InitialFormRequest {

    private List<String> areas;
    private List<String> reasons;
    private String studyDay;
    private String studyDuration;
}
