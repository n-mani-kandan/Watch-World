package com.fsd.userservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

	    private Long id;
	    private String name;
	    private String email;
	    private String username;
	    private String password;
	    private String role;
	    private String productId;
}
