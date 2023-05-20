package com.watchapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.ivanfranchin.bookapi.exception.BookNotFoundException;
import com.watchapi.model.Product;
import com.watchapi.repository.ProductRepository;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public List<Product> getProducts() {
        return productRepository.findAllByOrderByName();
    }

    @Override
    public List<Product> getProductsContainingText(String text) {
        return productRepository.findByIdContainingOrNameContainingIgnoreCaseOrderByName(text, text);
    }

    @Override
    public Product validateAndGetProduct(String id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException(String.format("Book with isbn %s not found", id)));
    }

    @Override
    public Product saveProduct(Product book) {
        return productRepository.save(book);
    }

    @Override
    public void deleteProduct(Product book) {
    	productRepository.delete(book);
    }
    
    @Override
    public Product updateProduct(Product product) {
    	return productRepository.save(product);
    }
  
}
