package tcc.com.domain.studyDurations;

import lombok.Getter;

@Getter
public enum Duration  {
    FIVE_MINUTES(5),
    TEN_MINUTES(10),
    FIFTEEN_MINUTES(15),
    TWENTY_MINUTES(20);

    private final Integer duration;

    Duration(Integer duration) {
        this.duration = duration;
    }
}
