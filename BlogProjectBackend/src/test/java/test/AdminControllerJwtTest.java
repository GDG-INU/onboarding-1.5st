package test;

import com.onboardingbackend.BlogProjectBackend.BlogProjectBackendApplication;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Date;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ActiveProfiles("test")
@SpringBootTest(classes = BlogProjectBackendApplication.class)
@AutoConfigureMockMvc
public class AdminControllerJwtTest {

    @Autowired
    private MockMvc mockMvc;

    @Value("${jwt.secret}") // jwt secret을 테스트에도 불러올 수 있어야 해
    private String jwtSecret;

    // ✅ 테스트용 JWT 생성
    private String generateJwtToken(String username, String role) {
        long now = System.currentTimeMillis();
        Date expiryDate = new Date(now + 1000 * 60 * 10); // 10분짜리 토큰

        return Jwts.builder()
                .setSubject(username)
                .claim("role", role) // "role": "ROLE_ADMIN" 같은 식
                .setIssuedAt(new Date(now))
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS256, jwtSecret.getBytes())
                .compact();
    }

    // ❌ 로그인 안 했을 때 -> 401
    @Test
    public void accessAdminWithoutJwt_shouldReturnUnauthorized() throws Exception {
        mockMvc.perform(get("/admin"))
                .andDo(result -> {
                    System.out.println("응답 코드: " + result.getResponse().getStatus());
                    System.out.println("응답 바디: " + result.getResponse().getContentAsString());
                })
                .andExpect(status().isUnauthorized()); // 기대값: 401
    }

    // ❌ 일반 사용자 접근 -> 403
    @Test
    public void accessAdminWithUserJwt_shouldReturnForbidden() throws Exception {
        String token = generateJwtToken("user", "ROLE_USER");

        mockMvc.perform(get("/admin")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isForbidden());
    }

    // ✅ 관리자 접근 -> 200 OK
    @Test
    public void accessAdminWithAdminJwt_shouldReturnOk() throws Exception {
        String token = generateJwtToken("admin", "ROLE_ADMIN");

        mockMvc.perform(get("/admin")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(content().string("Admin Controller"));
    }
}

