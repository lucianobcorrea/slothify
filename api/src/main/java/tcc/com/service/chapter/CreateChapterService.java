package tcc.com.service.chapter;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tcc.com.controller.request.chapter.ChapterRequest;
import tcc.com.domain.area.Area;
import tcc.com.domain.chapter.Chapter;
import tcc.com.mapper.ChapterMapper;
import tcc.com.repository.AreaRepository;
import tcc.com.repository.ChapterRepository;

@Service
public class CreateChapterService {

    @Autowired
    private ChapterRepository chapterRepository;

    @Autowired
    private AreaRepository areaRepository;

    @Transactional
    public void create(Long id, ChapterRequest request) {

        Area area = areaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Essa área não existe."));

        Chapter chapter = ChapterMapper.toEntity(request);
        chapter.setArea(area);

        chapterRepository.save(chapter);
    }
}
