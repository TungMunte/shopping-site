package com.back_end.service.impl;

import com.back_end.entity.Product;
import com.back_end.entity.SmartPhone;
import com.back_end.payload.SmartPhoneDto;
import com.back_end.payload.SmartPhoneRequestDto;
import com.back_end.repository.*;
import com.back_end.s3.S3Buckets;
import com.back_end.s3.S3Service;
import com.back_end.service.SmartPhoneService;
import com.back_end.specification.SmartPhoneSpecification;
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
public class SmartPhoneServiceImpl implements SmartPhoneService {
    private final ProductRepository productRepository;
    private final SmartPhoneRepository smartPhoneRepository;
    private final OrderRepository orderRepository;
    private final PacketRepository packetRepository;
    private final UserRepository userRepository;
    private final S3Service s3Service;
    private final S3Buckets s3Buckets;
    private final SmartPhoneSpecification smartPhoneSpecification;

    public SmartPhoneServiceImpl(ProductRepository productRepository, SmartPhoneRepository smartPhoneRepository, OrderRepository orderRepository, S3Service s3Service, S3Buckets s3Buckets, SmartPhoneSpecification smartPhoneSpecification, PacketRepository packetRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.smartPhoneRepository = smartPhoneRepository;
        this.orderRepository = orderRepository;
        this.s3Service = s3Service;
        this.s3Buckets = s3Buckets;
        this.smartPhoneSpecification = smartPhoneSpecification;
        this.packetRepository = packetRepository;
        this.userRepository = userRepository;
    }

