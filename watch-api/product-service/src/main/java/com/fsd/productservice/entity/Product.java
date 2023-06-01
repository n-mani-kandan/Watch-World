package com.fsd.productservice.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "products")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Product {

	    
		@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	    private String name;
	    private int price;
	    private String description;
	    private int Count;
	    
	    public Product(long l, String string, int d, String string2, int i) {
			this.id=l;
			this.name=string;
			this.price=(int)d;
			this.description=string2;
			this.Count=i;
		}

		
}
