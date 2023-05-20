package com.watchapi.rest.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateProductRequest {

    @Schema(example = "101")
    @NotBlank
    private String id;

    @Schema(example = "Spring Security 3.1")
    @NotBlank
    private String name;
    
    
    @Schema(example = "price")
    @NotBlank
    private String price;
    
    @Schema(example = "count")
    @NotBlank
    private String count;
    
    @Schema(example = "description")
    @NotBlank
    private String description;
}
