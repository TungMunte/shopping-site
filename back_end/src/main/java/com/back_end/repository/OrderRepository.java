package com.back_end.repository;

import com.back_end.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findAllBySmartPhoneId(Long id);

    List<Order> findAllByLaptopId(Long id);

    List<Order> findAllByTelevisionId(Long id);

    List<Order> findAllByMouseId(Long id);

    List<Order> findAllByTabletId(Long id);

    boolean deleteBySmartPhoneId(Long id);

    boolean deleteByLaptopId(Long id);

    boolean deleteByTelevisionId(Long id);

    boolean deleteByMouseId(Long id);

    boolean deleteByTabletId(Long id);
}
