package tcc.com;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Getter
@Configuration
public class FileStorageConfig {

    @Value("${file.storage-path}")
    private String storagePath;
}
