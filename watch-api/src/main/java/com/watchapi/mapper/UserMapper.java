package com.watchapi.mapper;

import com.watchapi.model.User;
import com.watchapi.rest.dto.UserDto;

public interface UserMapper {

    UserDto toUserDto(User user);
}