package com.back_end.service.impl;

import com.back_end.entity.Laptop;
import com.back_end.entity.Product;
import com.back_end.exception.ResourceNotFoundException;
import com.back_end.payload.LaptopDto;
import com.back_end.payload.LaptopRequestDto;
import com.back_end.repository.*;
import com.back_end.s3.S3Buckets;
import com.back_end.s3.S3Service;
import com.back_end.service.LaptopService;
import com.back_end.specification.LaptopSpecification;
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
public class LaptopServiceImpl implements LaptopService {
    private final ProductRepository productRepository;
    private final LaptopRepository laptopRepository;
    private final OrderRepository orderRepository;
    private final PacketRepository packetRepository;
    private final UserRepository userRepository;
    private final S3Service s3Service;
    private final S3Buckets s3Buckets;
    private final LaptopSpecification laptopSpecification;

    public LaptopServiceImpl(ProductRepository productRepository, LaptopRepository laptopRepository, OrderRepository orderRepository, PacketRepository packetRepository, UserRepository userRepository, S3Service s3Service, S3Buckets s3Buckets, LaptopSpecification laptopSpecification) {
        this.productRepository = productRepository;
        this.laptopRepository = laptopRepository;
        this.orderRepository = orderRepository;
        this.packetRepository = packetRepository;
        this.userRepository = userRepository;
        this.s3Service = s3Service;
        this.s3Buckets = s3Buckets;
        this.laptopSpecification = laptopSpecification;
    }

