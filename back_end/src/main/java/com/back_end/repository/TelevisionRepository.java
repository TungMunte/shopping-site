package com.back_end.repository;

import com.back_end.entity.Television;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TelevisionRepository extends JpaRepository<Television, Long>, JpaSpecificationExecutor<Television> {

    boolean deleteTelevisionByImageCode(String imageCode);

    Television findByImageCode(String imageCode);

    void deleteById(@NotNull Long id);
}
