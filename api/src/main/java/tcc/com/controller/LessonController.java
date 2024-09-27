package tcc.com.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tcc.com.controller.request.lesson.LessonRequest;
import tcc.com.service.lesson.CreateLessonService;

@RestController
@RequestMapping("/lesson")
public class LessonController {

    @Autowired
    private CreateLessonService createLessonService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@Valid LessonRequest request, @PathVariable Long id) {
        createLessonService.create(id, request);
    }
}
