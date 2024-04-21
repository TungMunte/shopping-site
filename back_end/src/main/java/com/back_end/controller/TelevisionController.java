package com.back_end.controller;

import com.back_end.entity.Television;
import com.back_end.payload.TelevisionDto;
import com.back_end.payload.TelevisionRequestDto;
import com.back_end.service.TelevisionService;
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
public class TelevisionController {

    private final TelevisionService televisionService;

    public TelevisionController(TelevisionService televisionService) {
        this.televisionService = televisionService;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping(value = "/api/television/add")
    public ResponseEntity<String> addTelevision(@RequestBody TelevisionDto televisionDto, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        return new ResponseEntity<>(televisionService.addTelevision(televisionDto, httpServletRequest, httpServletResponse), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping(value = "/api/television/image/add/{code}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> addImageTelevision(@RequestPart("file") MultipartFile file, @PathVariable String code) throws IOException {
        log.info("start");
        return new ResponseEntity<>(televisionService.addImage(file, code), HttpStatus.OK);
    }

    @GetMapping(value = "/api/television/image/get/{imageCode}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getImageTelevision(@PathVariable String imageCode) {
        return new ResponseEntity<>(televisionService.getImage(imageCode), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping(value = "/api/television/image/delete/{imageCode}")
    public ResponseEntity<String> deleteTelevisionByImageCode(@PathVariable String imageCode) {
        return new ResponseEntity<>(televisionService.deleteTelevisionByImageCode(imageCode), HttpStatus.OK);
    }

    @PostMapping(value = "/api/television/get/{pageNo}")
    public ResponseEntity<List<Television>> getTelevisions(@PathVariable Integer pageNo, @RequestBody TelevisionRequestDto televisionRequestDto) {
        return new ResponseEntity<>(televisionService.getTelevisions(televisionRequestDto, pageNo), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping(value = "/api/television/delete/{id}")
    public ResponseEntity<String> deleteTelevision(@PathVariable Long id) {
        return new ResponseEntity<>(televisionService.deleteTelevision(id), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping(value = "/api/television/put/{id}")
    public ResponseEntity<String> updateTelevision(@PathVariable Long id, @RequestBody TelevisionDto televisionDto) {
        return new ResponseEntity<>(televisionService.updateTelevision(id, televisionDto), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping(value = "/api/television/get/{id}")
    public ResponseEntity<Television> getTelevisionById(@PathVariable Long id) {
        return new ResponseEntity<>(televisionService.getTelevisionById(id), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping(value = "/api/television/image/put/{id}/{oldCode}/{newCode}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> replaceImageTelevision(@PathVariable Long id, @PathVariable String oldCode, @PathVariable String newCode, @RequestPart("file") MultipartFile file) throws IOException {
        return new ResponseEntity<>(televisionService.replaceImageTelevision(id, oldCode, newCode, file), HttpStatus.OK);
    }
}
