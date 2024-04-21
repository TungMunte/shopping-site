package com.back_end.repository;

import com.back_end.entity.Product;
import jakarta.transaction.Transactional;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Product findByImageCode(String imageCode);

    void deleteById(@NotNull Long id);

    @Modifying
    @Transactional
    @Query(value = "delete from Product p  where p.image_code = ?1", nativeQuery = true)
    void removeByImageCode(@NotNull String imageCode);


    //    @Query(value = "SELECT * FROM product WHERE MATCH(description, name) " + "AGAINST (?1)", nativeQuery = true)
    @Query(value = "SELECT * FROM product WHERE to_tsvector('english', description) @@ to_tsquery('english', :keyword) OR to_tsvector('english', name) @@ to_tsquery('english', :keyword)", nativeQuery = true)
    List<Product> search(String keyword, Pageable pageable);


}
