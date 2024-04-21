package com.back_end.entity;

import com.back_end.utils.AppConstants;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "laptop")
public class Laptop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer price;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private String processor;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private String internalMemory;

    @Column(nullable = false)
    private String ram;

    @Column(nullable = false)
    private String screenDimension;

    @Column(nullable = false)
    private String imageCode;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false, insertable = false, updatable = false)
    private int deliveryTime ;
}
