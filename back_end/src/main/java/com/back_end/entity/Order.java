package com.back_end.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long quantity;

    @Column(nullable = false)
    private String owner;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "smart_phone_order_id", referencedColumnName = "id")
    private SmartPhone smartPhone;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "television_order_id", referencedColumnName = "id")
    private Television television;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "laptop_order_id", referencedColumnName = "id")
    private Laptop laptop;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tablet_order_id", referencedColumnName = "id")
    private Tablet tablet;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mouse_order_id", referencedColumnName = "id")
    private Mouse mouse;

}
