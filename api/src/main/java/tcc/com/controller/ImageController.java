package tcc.com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tcc.com.FileStorageConfig;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/files")
public class ImageController {

    @Autowired
    private FileStorageConfig fileStorageConfig;

    @GetMapping("/{filename}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {

        try {
            Path filePath = Paths.get(fileStorageConfig.getStoragePath()).resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists()) {
                return ResponseEntity.ok()
                        .contentType(determineContentType(filePath))
                        .body(resource);
            } else {
                throw new RuntimeException("Arquivo não encontrado");
            }
        } catch (Exception e) {
            throw new RuntimeException("Erro ao carregar arquivo ", e);
        }
    }

    private MediaType determineContentType(Path path) throws IOException {
        String mimeType = Files.probeContentType(path);
        if (mimeType == null) {
            return MediaType.APPLICATION_OCTET_STREAM;
        }
        return MediaType.parseMediaType(mimeType);
    }
}

