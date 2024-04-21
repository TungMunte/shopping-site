package com.back_end.controller;

import com.back_end.entity.Mouse;
import com.back_end.payload.MouseDto;
import com.back_end.payload.MouseRequestDto;
import com.back_end.service.MouseService;
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
public class MouseController {
    private final MouseService mouseService;

    public MouseController(MouseService mouseService) {
        this.mouseService = mouseService;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping(value = "/api/mouse/add")
    public ResponseEntity<String> addMouse(@RequestBody MouseDto mouseDto, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        return new ResponseEntity<>(mouseService.addMouse(mouseDto, httpServletRequest, httpServletResponse), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping(value = "/api/mouse/image/add/{code}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> addImageMouse(@RequestPart("file") MultipartFile file, @PathVariable String code) throws IOException {
        log.info("start");
        return new ResponseEntity<>(mouseService.addImage(file, code), HttpStatus.OK);
    }

    @GetMapping(value = "/api/mouse/image/get/{imageCode}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getImageTablet(@PathVariable String imageCode) {
        return new ResponseEntity<>(mouseService.getImage(imageCode), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping(value = "/api/mouse/image/delete/{imageCode}")
    public ResponseEntity<String> deleteMouseByImageCode(@PathVariable String imageCode) {
        return new ResponseEntity<>(mouseService.deleteMouseByImageCode(imageCode), HttpStatus.OK);
    }

    @PostMapping(value = "/api/mouse/get/{pageNo}")
    public ResponseEntity<List<Mouse>> getTablets(@PathVariable Integer pageNo, @RequestBody MouseRequestDto mouseRequestDto) {
        return new ResponseEntity<>(mouseService.getMouses(mouseRequestDto, pageNo), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping(value = "/api/mouse/delete/{id}")
    public ResponseEntity<String> deleteMouse(@PathVariable Long id) {
        return new ResponseEntity<>(mouseService.deleteMouse(id), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping(value = "/api/mouse/put/{id}")
    public ResponseEntity<String> updateTablet(@PathVariable Long id, @RequestBody MouseDto mouseDto) {
        return new ResponseEntity<>(mouseService.updateMouse(id, mouseDto), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping(value = "/api/mouse/get/{id}")
    public ResponseEntity<Mouse> getMouseById(@PathVariable Long id) {
        return new ResponseEntity<>(mouseService.getMouseById(id), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping(value = "/api/mouse/image/put/{id}/{oldCode}/{newCode}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> replaceImageMouse(@PathVariable Long id, @PathVariable String oldCode, @PathVariable String newCode, @RequestPart("file") MultipartFile file) throws IOException {
        return new ResponseEntity<>(mouseService.replaceImageMouse(id, oldCode, newCode, file), HttpStatus.OK);
    }
}
