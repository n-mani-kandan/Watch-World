package com.fsd.userservice.service.impl;
import org.springframework.web.client.RestTemplate;


import com.fsd.userservice.dto.*;
import com.fsd.userservice.entity.User;
import com.fsd.userservice.repository.*;
import com.fsd.userservice.service.*;

import lombok.AllArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

	 private UserRepository userRepository;
	    private RestTemplate restTemplate;
	@Override
	public User saveUser(User user) {
		return userRepository.save(user);
	}
	
	public List<User> getAllUsers() {
		List<User> products = new ArrayList<User>();
		userRepository.findAll().forEach(products1 -> products.add(products1));
		return products;
	}

	@Override
	public ResponseDto getUser(Long userId) {

        ResponseDto responseDto = new ResponseDto();
        User user = userRepository.findById(userId).get();
        UserDto userDto = mapToUser(user);

        ResponseEntity<ProductDto> responseEntity = restTemplate
                .getForEntity("http://localhost:8083/api/products/" + user.getProductId(),
                ProductDto.class);

        ProductDto productDto = responseEntity.getBody();

        System.out.println(responseEntity.getStatusCode());

        responseDto.setUser(userDto);
        responseDto.setProduct(productDto);

        return responseDto;
	}
	
	
	@Override
	public void deleteUser(Long userId) {
	    userRepository.deleteById(userId);
	}

	@Override
	public User updateUser(Long userId, User user) {
	    User existingUser = userRepository.findById(userId)
	            .orElseThrow(() -> new IllegalArgumentException("Invalid user ID: " + userId));

	    existingUser.setName(user.getName());
	    existingUser.setEmail(user.getEmail());
	    existingUser.setUsername(user.getUsername());
	    existingUser.setPassword(user.getPassword());
	    existingUser.setRole(user.getRole());
	    existingUser.setProductId(user.getProductId());

	    return userRepository.save(existingUser);
	}

	
	private UserDto mapToUser(User user){
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setRole(user.getRole());
        userDto.setUsername(user.getUsername());
        userDto.setPassword(user.getPassword());
        userDto.setProductId(user.getProductId());
        userDto.setEmail(user.getEmail());
        return userDto;
    }

	

}
