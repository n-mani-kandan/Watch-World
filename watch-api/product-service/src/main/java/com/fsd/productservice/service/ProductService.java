package com.fsd.productservice.service;

import com.fsd.productservice.entity.*;

public interface ProductService {
    Product saveProduct(Product product);

    Product getProductById(Long productId);
}