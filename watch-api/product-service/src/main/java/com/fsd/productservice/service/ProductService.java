package com.fsd.productservice.service;

import java.util.List;

import com.fsd.productservice.entity.*;

public interface ProductService {
    Product saveProduct(Product product);

  
    
 
	

	List<Product> getAllProducts();

	Product updateProduct(Long productId, Product product);

	boolean deleteProduct(Long productId);

	Product getProductById(int i);


}