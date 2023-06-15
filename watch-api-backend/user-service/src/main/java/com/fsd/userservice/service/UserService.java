package com.fsd.userservice.service;
import java.util.List;

import com.fsd.userservice.dto.ResponseDto;
import com.fsd.userservice.entity.*;
public interface UserService {
	User saveUser(User user);

    ResponseDto getUser(Long userId);
    
    List<User> getAllUsers();
    void deleteUser(Long userId);
    User updateUser(Long userId, User user);

}
