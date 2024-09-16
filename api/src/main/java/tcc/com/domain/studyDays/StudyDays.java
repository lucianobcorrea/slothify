package tcc.com.domain.studyDays;

import jakarta.persistence.*;
import lombok.*;
import tcc.com.domain.user.User;

import java.util.List;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "study_day")
public class StudyDays {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private WeekDays weekDay;

    @ManyToMany(mappedBy = "studyDays")
    private List<User> userStudyDays;
}
