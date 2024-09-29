package tcc.com.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tcc.com.controller.request.chapter.ChapterRequest;
import tcc.com.controller.response.chapter.ChapterResponse;
import tcc.com.service.chapter.CreateChapterService;
import tcc.com.service.chapter.ListChapterService;

import java.util.List;

@RestController
@RequestMapping("/chapter")
public class ChapterController {

    @Autowired
    private CreateChapterService createChapterService;

    @Autowired
    private ListChapterService listChapterService;

    @PostMapping("/create/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@Valid ChapterRequest request, @PathVariable Long id) {
        createChapterService.create(id, request);
    }

    @GetMapping("/list/{areaId}")
    @ResponseStatus(HttpStatus.OK)
    public List<ChapterResponse> list(@PathVariable Long areaId) {
        return listChapterService.list(areaId);
    }
}
