package com.back_end.specification;

import com.back_end.entity.Mouse;
import com.back_end.entity.Television;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MouseSpecification {

    public Specification<Mouse> hasType(List<String> type) {
        return (root, query, criteriaBuilder) -> root.get("type").in(type);
    }

    public Specification<Mouse> hasDpi(List<String> dpi) {
        return (root, query, criteriaBuilder) -> root.get("dpi").in(dpi);
    }

    public Specification<Mouse> hasBrand(List<String> brand) {
        return (root, query, criteriaBuilder) -> root.get("brand").in(brand);
    }

    public Specification<Mouse> hasPrice(Integer min, Integer max) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.between(root.get("price"), min, max);
    }
}
