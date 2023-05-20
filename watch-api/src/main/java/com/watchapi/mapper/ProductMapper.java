package com.watchapi.mapper;

import com.watchapi.model.Product;
import com.watchapi.rest.dto.CreateProductRequest;
import com.watchapi.rest.dto.ProductDto;

public interface ProductMapper {

	Product toProduct(CreateProductRequest createproductRequest);

	ProductDto toProductDto(Product product);
}