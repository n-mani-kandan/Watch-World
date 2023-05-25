package com.fsd.productservice.service.impl;
import org.springframework.stereotype.Service;

import com.fsd.productservice.entity.Product;
import com.fsd.productservice.repository.ProductRepository;
import com.fsd.productservice.service.ProductService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor

public class ProductServiceImpl implements ProductService{
	
	 private ProductRepository productRepository;
	@Override
	public Product saveProduct(Product product) {
	return productRepository.save(product);
	}

	@Override
	public Product getProductById(Long productId) {
		 return productRepository.findById(productId).get();
	}

}
