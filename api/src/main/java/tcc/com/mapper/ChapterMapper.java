package tcc.com.mapper;

import tcc.com.controller.request.chapter.ChapterRequest;
import tcc.com.domain.chapter.Chapter;

public class ChapterMapper {

    public static Chapter toEntity(ChapterRequest request) {
        Chapter chapter = new Chapter();
        chapter.setTitle(request.getTitle());
        chapter.setColor(request.getColor());
        return chapter;
    }
}
