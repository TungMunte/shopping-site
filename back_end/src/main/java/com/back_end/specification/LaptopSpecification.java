package com.back_end.specification;

import com.back_end.entity.Laptop;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class LaptopSpecification {

    public Specification<Laptop> hasProcessor(List<String> processor) {
        return (root, query, criteriaBuilder) -> root.get("processor").in(processor);
    }

    public Specification<Laptop> hasType(List<String> type) {
        return (root, query, criteriaBuilder) -> root.get("type").in(type);
    }

    public Specification<Laptop> hasBrand(List<String> brand) {
        return (root, query, criteriaBuilder) -> root.get("brand").in(brand);
    }

    public Specification<Laptop> hasRam(List<String> ram) {
        return (root, query, criteriaBuilder) -> root.get("ram").in(ram);
    }

    public Specification<Laptop> hasInternalMemory(List<String> internalMemory) {
        return (root, query, criteriaBuilder) -> root.get("internalMemory").in(internalMemory);
    }

    public Specification<Laptop> hasScreenDimension(List<String> screenDimension) {
        return (root, query, criteriaBuilder) -> root.get("screenDimension").in(screenDimension);
    }

    public Specification<Laptop> hasPrice(Integer min, Integer max) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.between(root.get("price"), min, max);
    }

}
