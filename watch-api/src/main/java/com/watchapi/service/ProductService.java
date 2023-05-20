package com.watchapi.service;

import java.util.List;

import com.watchapi.model.Product;

public interface ProductService {

    List<Product> getProducts();

    List<Product> getProductsContainingText(String text);

    Product validateAndGetProduct(String id);

    Product saveProduct(Product product);

    void deleteProduct(Product product);
    
    Product updateProduct(Product product);

}
