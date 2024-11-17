package tcc.com.domain.studyDays;

import lombok.Getter;

@Getter
public enum WeekDays {
    MONDAY("Segunda-Feira"),
    TUESDAY("Terça-Feira"),
    WEDNESDAY("Quarta-Feira"),
    THURSDAY("Quinta-Feira"),
    FRIDAY("Sexta-Feira"),
    SATURDAY("Sábado"),
    SUNDAY("Domingo");

    private final String day;

    WeekDays(String day) {
        this.day = day;
    }
}
