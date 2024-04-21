package com.back_end.specification;

import com.back_end.entity.Tablet;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TabletSpecification {
    public Specification<Tablet> hasResolution(List<String> resolution) {
        return (root, query, criteriaBuilder) -> root.get("resolution").in(resolution);
    }

    public Specification<Tablet> hasMemory(List<String> memory) {
        return (root, query, criteriaBuilder) -> root.get("memory").in(memory);
    }

    public Specification<Tablet> hasBrand(List<String> brand) {
        return (root, query, criteriaBuilder) -> root.get("brand").in(brand);
    }

    public Specification<Tablet> hasPrice(Integer min, Integer max) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.between(root.get("price"), min, max);
    }
}
