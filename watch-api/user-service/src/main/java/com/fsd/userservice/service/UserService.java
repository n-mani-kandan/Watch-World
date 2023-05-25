package com.fsd.userservice.service;
import com.fsd.userservice.dto.ResponseDto;
import com.fsd.userservice.entity.*;
public interface UserService {
	User saveUser(User user);

    ResponseDto getUser(Long userId);
}
