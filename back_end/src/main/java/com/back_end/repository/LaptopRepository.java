package com.back_end.repository;

import com.back_end.entity.Laptop;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface LaptopRepository extends JpaRepository<Laptop, Long>, JpaSpecificationExecutor<Laptop> {

    boolean deleteLaptopByImageCode(String imageCode);

    Laptop findByImageCode(String imageCode);

    void deleteById(@NotNull Long id);
}
