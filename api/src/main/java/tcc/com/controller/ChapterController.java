package tcc.com.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tcc.com.controller.request.chapter.ChapterRequest;
import tcc.com.service.chapter.CreateChapterService;

@RestController
@RequestMapping("/chapter")
public class ChapterController {

    @Autowired
    private CreateChapterService createChapterService;

    @PostMapping("/create/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@Valid ChapterRequest request, @PathVariable Long id) {
        createChapterService.create(id, request);
    }
}
