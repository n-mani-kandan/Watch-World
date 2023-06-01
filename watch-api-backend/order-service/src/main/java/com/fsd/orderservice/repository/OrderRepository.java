package com.fsd.orderservice.repository;
import org.springframework.data.jpa.repository.JpaRepository;


import com.fsd.orderservice.entity.*;
public interface OrderRepository extends JpaRepository<Order, Long>{

}
