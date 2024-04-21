package com.back_end.repository;

import com.back_end.entity.Tablet;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TabletRepository extends JpaRepository<Tablet, Long>, JpaSpecificationExecutor<Tablet> {
    boolean deleteTabletByImageCode(String imageCode);

    Tablet findByImageCode(String imageCode);

    void deleteById(@NotNull Long id);
}
