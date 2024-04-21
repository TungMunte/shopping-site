package com.back_end.controller;

import com.back_end.entity.Tablet;
import com.back_end.payload.TabletDto;
import com.back_end.payload.TabletRequestDto;
import com.back_end.service.TabletService;
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
public class TabletController {
    private final TabletService tabletService;

    public TabletController(TabletService tabletService) {
        this.tabletService = tabletService;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping(value = "/api/tablet/add")
    public ResponseEntity<String> addTablet(@RequestBody TabletDto tabletDto, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        return new ResponseEntity<>(tabletService.addTablet(tabletDto, httpServletRequest, httpServletResponse), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping(value = "/api/tablet/image/add/{code}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> addImageTablet(@RequestPart("file") MultipartFile file, @PathVariable String code) throws IOException {
        log.info("start");
        return new ResponseEntity<>(tabletService.addImage(file, code), HttpStatus.OK);
    }

    @GetMapping(value = "/api/tablet/image/get/{imageCode}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getImageTablet(@PathVariable String imageCode) {
        return new ResponseEntity<>(tabletService.getImage(imageCode), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping(value = "/api/tablet/image/delete/{imageCode}")
    public ResponseEntity<String> deleteTabletByImageCode(@PathVariable String imageCode) {
        return new ResponseEntity<>(tabletService.deleteTabletByImageCode(imageCode), HttpStatus.OK);
    }

    @PostMapping(value = "/api/tablet/get/{pageNo}")
    public ResponseEntity<List<Tablet>> getTablets(@PathVariable Integer pageNo, @RequestBody TabletRequestDto tabletRequestDto) {
        return new ResponseEntity<>(tabletService.getTablets(tabletRequestDto, pageNo), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping(value = "/api/tablet/delete/{id}")
    public ResponseEntity<String> deleteTablet(@PathVariable Long id) {
        return new ResponseEntity<>(tabletService.deleteTablet(id), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping(value = "/api/tablet/put/{id}")
    public ResponseEntity<String> updateTablet(@PathVariable Long id, @RequestBody TabletDto tabletDto) {
        return new ResponseEntity<>(tabletService.updateTablet(id, tabletDto), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping(value = "/api/tablet/get/{id}")
    public ResponseEntity<Tablet> getTabletById(@PathVariable Long id) {
        return new ResponseEntity<>(tabletService.getTabletById(id), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping(value = "/api/tablet/image/put/{id}/{oldCode}/{newCode}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> replaceImageTablet(@PathVariable Long id, @PathVariable String oldCode, @PathVariable String newCode, @RequestPart("file") MultipartFile file) throws IOException {
        return new ResponseEntity<>(tabletService.replaceImageTablet(id, oldCode, newCode, file), HttpStatus.OK);
    }
}