    @Override
    public String addSmartPhone(SmartPhoneDto smartPhoneDto, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        log.info("enter");

        SmartPhone smartPhone = new SmartPhone();
        smartPhone.setBrand(smartPhoneDto.getBrand());
        smartPhone.setName(smartPhoneDto.getName());
        smartPhone.setInternalMemory(smartPhoneDto.getInternalMemory());
        smartPhone.setPrice(smartPhoneDto.getPrice());
        smartPhone.setRam(smartPhoneDto.getRam());
        smartPhone.setScreenDimension(smartPhoneDto.getScreenDimension());
        smartPhone.setTechnology(smartPhoneDto.getTechnology());
        smartPhone.setDescription(smartPhoneDto.getBrand() + " " + smartPhoneDto.getName() + " , internal memory " + smartPhoneDto.getInternalMemory() + " GB , ram " + smartPhoneDto.getRam() + " GB , screen dimension " + smartPhoneDto.getScreenDimension() + " inch , technology " + smartPhoneDto.getTechnology());
        smartPhone.setImageCode(smartPhoneDto.getImageCode());
//        smartPhone.setDeliveryTime(AppConstants.DELIVERY_TIME_SMARTPHONE);
        smartPhoneRepository.save(smartPhone);

        Product product = new Product();
        product.setImageCode(smartPhoneDto.getImageCode());
        product.setName(smartPhoneDto.getName());
        product.setDescription(smartPhoneDto.getBrand() + " " + smartPhoneDto.getName() + " , internal memory " + smartPhoneDto.getInternalMemory() + " GB , ram " + smartPhoneDto.getRam() + " GB , screen dimension " + smartPhoneDto.getScreenDimension() + " inch , technology " + smartPhoneDto.getTechnology());
        product.setSmartPhone(smartPhone);
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
    public List<SmartPhone> getSmartphones(SmartPhoneRequestDto smartPhoneRequestDto, Integer pageNo) {
        log.info("start");
        Specification<SmartPhone> spec = Specification.where(null);

        System.out.println(smartPhoneRequestDto.getMin());
        System.out.println(smartPhoneRequestDto.getMin());

        if (smartPhoneRequestDto.getBrand() != null && !smartPhoneRequestDto.getBrand().isEmpty()) {
            spec = spec.and(smartPhoneSpecification.hasBrand(smartPhoneRequestDto.getBrand()));
        }

        if (smartPhoneRequestDto.getTechnology() != null && !smartPhoneRequestDto.getTechnology().isEmpty()) {
            spec = spec.and(smartPhoneSpecification.hasTechnology(smartPhoneRequestDto.getTechnology()));
        }

        if (smartPhoneRequestDto.getRam() != null && !smartPhoneRequestDto.getRam().isEmpty()) {
            spec = spec.and(smartPhoneSpecification.hasRam(smartPhoneRequestDto.getRam()));
        }

        if (smartPhoneRequestDto.getInternalMemory() != null && !smartPhoneRequestDto.getInternalMemory().isEmpty()) {
            spec = spec.and(smartPhoneSpecification.hasInternalMemory(smartPhoneRequestDto.getInternalMemory()));
        }

        if (smartPhoneRequestDto.getScreenDimension() != null && !smartPhoneRequestDto.getScreenDimension().isEmpty()) {
            spec = spec.and(smartPhoneSpecification.hasScreenDimension(smartPhoneRequestDto.getScreenDimension()));
        }

        if (smartPhoneRequestDto.getMin() != null && smartPhoneRequestDto.getMax() != null) {
            spec = spec.and(smartPhoneSpecification.hasPrice(smartPhoneRequestDto.getMin(), smartPhoneRequestDto.getMax()));
        }
//
        Sort sort = Sort.by(AppConstants.DEFAULT_SORT_BY).ascending();
        Pageable pageable = PageRequest.of(pageNo, AppConstants.DEFAULT_PAGE_SIZE, sort);

        Page<SmartPhone> smartPhoneList = smartPhoneRepository.findAll(spec, pageable);
        List<SmartPhone> smartPhones = smartPhoneList.getContent();

        log.info("end");
        return smartPhones;
    }

    @Override
    public String deleteSmartPhoneByImageCode(String imageCode) {

        boolean deleted = smartPhoneRepository.deleteSmartPhoneByImageCode(imageCode);

        if (deleted) {
            return "success";
        }
        return "fail";
    }

    @Override
    public String deleteSmartphone(Long id) {
        SmartPhone smartPhone = smartPhoneRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Smartphone not found with id: " + id));

        log.info(String.valueOf(id));


        productRepository.removeByImageCode(smartPhone.getImageCode());

        log.info("before 2 last step");
        log.info(smartPhone.getImageCode());
        s3Service.deleteObject(s3Buckets.getCustomer(), smartPhone.getImageCode());


        log.info("before last step");
        smartPhoneRepository.deleteById(id);
        log.info("last step");


        return "Success";
    }

    @Override
    public SmartPhone getSmartphoneById(Long id) {
        return smartPhoneRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Smartphone not found with id: " + id));
    }

    @Override
    public String replaceImageSmartphone(Long id, String oldCode, String newCode, MultipartFile file) throws IOException {
        log.info(oldCode);
        log.info(newCode);
        s3Service.putObject(s3Buckets.getCustomer(), newCode, file.getBytes());
        s3Service.deleteObject(s3Buckets.getCustomer(), oldCode);
        SmartPhone smartPhone = smartPhoneRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Smartphone not found with id: " + id));
        smartPhone.setImageCode(newCode);
        smartPhoneRepository.save(smartPhone);
        return "Success";
    }

    @Override
    public String updateSmartphone(Long id, SmartPhoneDto smartPhoneDto) {

        SmartPhone smartPhone = smartPhoneRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("smartphone not found with id : " + id));
        smartPhone.setImageCode(smartPhoneDto.getImageCode());
        smartPhone.setBrand(smartPhoneDto.getBrand());
        smartPhone.setTechnology(smartPhoneDto.getTechnology());
        smartPhone.setPrice(smartPhoneDto.getPrice());
        smartPhone.setInternalMemory(smartPhoneDto.getInternalMemory());
        smartPhone.setScreenDimension(smartPhoneDto.getScreenDimension());
        smartPhone.setRam(smartPhoneDto.getRam());
        smartPhone.setDescription(smartPhoneDto.getBrand() + " " + smartPhoneDto.getName() + " , internal memory " + smartPhoneDto.getInternalMemory() + " GB , ram " + smartPhoneDto.getRam() + " GB , screen dimension " + smartPhoneDto.getScreenDimension() + " inch , technology " + smartPhoneDto.getTechnology());
        smartPhone.setName(smartPhoneDto.getName());
        smartPhoneRepository.save(smartPhone);

        Product product = productRepository.findByImageCode(smartPhoneDto.getImageCode());
        product.setName(smartPhoneDto.getName());
        product.setDescription(smartPhoneDto.getBrand() + " " + smartPhoneDto.getName() + " , internal memory " + smartPhoneDto.getInternalMemory() + " GB , ram " + smartPhoneDto.getRam() + " GB , screen dimension " + smartPhoneDto.getScreenDimension() + " inch , technology " + smartPhoneDto.getTechnology());
        product.setSmartPhone(smartPhone);
        productRepository.save(product);

        return "Success";
    }

}
