package com.fsd.orderservice.service.impl;
import org.springframework.web.client.RestTemplate;


import com.fsd.orderservice.dto.*;
import com.fsd.orderservice.entity.Order;
import com.fsd.orderservice.repository.*;
import com.fsd.orderservice.service.*;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
@Service
@AllArgsConstructor

public class OrderServiceImpl implements OrderService {

	 private OrderRepository orderRepository;
	    private RestTemplate restTemplate;
	@Override
	public Order saveOrder(Order order) {
		return orderRepository.save(order);
	}

	@Override
	public ResponseDto getOrder(Long orderId) {

        ResponseDto responseDto = new ResponseDto();
        Order order = orderRepository.findById(orderId).get();
        OrderDto orderDto = mapToOrder(order);

        ResponseEntity<ProductDto> responseEntity = restTemplate
                .getForEntity("http://localhost:8083/api/products/" + order.getProductId(),
                ProductDto.class);

        ProductDto productDto = responseEntity.getBody();

        System.out.println(responseEntity.getStatusCode());

        responseDto.setOrder(orderDto);
        responseDto.setProduct(productDto);

        return responseDto;
	}
	private OrderDto mapToOrder(Order order){
        OrderDto orderDto = new OrderDto();
        orderDto.setId(order.getId());
        orderDto.setFirstName(order.getFirstName());
        orderDto.setLastName(order.getLastName());
        orderDto.setEmail(order.getEmail());
        return orderDto;
    }

}
