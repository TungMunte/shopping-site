package com.back_end.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "mouse")
public class Mouse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer price;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private String dpi;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private String imageCode;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false, insertable = false, updatable = false)
    private int deliveryTime;

}
