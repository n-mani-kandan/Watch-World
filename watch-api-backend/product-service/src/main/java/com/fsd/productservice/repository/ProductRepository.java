package com.fsd.productservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fsd.productservice.entity.Product;

public interface ProductRepository extends JpaRepository<Product,Long> {

}
