package auth.com.example.auth.validator;

import auth.com.example.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
public class UniqueEmailValidator {

    @Autowired
    private UserRepository userRepository;

    public void validate(String email) {
        if(userRepository.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email já cadastrado, por favor, tente novamente com outro email.");
        }
    }

}
