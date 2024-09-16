package tcc.com.domain.studyDurations;

import lombok.Getter;

@Getter
public enum Durations {
    FIVE_MINUTES(5),
    TEN_MINUTES(10),
    FIFTEEN_MINUTES(15),
    TWENTY_MINUTES(20);

    private final Integer duration;

    Durations(Integer duration) {
        this.duration = duration;
    }
}
