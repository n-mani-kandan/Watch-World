package com.fsd.productservice.service;

import java.util.List;

import com.fsd.productservice.entity.*;

public interface ProductService {
    Product saveProduct(Product product);

    Product getProductById(Long productId);
    
 
	List<Product> getAllProduct();
}