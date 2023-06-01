package com.fsd.userservice.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.fsd.userservice.entity.*;
public interface UserRepository extends JpaRepository<User, Long>{

}
