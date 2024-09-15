package tcc.com.mapper;

import tcc.com.controller.request.reason.ReasonRequest;
import tcc.com.controller.response.reason.ReasonResponse;
import tcc.com.domain.reason.Reason;

public class ReasonMapper {

    public static Reason toEntity(ReasonRequest request) {
        Reason reason = new Reason();
        reason.setTitle(request.getTitle());
        return reason;
    }

    public static ReasonResponse toResponse(Reason reason) {
        return ReasonResponse.builder()
                .id(reason.getId())
                .title(reason.getTitle())
                .image(reason.getImage())
                .slug(reason.getSlug())
                .build();
    }
}
