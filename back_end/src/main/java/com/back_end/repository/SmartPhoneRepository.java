package com.back_end.repository;

import com.back_end.entity.SmartPhone;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface SmartPhoneRepository extends JpaRepository<SmartPhone, Long>, JpaSpecificationExecutor<SmartPhone> {

    boolean deleteSmartPhoneByImageCode(String imageCode);

    SmartPhone findByImageCode(String imageCode);

    void deleteById(@NotNull Long id);

}