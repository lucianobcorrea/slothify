package tcc.com.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import tcc.com.FileStorageConfig;
import tcc.com.validator.image.ImageValidator;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Component
public class ConvertImage {

    @Autowired
    private ImageValidator imageValidator;

    @Autowired
    private FileStorageConfig fileStorageConfig;

    public String uuid() {
        return UUID.randomUUID().toString();
    }

    public String createImage(MultipartFile img, String uuid) {
        String fileName = StringUtils.cleanPath(img.getOriginalFilename());
        imageValidator.validate(fileName);

        try {
            byte[] bytes = img.getBytes();
            Path path = Paths.get(fileStorageConfig.getStoragePath() + uuid + fileName);

            System.out.println("Salvando arquivo em: " + path);

            Files.write(path, bytes);

            return fileName;
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Erro ao subir imagem, por favor, tente novamente.");
        }
    }
}
