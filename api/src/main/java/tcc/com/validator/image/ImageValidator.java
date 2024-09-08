package tcc.com.validator.image;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
public class ImageValidator {

    public void validate(String fileName) {
        if(fileName.contains("..")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Imagem inválida, por favor, tente novamente.");
        }

        if (!fileName.endsWith(".jpg") && !fileName.endsWith(".png") && !fileName.endsWith(".jpeg") && !fileName.endsWith(".svg")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Formato de arquivo não suportado.");
        }
    }
}
