package com.back_end.service;

import com.back_end.entity.Laptop;
import com.back_end.payload.LaptopDto;
import com.back_end.payload.LaptopRequestDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface LaptopService {
    String addLaptop(LaptopDto laptopDto, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse);

    byte[] getImage(String imageCode);

    String addImage(MultipartFile file, String imageCode) throws IOException;

    List<Laptop> getLaptops(LaptopRequestDto laptopRequestDto, Integer pageNo);

    String deleteLaptopByImageCode(String imageCode);

    String updateLaptop(Long id, LaptopDto laptopDto);

    String deleteLaptop(Long id);

    Laptop getLaptopById(Long id);

    String replaceImageLaptop(Long id, String oldCode, String newCode, MultipartFile file) throws IOException;
}
