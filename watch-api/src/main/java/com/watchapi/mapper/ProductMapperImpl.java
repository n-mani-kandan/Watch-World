package com.watchapi.mapper;

import org.springframework.stereotype.Service;

import com.watchapi.model.Product;
import com.watchapi.rest.dto.CreateProductRequest;
import com.watchapi.rest.dto.ProductDto;

@Service
public class ProductMapperImpl implements ProductMapper {

    @Override
    public Product toProduct(CreateProductRequest createProductRequest) {
        if (createProductRequest == null) {
            return null;
        }
        return new Product(createProductRequest.getId(), createProductRequest.getName(),createProductRequest.getPrice(),createProductRequest.getCount(),createProductRequest.getDescription());
    }

    @Override
    public ProductDto toProductDto(Product book) {
        if (book == null) {
            return null;
        }
        return new ProductDto(book.getId(), book.getName(),book.getPrice(),book.getCount(),book.getDescription());
    }
}
