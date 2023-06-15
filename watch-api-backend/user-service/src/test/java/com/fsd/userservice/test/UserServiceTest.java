package com.fsd.userservice.test;

import com.fsd.userservice.dto.ProductDto;
import com.fsd.userservice.dto.ResponseDto;
import com.fsd.userservice.dto.UserDto;
import com.fsd.userservice.entity.User;
import com.fsd.userservice.repository.UserRepository;
import com.fsd.userservice.service.impl.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSaveUser() {
        User user = new User();
        user.setName("John Doe");
        user.setEmail("johndoe@example.com");
        user.setUsername("johndoe");
        user.setPassword("password");
        user.setRole("ROLE_USER");
        user.setProductId("12345");

        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User savedUser = invocation.getArgument(0);
            savedUser.setId(1L); // Assign a sample ID for testing purposes
            return savedUser;
        });

        User savedUser = userService.saveUser(user);

        assertNotNull(savedUser.getId());
        assertEquals("John Doe", savedUser.getName());
        assertEquals("johndoe@example.com", savedUser.getEmail());
        assertEquals("johndoe", savedUser.getUsername());
        assertEquals("password", savedUser.getPassword());
        assertEquals("ROLE_USER", savedUser.getRole());
        assertEquals("12345", savedUser.getProductId());

        verify(userRepository, times(1)).save(user);
    }


    @Test
    void testGetUser() {
        Long userId = 1L;
        User user = new User();
        user.setId(userId);
        user.setName("John Doe");
        user.setEmail("johndoe@example.com");
        user.setUsername("johndoe");
        user.setPassword("password");
        user.setRole("ROLE_USER");
        user.setProductId("12345");

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        ProductDto productDto = new ProductDto();
        productDto.setId(12345L);
        productDto.setName("Product 1");
        productDto.setPrice(10);
        productDto.setDescription("Description 1");
        productDto.setCount(5);

        ResponseEntity<ProductDto> responseEntity = new ResponseEntity<>(productDto, HttpStatus.OK);
        when(restTemplate.getForEntity("http://localhost:8083/api/products/12345", ProductDto.class))
                .thenReturn(responseEntity);

        ResponseDto expectedResponseDto = new ResponseDto();
        expectedResponseDto.setUser(mapToUserDto(user));
        expectedResponseDto.setProduct(productDto);

        ResponseDto responseDto = userService.getUser(userId);

        assertNotNull(responseDto);
        assertNotNull(responseDto.getUser());
        assertEquals(userId, responseDto.getUser().getId());
        assertEquals("John Doe", responseDto.getUser().getName());
        assertEquals("johndoe@example.com", responseDto.getUser().getEmail());
        assertEquals("johndoe", responseDto.getUser().getUsername());
        assertEquals("password", responseDto.getUser().getPassword());
        assertEquals("ROLE_USER", responseDto.getUser().getRole());
        assertEquals("12345", responseDto.getUser().getProductId());

        assertEquals(productDto.getId(), responseDto.getProduct().getId());
        assertEquals(productDto.getName(), responseDto.getProduct().getName());
        assertEquals(productDto.getPrice(), responseDto.getProduct().getPrice());
        assertEquals(productDto.getDescription(), responseDto.getProduct().getDescription());
        assertEquals(productDto.getCount(), responseDto.getProduct().getCount());

        verify(userRepository, times(1)).findById(userId);
        verify(restTemplate, times(1)).getForEntity("http://localhost:8083/api/products/12345", ProductDto.class);
    }

    @Test
    void testGetAllUsers() {
        List<User> users = new ArrayList<>();
        users.add(new User());
        users.add(new User());
        users.add(new User());

        when(userRepository.findAll()).thenReturn(users);

        List<User> retrievedUsers = userService.getAllUsers();

        assertNotNull(retrievedUsers);
        assertEquals(users.size(), retrievedUsers.size());

        verify(userRepository, times(1)).findAll();
    }
    
    
    @Test
    void testDeleteUser() {
        Long userId = 1L;

        userService.deleteUser(userId);

        verify(userRepository, times(1)).deleteById(userId);
    }

    @Test
    void testUpdateUser() {
        Long userId = 1L;
        User existingUser = new User(userId, "John Doe", "johndoe@example.com", "johndoe", "password", "ROLE_USER", "12345");
        User updatedUser = new User(userId, "John Doe Updated", "johndoe.updated@example.com", "johndoe", "newpassword", "ROLE_ADMIN", "54321");

        when(userRepository.findById(userId)).thenReturn(java.util.Optional.of(existingUser));
        when(userRepository.save(existingUser)).thenReturn(updatedUser);

        User result = userService.updateUser(userId, updatedUser);

        assertNotNull(result);
        assertEquals(userId, result.getId());
        assertEquals("John Doe Updated", result.getName());
        assertEquals("johndoe.updated@example.com", result.getEmail());
        assertEquals("johndoe", result.getUsername());
        assertEquals("newpassword", result.getPassword());
        assertEquals("ROLE_ADMIN", result.getRole());
        assertEquals("54321", result.getProductId());

        verify(userRepository, times(1)).findById(userId);
        verify(userRepository, times(1)).save(existingUser);
    }
    

    private UserDto mapToUserDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setEmail(user.getEmail());
        userDto.setUsername(user.getUsername());
        userDto.setPassword(user.getPassword());
        userDto.setRole(user.getRole());
        userDto.setProductId(user.getProductId());
        return userDto;
    }
}
