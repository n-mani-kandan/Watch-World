package com.watchapi.rest;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.watchapi.mapper.ProductMapper;
import com.watchapi.model.Product;
import com.watchapi.rest.dto.CreateProductRequest;
import com.watchapi.rest.dto.ProductDto;
import com.watchapi.service.ProductService;

import static com.watchapi.config.SwaggerConfig.BASIC_AUTH_SECURITY_SCHEME;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;
    private final ProductMapper productMapper;

    @Operation(security = {@SecurityRequirement(name = BASIC_AUTH_SECURITY_SCHEME)})
    @GetMapping
    public List<ProductDto> getProducts(@RequestParam(value = "text", required = false) String text) {
        List<Product> books = (text == null) ? productService.getProducts() : productService.getProductsContainingText(text);
        return books.stream()
                .map(productMapper::toProductDto)
                .collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BASIC_AUTH_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ProductDto createProduct(@Valid @RequestBody CreateProductRequest createproductRequest) {
    	Product book = productMapper.toProduct(createproductRequest);
        return productMapper.toProductDto(productService.saveProduct(book));
    }
    
    
    @Operation(security = {@SecurityRequirement(name = BASIC_AUTH_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping("/{id}")
    public ProductDto updateProduct(@PathVariable String id,@RequestBody Product product) {
    	Product book = productService.validateAndGetProduct(id);
    	book.setName(product.getName());
    	book.setPrice(product.getPrice());
    	book.setCount(product.getCount());
    	book.setDescription(product.getDescription());
        return productMapper.toProductDto(productService.updateProduct(book));
    }

    @Operation(security = {@SecurityRequirement(name = BASIC_AUTH_SECURITY_SCHEME)})
    @DeleteMapping("/{id}")
    public ProductDto deleteProduct(@PathVariable String id) {
    	Product book = productService.validateAndGetProduct(id);
    	productService.deleteProduct(book);
        return productMapper.toProductDto(book);
    }
}
