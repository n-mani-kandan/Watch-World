package com.fsd.productservice.service.impl;
import java.util.ArrayList;
import java.util.List;

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

	@Override
	public List<Product> getAllProduct() {
		List<Product> products = new ArrayList<Product>();
		productRepository.findAll().forEach(products1 -> products.add(products1));
		return products;
	}
}
