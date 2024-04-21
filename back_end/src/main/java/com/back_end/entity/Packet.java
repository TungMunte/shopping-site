package com.back_end.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "packet")
public class Packet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Order> orders;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @JoinColumn(name = "packet_location_id", referencedColumnName = "id")
    private Location location;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Process process;

    @Column(nullable = false)
    private String owner;

    private String deliver;

    @Column
    private Timestamp startDate;

    @Column
    private int deliveryTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DeliveryType deliveryType;

    private Double totalPrice;

}
