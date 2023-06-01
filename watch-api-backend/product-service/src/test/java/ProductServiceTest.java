import com.fsd.productservice.entity.Product;
import com.fsd.productservice.repository.ProductRepository;
import com.fsd.productservice.service.impl.ProductServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;

class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductServiceImpl productService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void saveProduct_ShouldReturnSavedProduct() {
        // Arrange
        Product product = new Product(1L, "Product 1", 10, "Description 1", 5);
        when(productRepository.save(product)).thenReturn(product);

        // Act
        Product savedProduct = productService.saveProduct(product);

        // Assert
        Assertions.assertEquals(product, savedProduct);
        verify(productRepository, times(1)).save(product);
    }

    @Test
    void getAllProducts_ShouldReturnAllProducts() {
        // Arrange
        List<Product> products = Arrays.asList(
                new Product(1L, "Product 1", 10, "Description 1", 5),
                new Product(2L, "Product 2", 20, "Description 2", 10)
        );
        when(productRepository.findAll()).thenReturn(products);

        // Act
        List<Product> allProducts = productService.getAllProducts();

        // Assert
        Assertions.assertEquals(products, allProducts);
        verify(productRepository, times(1)).findAll();
    }

    @Test
    void getProductById_WithValidId_ShouldReturnProduct() {
        // Arrange
        Long productId = 1L;
        Product product = new Product(productId, "Product 1", 10, "Description 1", 5);
        when(productRepository.findById(productId)).thenReturn(Optional.of(product));

        // Act
        Product foundProduct = productService.getProductById(productId.intValue());

        // Assert
        Assertions.assertEquals(product, foundProduct);
        verify(productRepository, times(1)).findById(productId);
    }

    @Test
    void getProductById_WithInvalidId_ShouldReturnNull() {
        // Arrange
        Long productId = 1L;
        when(productRepository.findById(productId)).thenReturn(Optional.empty());

        // Act
        Product foundProduct = productService.getProductById(productId.intValue());

        // Assert
        Assertions.assertNull(foundProduct);
        verify(productRepository, times(1)).findById(productId);
    }


    @Test
    void updateProduct_WithValidId_ShouldReturnUpdatedProduct() {
        // Arrange
        Long productId = 1L;
        Product existingProduct = new Product(productId, "Product 1", 10, "Description 1", 5);
        Product updatedProduct = new Product(productId, "Updated Product", 20, "Updated Description", 3);
        when(productRepository.findById(productId)).thenReturn(Optional.of(existingProduct));
        when(productRepository.save(existingProduct)).thenReturn(updatedProduct);

        // Act
        Product result = productService.updateProduct(productId, updatedProduct);

        // Assert
        Assertions.assertEquals(updatedProduct, result);
        Assertions.assertEquals(updatedProduct.getName(), result.getName());
        Assertions.assertEquals(updatedProduct.getPrice(), result.getPrice());
        Assertions.assertEquals(updatedProduct.getDescription(), result.getDescription());
        Assertions.assertEquals(updatedProduct.getCount(), result.getCount());
        verify(productRepository, times(1)).findById(productId);
        verify(productRepository, times(1)).save(existingProduct);
    }

    @Test
    void updateProduct_WithInvalidId_ShouldReturnNull() {
        // Arrange
        Long productId = 1L;
        Product updatedProduct = new Product(productId, "Updated Product", 20, "Updated Description", 3);
        when(productRepository.findById(productId)).thenReturn(Optional.empty());

        // Act
        Product result = productService.updateProduct(productId, updatedProduct);

        // Assert
        Assertions.assertNull(result);
        verify(productRepository, times(1)).findById(productId);
        verify(productRepository, never()).save(any(Product.class));
    }

    @Test
    void deleteProduct_WithValidId_ShouldReturnTrue() {
        // Arrange
        Long productId = 1L;
        Product product = new Product(productId, "Product 1", 10, "Description 1", 5);
        when(productRepository.findById(productId)).thenReturn(Optional.of(product));

        // Act
        boolean result = productService.deleteProduct(productId);

        // Assert
        Assertions.assertTrue(result);
        verify(productRepository, times(1)).findById(productId);
        verify(productRepository, times(1)).delete(product);
    }

    @Test
    void deleteProduct_WithInvalidId_ShouldReturnFalse() {
        // Arrange
        Long productId = 1L;
        when(productRepository.findById(productId)).thenReturn(Optional.empty());

        // Act
        boolean result = productService.deleteProduct(productId);

        // Assert
        Assertions.assertFalse(result);
        verify(productRepository, times(1)).findById(productId);
        verify(productRepository, never()).delete(any(Product.class));
    }
}
