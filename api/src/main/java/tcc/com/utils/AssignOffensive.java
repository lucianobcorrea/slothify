package tcc.com.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import tcc.com.domain.offensive.Offensive;
import tcc.com.domain.user.User;
import tcc.com.repository.OffensiveRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class AssignOffensive {

    @Autowired
    private OffensiveRepository offensiveRepository;

    public void checkOffensive(User user) {
        Offensive offensive = offensiveRepository.findByUser(user);

        if(offensive == null) {
            Offensive newOffensive = new Offensive();
            newOffensive.setUser(user);
            newOffensive.setOffensive(1);
            newOffensive.setLastOffensive(1);
            newOffensive.setLastOffensiveDay(LocalDateTime.now());
            offensiveRepository.save(newOffensive);
        }else {
            if (offensive.getLastOffensiveDay() == null) {
                offensive.setOffensive(1);
                offensive.setLastOffensive(1);
                offensive.setLastOffensiveDay(LocalDateTime.now());
                offensiveRepository.save(offensive);
                return;
            }

            LocalDateTime lastOffensiveDay = offensive.getLastOffensiveDay();

            if (lastOffensiveDay.toLocalDate().isBefore(LocalDate.now())) {

                offensive.setOffensive(offensive.getOffensive() + 1);
                if(offensive.getOffensive() > offensive.getLastOffensive()) {
                    offensive.setLastOffensive(offensive.getLastOffensive() + 1);
                }

                offensive.setLastOffensiveDay(LocalDateTime.now());
                offensiveRepository.save(offensive);
            }
        }
    }
}