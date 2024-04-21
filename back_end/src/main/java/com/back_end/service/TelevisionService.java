package com.back_end.service;

import com.back_end.entity.Television;
import com.back_end.payload.TelevisionDto;
import com.back_end.payload.TelevisionRequestDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface TelevisionService {
    String addTelevision(TelevisionDto televisionDto, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse);

    byte[] getImage(String imageCode);

    String addImage(MultipartFile file, String imageCode) throws IOException;

    List<Television> getTelevisions(TelevisionRequestDto televisionRequestDto, Integer pageNo);

    String deleteTelevisionByImageCode(String imageCode);

    String updateTelevision(Long id, TelevisionDto televisionDto);

    String deleteTelevision(Long id);

    Television getTelevisionById(Long id);

    String replaceImageTelevision(Long id, String oldCode, String newCode, MultipartFile file) throws IOException;
}
