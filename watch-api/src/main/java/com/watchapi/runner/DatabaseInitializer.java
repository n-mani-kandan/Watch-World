package com.watchapi.runner;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.watchapi.model.Product;
import com.watchapi.model.User;
import com.watchapi.security.WebSecurityConfig;
import com.watchapi.service.ProductService;
import com.watchapi.service.UserService;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Component
public class DatabaseInitializer implements CommandLineRunner {

    private final UserService userService;
    private final ProductService productService;

    @Override
    public void run(String... args) {
        if (!userService.getUsers().isEmpty()) {
            return;
        }
        USERS.forEach(userService::saveUser);
        getProducts().forEach(productService::saveProduct);
        log.info("Database initialized");
    }

   
    
    private List<Product> getProducts() {
        return Arrays.stream(PRODUCTS_STR.split("\n"))
                .map(productInfoStr -> productInfoStr.split(";"))
                .map(productInfoArr -> new Product(productInfoArr[0], productInfoArr[1],productInfoArr[2],productInfoArr[3],productInfoArr[4]))
                .collect(Collectors.toList());
    }
    

    private static final List<User> USERS = Arrays.asList(
            new User("admin", "admin", "Admin", "admin@mycompany.com", WebSecurityConfig.ADMIN),
            new User("user", "user", "User", "user@mycompany.com", WebSecurityConfig.USER),
            new User("Mani", "Mani", "Mani", "mani@mycompany.com", WebSecurityConfig.USER)
            
    );

    private static final String BOOKS_STR =
            """
                    101;Tomato
                    9781603090698;August Moon
                    9781891830372;The Barefoot Serpent (softcover) by Scott Morse
                    9781891830723;Will You Still Love Me If I Wet the Bed by Liz Prince
                    9781603094405;Ye
                    """;
    
    
    
    
    private static final String PRODUCTS_STR =
            """
                    101;Sonata;2000;1;https://pngimg.com/uploads/watches/watches_PNG9880.png
                    102;Leon ;1000;1;https://pngimg.com/uploads/watches/watches_PNG101453.png
                    103;Samsung ;2099;1;https://pngimg.com/uploads/watches/watches_PNG101452.png
                    104;Espor;499;1;https://pngimg.com/uploads/watches/watches_PNG101429.png
                    105;Sony;5006;1;https://pngimg.com/uploads/watches/watches_PNG9907.png
                    106;Rolex;899999;1;https://pngimg.com/uploads/watches/watches_PNG9896.png
                    107;Cartier;7999;1;https://pngimg.com/uploads/watches/watches_PNG9872.png
                    108;Gekota;3999;1;https://pngimg.com/uploads/watches/watches_PNG9885.png
                    109;Seiko;8999;1;https://pngimg.com/uploads/watches/watches_PNG9909.png
                    """;
}
