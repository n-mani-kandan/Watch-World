package com.fsd.userservice.controller;

import lombok.AllArgsConstructor;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fsd.userservice.dto.ResponseDto;
import com.fsd.userservice.entity.User;
import com.fsd.userservice.service.UserService;
@RestController
@RequestMapping("api/users")
@AllArgsConstructor
public class UserController {
	  private UserService userService;

	    @PostMapping
	    public ResponseEntity<User> saveUser(@RequestBody User user){
	    	User savedUser = userService.saveUser(user);
	        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
	    }

	    @GetMapping("{id}")
	    public ResponseEntity<ResponseDto> getUser(@PathVariable("id") Long userId){
	        ResponseDto responseDto = userService.getUser(userId);
	        return ResponseEntity.ok(responseDto);
	    }
}
