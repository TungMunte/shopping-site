package com.back_end.service.impl;

import com.back_end.entity.Mouse;
import com.back_end.entity.Product;
import com.back_end.exception.ResourceNotFoundException;
import com.back_end.payload.MouseDto;
import com.back_end.payload.MouseRequestDto;
import com.back_end.repository.*;
import com.back_end.s3.S3Buckets;
import com.back_end.s3.S3Service;
import com.back_end.service.MouseService;
import com.back_end.specification.MouseSpecification;
import com.back_end.utils.AppConstants;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@Slf4j
public class MouseServiceImpl implements MouseService {

    private final ProductRepository productRepository;
    private final MouseRepository mouseRepository;
    private final OrderRepository orderRepository;
    private final PacketRepository packetRepository;
    private final UserRepository userRepository;
    private final S3Service s3Service;
    private final S3Buckets s3Buckets;
    private final MouseSpecification mouseSpecification;

    public MouseServiceImpl(ProductRepository productRepository, MouseRepository mouseRepository, OrderRepository orderRepository, PacketRepository packetRepository, UserRepository userRepository, S3Service s3Service, S3Buckets s3Buckets, MouseSpecification mouseSpecification) {
        this.productRepository = productRepository;
        this.mouseRepository = mouseRepository;
        this.orderRepository = orderRepository;
        this.packetRepository = packetRepository;
        this.userRepository = userRepository;
        this.s3Service = s3Service;
        this.s3Buckets = s3Buckets;
        this.mouseSpecification = mouseSpecification;
    }


    @Override
    public String addMouse(MouseDto mouseDto, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        Mouse mouse = new Mouse();
//        mouse.setDeliveryTime(AppConstants.DELIVERY_TIME_MOUSE);
        mouse.setImageCode(mouseDto.getImageCode());
        mouse.setName(mouseDto.getName());
        mouse.setBrand(mouseDto.getBrand());
        mouse.setPrice(mouseDto.getPrice());
        mouse.setType(mouseDto.getType());
        mouse.setDpi(mouseDto.getDpi());
        mouse.setDescription("Mouse " + mouse.getBrand() + " " + mouse.getName() + " Dpi " + mouse.getDpi() + " " + mouse.getType());
        mouseRepository.save(mouse);

        Product product = new Product();
        product.setImageCode(mouseDto.getImageCode());
        product.setName(mouseDto.getName());
        product.setDescription("Mouse " + mouse.getBrand() + " " + mouse.getName() + " Dpi " + mouse.getDpi() + " " + mouse.getType());
        product.setMouse(mouse);
        productRepository.save(product);

        log.info("complete");
        return "Success";
    }

    @Override
    public byte[] getImage(String imageCode) {
        return s3Service.getObject(s3Buckets.getCustomer(), imageCode);
    }

    @Override
    public String addImage(MultipartFile file, String imageCode) throws IOException {
        s3Service.putObject(s3Buckets.getCustomer(), imageCode, file.getBytes());
        return "Success";
    }

    @Override
    public List<Mouse> getMouses(MouseRequestDto mouseRequestDto, Integer pageNo) {
        Specification<Mouse> spec = Specification.where(null);

        if (mouseRequestDto.getBrand() != null && !mouseRequestDto.getBrand().isEmpty()) {
            spec = spec.and(mouseSpecification.hasBrand(mouseRequestDto.getBrand()));
        }

        if (mouseRequestDto.getType() != null && !mouseRequestDto.getType().isEmpty()) {
            spec = spec.and(mouseSpecification.hasType(mouseRequestDto.getType()));
        }

        if (mouseRequestDto.getDpi() != null && !mouseRequestDto.getDpi().isEmpty()) {
            spec = spec.and(mouseSpecification.hasDpi(mouseRequestDto.getDpi()));
        }

        if (mouseRequestDto.getMin() != null && mouseRequestDto.getMax() != null) {
            spec = spec.and(mouseSpecification.hasPrice(mouseRequestDto.getMin(), mouseRequestDto.getMax()));
        }

        Sort sort = Sort.by(AppConstants.DEFAULT_SORT_BY).ascending();
        Pageable pageable = PageRequest.of(pageNo, AppConstants.DEFAULT_PAGE_SIZE, sort);

        Page<Mouse> mouseList = mouseRepository.findAll(spec, pageable);
        List<Mouse> mouses = mouseList.getContent();

        return mouses;
    }

    @Override
    public String deleteMouseByImageCode(String imageCode) {
        boolean deleted = mouseRepository.deleteMouseByImageCode(imageCode);

        if (deleted) {
            return "success";
        }
        return "fail";
    }

    @Override
    public String updateMouse(Long id, MouseDto mouseDto) {
        Mouse mouse = mouseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("id", "id", id));
        mouse.setPrice(mouseDto.getPrice());
        mouse.setImageCode(mouseDto.getImageCode());
        mouse.setName(mouseDto.getName());
        mouse.setBrand(mouseDto.getBrand());
        mouse.setType(mouseDto.getType());
        mouse.setDpi(mouseDto.getDpi());
        mouse.setDescription("Mouse " + mouse.getBrand() + " " + mouse.getName() + " Dpi " + mouse.getDpi() + " " + mouse.getType());
        mouseRepository.save(mouse);

        Product product = productRepository.findByImageCode(mouseDto.getImageCode());
        product.setImageCode(mouseDto.getImageCode());
        product.setName(mouseDto.getName());
        product.setDescription("Mouse " + mouse.getBrand() + " " + mouse.getName() + " Dpi " + mouse.getDpi() + " " + mouse.getType());
        product.setMouse(mouse);
        productRepository.save(product);

        log.info("complete");
        return "Success";
    }

    @Override
    public String deleteMouse(Long id) {
        Mouse mouse = mouseRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Mouse not found with id: " + id));

        log.info(String.valueOf(id));


        productRepository.removeByImageCode(mouse.getImageCode());

        log.info("before 2 last step");
        s3Service.deleteObject(s3Buckets.getCustomer(), mouse.getImageCode());
        log.info("before last step");
        mouseRepository.deleteById(id);
        log.info("last step");

        return "Success";
    }

    @Override
    public Mouse getMouseById(Long id) {
        return mouseRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Mouse not found with id: " + id));
    }

    @Override
    public String replaceImageMouse(Long id, String oldCode, String newCode, MultipartFile file) throws IOException {
        log.info(oldCode);
        log.info(newCode);
        s3Service.putObject(s3Buckets.getCustomer(), newCode, file.getBytes());
        s3Service.deleteObject(s3Buckets.getCustomer(), oldCode);
        Mouse mouse = mouseRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Mouse not found with id: " + id));
        mouse.setImageCode(newCode);
        mouseRepository.save(mouse);
        return "Success";
    }
}
