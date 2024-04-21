package com.back_end.service.impl;

import com.back_end.entity.*;
import com.back_end.exception.ResourceNotFoundException;
import com.back_end.payload.TelevisionDto;
import com.back_end.payload.TelevisionRequestDto;
import com.back_end.repository.*;
import com.back_end.s3.S3Buckets;
import com.back_end.s3.S3Service;
import com.back_end.service.TelevisionService;
import com.back_end.specification.TelevisionSpecification;
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
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Service
@Slf4j
public class TelevisionServiceImpl implements TelevisionService {
    private final ProductRepository productRepository;
    private final TelevisionRepository televisionRepository;
    private final OrderRepository orderRepository;
    private final PacketRepository packetRepository;
    private final UserRepository userRepository;
    private final S3Service s3Service;
    private final S3Buckets s3Buckets;
    private final TelevisionSpecification televisionSpecification;

    public TelevisionServiceImpl(ProductRepository productRepository, TelevisionRepository televisionRepository, OrderRepository orderRepository, PacketRepository packetRepository, UserRepository userRepository, S3Service s3Service, S3Buckets s3Buckets, TelevisionSpecification televisionSpecification) {
        this.productRepository = productRepository;
        this.televisionRepository = televisionRepository;
        this.orderRepository = orderRepository;
        this.packetRepository = packetRepository;
        this.userRepository = userRepository;
        this.s3Service = s3Service;
        this.s3Buckets = s3Buckets;
        this.televisionSpecification = televisionSpecification;
    }

    @Override
    public String addTelevision(TelevisionDto televisionDto, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        log.info("enter");

        Television television = new Television();
        television.setBrand(televisionDto.getBrand());
        television.setImageCode(televisionDto.getImageCode());
        television.setPrice(televisionDto.getPrice());
        television.setScreenDimension(televisionDto.getScreenDimension());
        television.setDescription("TV " + televisionDto.getBrand()
                + " " + televisionDto.getName() + " "
                + ", " + televisionDto.getImageQuality() + ", screen dimension "
                + televisionDto.getScreenDimension()
                + ", " + televisionDto.getType());
        television.setType(televisionDto.getType());
        television.setImageQuality(televisionDto.getImageQuality());
//        television.setDeliveryTime(AppConstants.DELIVERY_TIME_TELEVISION);
        television.setName(televisionDto.getName());
        televisionRepository.save(television);

        Product product = new Product();
        product.setImageCode(televisionDto.getImageCode());
        product.setName(televisionDto.getName());
        product.setDescription("TV " + televisionDto.getBrand() + " " + televisionDto.getName() + " " + ", " + televisionDto.getImageQuality() + ", screen dimension " + televisionDto.getScreenDimension() + ", " + televisionDto.getType());
        product.setTelevision(television);
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
        log.info("before");
        s3Service.putObject(s3Buckets.getCustomer(), imageCode, file.getBytes());
        log.info("after");
        return "Success";
    }

    @Override
    public List<Television> getTelevisions(TelevisionRequestDto televisionRequestDto, Integer pageNo) {
        log.info("start");
        Specification<Television> spec = Specification.where(null);

        if (televisionRequestDto.getImageQuality() != null && !televisionRequestDto.getImageQuality().isEmpty()) {
            spec = spec.and(televisionSpecification.hasImageQuality(televisionRequestDto.getImageQuality()));
        }

        if (televisionRequestDto.getType() != null && !televisionRequestDto.getType().isEmpty()) {
            spec = spec.and(televisionSpecification.hasType(televisionRequestDto.getType()));
        }

        if (televisionRequestDto.getBrand() != null && !televisionRequestDto.getBrand().isEmpty()) {
            spec = spec.and(televisionSpecification.hasBrand(televisionRequestDto.getBrand()));
        }

        if (televisionRequestDto.getScreenDimension() != null && !televisionRequestDto.getScreenDimension().isEmpty()) {
            spec = spec.and(televisionSpecification.hasScreenDimension(televisionRequestDto.getScreenDimension()));
        }

        if (televisionRequestDto.getMin() != null && televisionRequestDto.getMax() != null) {
            spec = spec.and(televisionSpecification.hasPrice(televisionRequestDto.getMin(), televisionRequestDto.getMax()));
        }

        Sort sort = Sort.by(AppConstants.DEFAULT_SORT_BY).ascending();
        Pageable pageable = PageRequest.of(pageNo, AppConstants.DEFAULT_PAGE_SIZE, sort);

        Page<Television> televisionList = televisionRepository.findAll(spec, pageable);
        List<Television> televisions = televisionList.getContent();

        log.info("end");
        return televisions;
    }

    @Override
    public String deleteTelevisionByImageCode(String imageCode) {

        boolean deleted = televisionRepository.deleteTelevisionByImageCode(imageCode);

        if (deleted) {
            return "success";
        }
        return "fail";
    }

    @Override
    public String updateTelevision(Long id, TelevisionDto televisionDto) {

        Television television = televisionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("id", "id", id));
        television.setType(televisionDto.getType());
        television.setScreenDimension(televisionDto.getScreenDimension());
        television.setImageCode(televisionDto.getImageCode());
        television.setPrice(televisionDto.getPrice());
        television.setDescription("TV " + televisionDto.getBrand() + " " + televisionDto.getName() + " " + ", " + televisionDto.getImageQuality() + ", screen dimension " + televisionDto.getScreenDimension() + ", " + televisionDto.getType());
        television.setBrand(televisionDto.getBrand());
        television.setImageQuality(televisionDto.getImageQuality());
        television.setName(televisionDto.getName());
        televisionRepository.save(television);

        Product product = productRepository.findByImageCode(televisionDto.getImageCode());
        product.setTelevision(television);
        product.setName(televisionDto.getName());
        product.setDescription("TV " + televisionDto.getBrand() + " " + televisionDto.getName() + " " + ", " + televisionDto.getImageQuality() + ", screen dimension " + televisionDto.getScreenDimension() + ", " + televisionDto.getType());
        productRepository.save(product);
        log.info("complete");
        return "Success";
    }

    @Override
    public String deleteTelevision(Long id) {
        log.info("first check");
        Television television = televisionRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Television not found with id: " + id));

        log.info(String.valueOf(id));

        productRepository.removeByImageCode(television.getImageCode());

        log.info("before 2 last step");
        s3Service.deleteObject(s3Buckets.getCustomer(), television.getImageCode());
        log.info("before last step");
        televisionRepository.deleteById(id);
        log.info("last step");

        return "Success";
    }

    @Override
    public Television getTelevisionById(Long id) {
        return televisionRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Laptop not found with id: " + id));
    }

    @Override
    public String replaceImageTelevision(Long id, String oldCode, String newCode, MultipartFile file) throws IOException {
        log.info(oldCode);
        log.info(newCode);
        s3Service.putObject(s3Buckets.getCustomer(), newCode, file.getBytes());
        s3Service.deleteObject(s3Buckets.getCustomer(), oldCode);
        Television television = televisionRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Television not found with id: " + id));
        television.setImageCode(newCode);
        televisionRepository.save(television);
        return "Success";
    }
}
