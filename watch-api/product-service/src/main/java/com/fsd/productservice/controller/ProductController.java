package com.fsd.productservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fsd.productservice.entity.Product;
import com.fsd.productservice.service.ProductService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("api/products")
@AllArgsConstructor
public class ProductController {
	@Autowired
	private ProductService productService;
	
	@CrossOrigin(origins = "http://localhost:3000")
    @PostMapping
    public ResponseEntity<Product> saveProduct(@RequestBody Product product){
        Product savedProduct = productService.saveProduct(product);
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }
	@CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("")
    public List<Product> getallProducta(){
    	return productService.getAllProduct();
    }
	@CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("{id}")
    public ResponseEntity<Product> getProductById(@PathVariable("id") Long productId){
        Product product = productService.getProductById(productId);
        return ResponseEntity.ok(product);
    }
}

