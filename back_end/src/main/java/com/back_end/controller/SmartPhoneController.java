package com.back_end.controller;

import com.back_end.entity.SmartPhone;
import com.back_end.payload.SmartPhoneDto;
import com.back_end.payload.SmartPhoneRequestDto;
import com.back_end.service.SmartPhoneService;
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
public class SmartPhoneController {

    private final SmartPhoneService smartPhoneService;

    public SmartPhoneController(SmartPhoneService smartPhoneService) {
        this.smartPhoneService = smartPhoneService;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping(value = "/api/smartphone/add")
    public ResponseEntity<String> addSmartPhone(@RequestBody SmartPhoneDto smartPhoneDto, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        return new ResponseEntity<>(smartPhoneService.addSmartPhone(smartPhoneDto, httpServletRequest, httpServletResponse), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping(value = "/api/smartphone/image/add/{code}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> addImageSmartphone(@RequestPart("file") MultipartFile file, @PathVariable String code) throws IOException {
        return new ResponseEntity<>(smartPhoneService.addImage(file, code), HttpStatus.OK);
    }

    @GetMapping(value = "/api/smartphone/image/get/{imageCode}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getImageSmartphone(@PathVariable String imageCode) {
        return new ResponseEntity<>(smartPhoneService.getImage(imageCode), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping(value = "/api/smartphone/image/delete/{imageCode}")
    public ResponseEntity<String> deleteSmartPhoneByImageCode(@PathVariable String imageCode) {
        return new ResponseEntity<>(smartPhoneService.deleteSmartPhoneByImageCode(imageCode), HttpStatus.OK);
    }

    @PostMapping(value = "/api/smartphone/get/{pageNo}")
    public ResponseEntity<List<SmartPhone>> getSmartphones(@PathVariable Integer pageNo, @RequestBody SmartPhoneRequestDto smartPhoneRequestDto) {
        return new ResponseEntity<>(smartPhoneService.getSmartphones(smartPhoneRequestDto, pageNo), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping(value = "/api/smartphone/delete/{id}")
    public ResponseEntity<String> deleteSmartphone(@PathVariable Long id) {

        return new ResponseEntity<>(smartPhoneService.deleteSmartphone(id), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping(value = "/api/smartphone/put/{id}")
    public ResponseEntity<String> updateSmartphone(@PathVariable Long id, @RequestBody SmartPhoneDto SmartPhoneDto) {
        return new ResponseEntity<>(smartPhoneService.updateSmartphone(id, SmartPhoneDto), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping(value = "/api/smartphone/get/{id}")
    public ResponseEntity<SmartPhone> getSmartphoneById(@PathVariable Long id) {
        return new ResponseEntity<>(smartPhoneService.getSmartphoneById(id), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping(value = "/api/smartphone/image/put/{id}/{oldCode}/{newCode}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> replaceImageSmartphone(@PathVariable Long id, @PathVariable String oldCode, @PathVariable String newCode, @RequestPart("file") MultipartFile file) throws IOException {
        return new ResponseEntity<>(smartPhoneService.replaceImageSmartphone(id, oldCode, newCode, file), HttpStatus.OK);
    }
}
