package com.watchapi.repository;

import org.springframework.stereotype.Repository;

import com.watchapi.model.Product;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
	List<Product> findAllByOrderByName();

    List<Product> findByIdContainingOrNameContainingIgnoreCaseOrderByName(String  id, String name);
}
