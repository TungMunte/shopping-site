package com.back_end.service.impl;

import com.back_end.entity.Product;
import com.back_end.entity.Tablet;
import com.back_end.payload.TabletDto;
import com.back_end.payload.TabletRequestDto;
import com.back_end.repository.*;
import com.back_end.s3.S3Buckets;
import com.back_end.s3.S3Service;
import com.back_end.service.TabletService;
import com.back_end.specification.TabletSpecification;
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
public class TabletServiceImpl implements TabletService {

    private final ProductRepository productRepository;
    private final TabletRepository tabletRepository;
    private final OrderRepository orderRepository;
    private final PacketRepository packetRepository;
    private final UserRepository userRepository;
    private final S3Service s3Service;
    private final S3Buckets s3Buckets;
    private final TabletSpecification tabletSpecification;

    public TabletServiceImpl(ProductRepository productRepository, TabletRepository tabletRepository, OrderRepository orderRepository, PacketRepository packetRepository, UserRepository userRepository, S3Service s3Service, S3Buckets s3Buckets, TabletSpecification tabletSpecification) {
        this.productRepository = productRepository;
        this.tabletRepository = tabletRepository;
        this.orderRepository = orderRepository;
        this.packetRepository = packetRepository;
        this.userRepository = userRepository;
        this.s3Service = s3Service;
        this.s3Buckets = s3Buckets;
        this.tabletSpecification = tabletSpecification;
    }


    @Override
    public String addTablet(TabletDto tabletDto, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        log.info("enter");

        Tablet tablet = new Tablet();
//        tablet.setDeliveryTime(AppConstants.DELIVERY_TIME_TABLET);
        tablet.setName(tabletDto.getName());
        tablet.setPrice(tabletDto.getPrice());
        tablet.setMemory(tabletDto.getMemory());
        tablet.setBrand(tabletDto.getBrand());
        tablet.setResolution(tabletDto.getResolution());
        tablet.setDescription("Tablet " + tablet.getBrand() + " " + tablet.getName() + " ,memory " + tablet.getMemory() + " GB, resolution " + tablet.getResolution());
        tablet.setImageCode(tabletDto.getImageCode());
        tabletRepository.save(tablet);

        Product product = new Product();
        product.setImageCode(tabletDto.getImageCode());
        product.setName(tabletDto.getName());
        product.setDescription("Tablet " + tablet.getBrand() + " " + tablet.getName() + " ,memory " + tablet.getMemory() + " GB, resolution " + tablet.getResolution());
        product.setTablet(tablet);
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
    public List<Tablet> getTablets(TabletRequestDto tabletRequestDto, Integer pageNo) {
        log.info("start");
        Specification<Tablet> spec = Specification.where(null);

        if (tabletRequestDto.getResolution() != null && !tabletRequestDto.getResolution().isEmpty()) {
            spec = spec.and(tabletSpecification.hasBrand(tabletRequestDto.getResolution()));
        }

        if (tabletRequestDto.getMemory() != null && !tabletRequestDto.getMemory().isEmpty()) {
            spec = spec.and(tabletSpecification.hasBrand(tabletRequestDto.getMemory()));
        }

        if (tabletRequestDto.getBrand() != null && !tabletRequestDto.getBrand().isEmpty()) {
            spec = spec.and(tabletSpecification.hasBrand(tabletRequestDto.getBrand()));
        }

        if (tabletRequestDto.getMin() != null && tabletRequestDto.getMax() != null) {
            spec = spec.and(tabletSpecification.hasPrice(tabletRequestDto.getMin(), tabletRequestDto.getMax()));
        }
//
        Sort sort = Sort.by(AppConstants.DEFAULT_SORT_BY).ascending();
        Pageable pageable = PageRequest.of(pageNo, AppConstants.DEFAULT_PAGE_SIZE, sort);

        Page<Tablet> tabletList = tabletRepository.findAll(spec, pageable);
        List<Tablet> tablets = tabletList.getContent();

        log.info("end");
        return tablets;
    }

    @Override
    public String deleteTabletByImageCode(String imageCode) {

        boolean deleted = tabletRepository.deleteTabletByImageCode(imageCode);

        if (deleted) {
            return "success";
        }
        return "fail";
    }

    @Override
    public String updateTablet(Long id, TabletDto tabletDto) {
        Tablet tablet = tabletRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("smartphone not found with id : " + id));
        tablet.setBrand(tabletDto.getBrand());
        tablet.setName(tabletDto.getName());
        tablet.setPrice(tabletDto.getPrice());
        tablet.setMemory(tabletDto.getMemory());
        tablet.setResolution(tabletDto.getResolution());
        tablet.setDescription("Tablet " + tablet.getBrand() + " " + tablet.getName() + " ,memory " + tablet.getMemory() + " GB, resolution " + tablet.getResolution());
        tablet.setImageCode(tabletDto.getImageCode());
        tabletRepository.save(tablet);

        Product product = productRepository.findByImageCode(tabletDto.getImageCode());
        product.setName(tabletDto.getName());
        product.setDescription("Tablet " + tablet.getBrand() + " " + tablet.getName() + " ,memory " + tablet.getMemory() + " GB, resolution " + tablet.getResolution());
        product.setTablet(tablet);
        productRepository.save(product);

        return "Success";
    }

    @Override
    public String deleteTablet(Long id) {
        log.info("first check");
        Tablet tablet = tabletRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Smartphone not found with id: " + id));
        log.info(String.valueOf(id));
        log.info("second check");

        productRepository.removeByImageCode(tablet.getImageCode());


        log.info("before 2 last step");
        log.info(tablet.getImageCode());
        s3Service.deleteObject(s3Buckets.getCustomer(), tablet.getImageCode());

        log.info("before last step");
        tabletRepository.deleteById(id);
        log.info("last step");


        return "Success";
    }

    @Override
    public Tablet getTabletById(Long id) {
        return tabletRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Tablet not found with id: " + id));
    }

    @Override
    public String replaceImageTablet(Long id, String oldCode, String newCode, MultipartFile file) throws IOException {
        log.info(oldCode);
        log.info(newCode);
        s3Service.putObject(s3Buckets.getCustomer(), newCode, file.getBytes());
        s3Service.deleteObject(s3Buckets.getCustomer(), oldCode);
        Tablet tablet = tabletRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Tablet not found with id: " + id));
        tablet.setImageCode(newCode);
        tabletRepository.save(tablet);
        return "Success";
    }
}
