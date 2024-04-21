package com.back_end.specification;

import com.back_end.entity.Television;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TelevisionSpecification {

    public Specification<Television> hasImageQuality(List<String> imageQuality) {
        return (root, query, criteriaBuilder) -> root.get("imageQuality").in(imageQuality);
    }

    public Specification<Television> hasType(List<String> type) {
        return (root, query, criteriaBuilder) -> root.get("type").in(type);
    }

    public Specification<Television> hasBrand(List<String> brand) {
        return (root, query, criteriaBuilder) -> root.get("brand").in(brand);
    }

    public Specification<Television> hasScreenDimension(List<String> screenDimension) {
        return (root, query, criteriaBuilder) -> root.get("screenDimension").in(screenDimension);
    }

    public Specification<Television> hasPrice(Integer min, Integer max) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.between(root.get("price"), min, max);
    }
}
