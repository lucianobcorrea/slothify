package tcc.com.controller;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import tcc.com.controller.request.user.EditUserRequest;
import tcc.com.controller.response.area.AreaResponse;
import tcc.com.controller.response.reason.ReasonResponse;
import tcc.com.controller.response.studySchedule.StudyScheduleResponse;
import tcc.com.controller.response.user.UserDataResponse;
import tcc.com.controller.response.user.UserResponse;
import tcc.com.security.AuthenticatedUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import tcc.com.service.reason.GetUserReasonsService;
import tcc.com.service.user.EditUserService;
import tcc.com.service.user.GetUserAreasService;
import tcc.com.service.user.GetUserDataService;
import tcc.com.service.user.GetUserScheduleService;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private AuthenticatedUserService authenticatedUserService;

    @Autowired
    private EditUserService editUserService;

    @Autowired
    private GetUserAreasService getUserAreasService;

    @Autowired
    private GetUserDataService getUserDataService;

    @Autowired
    private GetUserReasonsService getUserReasonsService;

    @Autowired
    private GetUserScheduleService getUserScheduleService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public UserResponse user() {
        return authenticatedUserService.getResponse();
    }

    @PatchMapping("/edit")
    @ResponseStatus(HttpStatus.OK)
    public UserResponse edit(@ModelAttribute @Valid EditUserRequest request) {
        return editUserService.edit(request);
    }

    @GetMapping("/areas")
    @ResponseStatus(HttpStatus.OK)
    public List<AreaResponse> getAreas() {
        return getUserAreasService.getUserAreas();
    }

    @GetMapping("/reasons")
    @ResponseStatus(HttpStatus.OK)
    public List<ReasonResponse> getReasons() {
        return getUserReasonsService.getUserReasons();
    }

    @GetMapping("/study-schedule")
    @ResponseStatus(HttpStatus.OK)
    public StudyScheduleResponse getSchedule() {
        return getUserScheduleService.getUserSchedule();
    }

    @GetMapping("/data")
    @ResponseStatus(HttpStatus.OK)
    public UserDataResponse getUserData() {
        return getUserDataService.getUserData();
    }
}
