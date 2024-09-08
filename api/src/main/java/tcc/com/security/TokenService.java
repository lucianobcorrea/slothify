package tcc.com.security;

import tcc.com.controller.request.authentication.TokenRequest;
import tcc.com.domain.revokedToken.RevokedToken;
import tcc.com.domain.user.User;
import tcc.com.repository.RevokedTokenRepository;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {
    @Value("${api.security.token.secret}")

    private String secret;

    @Autowired
    RevokedTokenRepository revokedTokenRepository;

    public String generateToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.create()
                    .withIssuer("tcc")
                    .withSubject(user.getEmail())
                    .withExpiresAt(generateExpirationDate())
                    .sign(algorithm);
        }catch(JWTCreationException e) {
            throw new RuntimeException("Error while generating token", e);
        }
    }

    public String validateToken(String token) {
        if (revokedTokenRepository.findByToken(token).isPresent()) {
            throw new JWTVerificationException("A sua sessão expirou, por favor, entre novamente.");
        }

        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("tcc")
                    .build()
                    .verify(token)
                    .getSubject();
        }catch(JWTVerificationException e) {
            return "";
        }
    }

    private Instant generateExpirationDate() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }

    public void invalidateToken(TokenRequest request) {
        String token = request.getToken();

        RevokedToken revokedToken = new RevokedToken();
        revokedToken.setToken(token);
        revokedToken.setRevokedAt(LocalDateTime.now());

        revokedTokenRepository.save(revokedToken);
    }
}
