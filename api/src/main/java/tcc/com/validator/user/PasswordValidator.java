package tcc.com.validator.user;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
public class PasswordValidator {
    public void validate(String password, String rePassword) {
        if(!password.equals(rePassword)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "As senhas não são iguais, por favor, tente novamente.");
        }
    }
}
