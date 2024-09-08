package tcc.com.mapper;

import tcc.com.controller.request.area.AreaRequest;
import tcc.com.controller.response.area.AreaResponse;
import tcc.com.domain.area.Area;

public class AreaMapper {

    public static Area toEntity(AreaRequest request) {
        Area area = new Area();
        area.setTitle(request.getTitle());
        area.setDescription(request.getDescription());
        area.setActive(true);
        return area;
    }

    public static AreaResponse toResponse(Area area) {
        return AreaResponse.builder()
                .id(area.getId())
                .title(area.getTitle())
                .image(area.getImage())
                .description(area.getDescription())
                .slug(area.getSlug())
                .active(area.isActive())
                .build();
    }
}
