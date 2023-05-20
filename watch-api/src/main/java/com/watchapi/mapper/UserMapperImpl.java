package com.watchapi.mapper;

import org.springframework.stereotype.Service;

import com.watchapi.mapper.UserMapper;
import com.watchapi.model.User;
import com.watchapi.rest.dto.UserDto;

@Service
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDto toUserDto(User user) {
        if (user == null) {
            return null;
        }
        return new UserDto(user.getId(), user.getUsername(), user.getName(), user.getEmail(), user.getRole());
    }
}
