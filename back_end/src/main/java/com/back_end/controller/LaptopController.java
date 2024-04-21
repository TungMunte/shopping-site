package com.back_end.controller;

import com.back_end.entity.Laptop;
import com.back_end.payload.LaptopDto;
import com.back_end.payload.LaptopRequestDto;
import com.back_end.service.LaptopService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@Slf4j
public class LaptopController {
    private final LaptopService laptopService;

    public LaptopController(LaptopService laptopService) {
        this.laptopService = laptopService;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping(value = "/api/laptop/add")
    public ResponseEntity<String> addLaptop(@RequestBody LaptopDto laptopDto, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        return new ResponseEntity<>(laptopService.addLaptop(laptopDto, httpServletRequest, httpServletResponse), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping(value = "/api/laptop/image/add/{imageCode}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> addImageLaptop(@RequestPart("file") MultipartFile file, @PathVariable String imageCode) throws IOException {
        return new ResponseEntity<>(laptopService.addImage(file, imageCode), HttpStatus.OK);
    }

    @GetMapping(value = "/api/laptop/image/get/{imageCode}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getImageLaptop(@PathVariable String imageCode) {
        return new ResponseEntity<>(laptopService.getImage(imageCode), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping(value = "/api/laptop/image/delete/{imageCode}")
    public ResponseEntity<String> deleteLaptopByImageCode(@PathVariable String imageCode) {
        return new ResponseEntity<>(laptopService.deleteLaptopByImageCode(imageCode), HttpStatus.OK);
    }

    @PostMapping(value = "/api/laptop/get/{pageNo}")
    public ResponseEntity<List<Laptop>> getLaptops(@PathVariable Integer pageNo, @RequestBody LaptopRequestDto laptopRequestDto) {
        return new ResponseEntity<>(laptopService.getLaptops(laptopRequestDto, pageNo), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping(value = "/api/laptop/delete/{id}")
    public ResponseEntity<String> deleteLaptop(@PathVariable Long id) {
        return new ResponseEntity<>(laptopService.deleteLaptop(id), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping(value = "/api/laptop/put/{id}")
    public ResponseEntity<String> updateLaptop(@PathVariable Long id, @RequestBody LaptopDto laptopDto) {
        return new ResponseEntity<>(laptopService.updateLaptop(id, laptopDto), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping(value = "/api/laptop/get/{id}")
    public ResponseEntity<Laptop> getLaptopById(@PathVariable Long id) {
        return new ResponseEntity<>(laptopService.getLaptopById(id), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping(value = "/api/laptop/image/put/{id}/{oldCode}/{newCode}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> replaceImageLaptop(@PathVariable Long id, @PathVariable String oldCode, @PathVariable String newCode, @RequestPart("file") MultipartFile file) throws IOException {
        return new ResponseEntity<>(laptopService.replaceImageLaptop(id, oldCode, newCode, file), HttpStatus.OK);
    }
}
