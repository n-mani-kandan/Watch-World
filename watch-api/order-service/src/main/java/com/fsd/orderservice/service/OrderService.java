package com.fsd.orderservice.service;
import com.fsd.orderservice.dto.ResponseDto;
import com.fsd.orderservice.entity.*;
public interface OrderService {
	Order saveOrder(Order order);

    ResponseDto getOrder(Long orderId);
}
