package com.back_end.repository;

import com.back_end.entity.Mouse;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface MouseRepository extends JpaRepository<Mouse, Long>, JpaSpecificationExecutor<Mouse> {
    boolean deleteMouseByImageCode(String imageCode);

    Mouse findByImageCode(String imageCode);

    void deleteById(@NotNull Long id);
}