    @Override
    public String addLaptop(LaptopDto laptopDto, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        log.info("enter");

        Laptop laptop = new Laptop();
        laptop.setName(laptopDto.getName());
        laptop.setBrand(laptopDto.getBrand());
        laptop.setImageCode(laptopDto.getImageCode());
        laptop.setInternalMemory(laptopDto.getInternalMemory());
        laptop.setRam(laptopDto.getRam());
        laptop.setPrice(laptopDto.getPrice());
        laptop.setScreenDimension(laptopDto.getScreenDimension());
        laptop.setProcessor(laptopDto.getProcessor());
        laptop.setType(laptopDto.getType());
        laptop.setDescription("Laptop " + laptop.getName() + " " + laptopDto.getBrand() + ", ram " + laptopDto.getRam() + " GB , internal memory " + laptopDto.getInternalMemory() + " GB, processor " + laptopDto.getProcessor() + ", screen dimension " + laptopDto.getScreenDimension() + ", " + laptopDto.getType());
//        laptop.setDeliveryTime(AppConstants.DELIVERY_TIME_lAPTOP);
        laptopRepository.save(laptop);

        Product product = new Product();
        product.setImageCode(laptopDto.getImageCode());
        product.setName(laptopDto.getName());
        product.setDescription("Laptop " + laptop.getName() + " " + laptopDto.getBrand() + ", ram " + laptopDto.getRam() + " GB , internal memory " + laptopDto.getInternalMemory() + " GB, processor " + laptopDto.getProcessor() + ", screen dimension " + laptopDto.getScreenDimension() + ", " + laptopDto.getType());
        product.setLaptop(laptop);
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
    public List<Laptop> getLaptops(LaptopRequestDto laptopRequestDto, Integer pageNo) {
        log.info("start");
        Specification<Laptop> spec = Specification.where(null);

        System.out.println(laptopRequestDto.getMin());
        System.out.println(laptopRequestDto.getMin());

        if (laptopRequestDto.getProcessor() != null && !laptopRequestDto.getProcessor().isEmpty()) {
            spec = spec.and(laptopSpecification.hasProcessor(laptopRequestDto.getProcessor()));
        }

        if (laptopRequestDto.getType() != null && !laptopRequestDto.getType().isEmpty()) {
            spec = spec.and(laptopSpecification.hasType(laptopRequestDto.getType()));
        }

        if (laptopRequestDto.getBrand() != null && !laptopRequestDto.getBrand().isEmpty()) {
            spec = spec.and(laptopSpecification.hasBrand(laptopRequestDto.getBrand()));
        }

        if (laptopRequestDto.getRam() != null && !laptopRequestDto.getRam().isEmpty()) {
            spec = spec.and(laptopSpecification.hasRam(laptopRequestDto.getRam()));
        }

        if (laptopRequestDto.getInternalMemory() != null && !laptopRequestDto.getInternalMemory().isEmpty()) {
            spec = spec.and(laptopSpecification.hasInternalMemory(laptopRequestDto.getInternalMemory()));
        }

        if (laptopRequestDto.getScreenDimension() != null && !laptopRequestDto.getScreenDimension().isEmpty()) {
            spec = spec.and(laptopSpecification.hasScreenDimension(laptopRequestDto.getScreenDimension()));
        }

        if (laptopRequestDto.getMin() != null && laptopRequestDto.getMax() != null) {
            spec = spec.and(laptopSpecification.hasPrice(laptopRequestDto.getMin(), laptopRequestDto.getMax()));
        }
//
        Sort sort = Sort.by(AppConstants.DEFAULT_SORT_BY).ascending();
        Pageable pageable = PageRequest.of(pageNo, AppConstants.DEFAULT_PAGE_SIZE, sort);

        Page<Laptop> laptopList = laptopRepository.findAll(spec, pageable);
        List<Laptop> laptops = laptopList.getContent();

        log.info("end");
        return laptops;
    }

    @Override
    public String deleteLaptopByImageCode(String imageCode) {
        boolean deleted = laptopRepository.deleteLaptopByImageCode(imageCode);

        if (deleted) {
            return "success";
        }
        return "fail";
    }

    @Override
    public String updateLaptop(Long id, LaptopDto laptopDto) {
        Laptop laptop = laptopRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("id", "id", id));
        laptop.setName(laptopDto.getName());
        laptop.setRam(laptopDto.getRam());
        laptop.setBrand(laptopDto.getBrand());
        laptop.setImageCode(laptopDto.getImageCode());
        laptop.setInternalMemory(laptopDto.getInternalMemory());
        laptop.setScreenDimension(laptopDto.getScreenDimension());
        laptop.setPrice(laptopDto.getPrice());
        laptop.setProcessor(laptopDto.getProcessor());
        laptop.setDescription("Laptop " + laptop.getName() + " " + laptopDto.getBrand() + ", ram " + laptopDto.getRam() + " GB , internal memory " + laptopDto.getInternalMemory() + " GB, processor " + laptopDto.getProcessor() + ", screen dimension " + laptopDto.getScreenDimension() + ", " + laptopDto.getType());
        laptop.setType(laptopDto.getType());

        laptopRepository.save(laptop);

        Product product = productRepository.findByImageCode(laptopDto.getImageCode());
        product.setName(laptopDto.getName());
        product.setDescription("Laptop " + laptop.getName() + laptopDto.getBrand() + ", ram " + laptopDto.getRam() + " GB , internal memory " + laptopDto.getInternalMemory() + " GB, processor " + laptopDto.getProcessor() + ", screen dimension " + laptopDto.getScreenDimension() + ", " + laptopDto.getType());
        product.setLaptop(laptop);
        productRepository.save(product);

        return "Success";
    }

    @Override
    public String deleteLaptop(Long id) {
        Laptop laptop = laptopRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Laptop not found with id: " + id));

        log.info(String.valueOf(id));


        productRepository.removeByImageCode(laptop.getImageCode());

        log.info("before 2 last step");
        s3Service.deleteObject(s3Buckets.getCustomer(), laptop.getImageCode());
        log.info("before last step");
        laptopRepository.deleteById(id);
        log.info("last step");

        return "Success";
    }

    @Override
    public Laptop getLaptopById(Long id) {
        return laptopRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Laptop not found with id: " + id));
    }

    @Override
    public String replaceImageLaptop(Long id, String oldCode, String newCode, MultipartFile file) throws IOException {
        log.info(oldCode);
        log.info(newCode);
        s3Service.putObject(s3Buckets.getCustomer(), newCode, file.getBytes());
        s3Service.deleteObject(s3Buckets.getCustomer(), oldCode);
        Laptop laptop = laptopRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Laptop not found with id: " + id));
        laptop.setImageCode(newCode);
        laptopRepository.save(laptop);
        return "Success";
    }
}
