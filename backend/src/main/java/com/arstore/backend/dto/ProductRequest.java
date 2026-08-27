package com.arstore.backend.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequest {
    @NotBlank(message = "Product name is required")
    @Size(min = 2, max = 200)
    private String productName;

    @Size(max = 2000)
    private String description;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private Double price;

    private String imageUrl;

    @Size(max = 100)
    private String category;

    @Size(max = 100)
    private String brand;

    @PositiveOrZero
    private Integer stock = 0;
}
