package com.fsd.orderservice.controller;

import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fsd.orderservice.dto.ResponseDto;
import com.fsd.orderservice.entity.Order;
import com.fsd.orderservice.service.OrderService;
@RestController
@RequestMapping("api/orders")
@AllArgsConstructor
public class OrderController {
	  @Autowired
	  private OrderService orderService;
	  
	    @CrossOrigin(origins = "http://localhost:3000")
	    @PostMapping
	    public ResponseEntity<Order> saveUser(@RequestBody Order order){
	    	Order savedOrder = orderService.saveOrder(order);
	        return new ResponseEntity<>(savedOrder, HttpStatus.CREATED);
	    }
	    
	    @CrossOrigin(origins = "http://localhost:3000")
	    @GetMapping("{id}")
	    public ResponseEntity<ResponseDto> getOrder(@PathVariable("id") Long userId){
	        ResponseDto responseDto = orderService.getOrder(userId);
	        return ResponseEntity.ok(responseDto);
	    }
}
