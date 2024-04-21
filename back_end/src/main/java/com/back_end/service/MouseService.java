package com.back_end.service;

import com.back_end.entity.Mouse;
import com.back_end.payload.MouseDto;
import com.back_end.payload.MouseRequestDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface MouseService {
    String addMouse(MouseDto mouseDto, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse);

    byte[] getImage(String imageCode);

    String addImage(MultipartFile file, String imageCode) throws IOException;

    List<Mouse> getMouses(MouseRequestDto mouseRequestDto, Integer pageNo);

    String deleteMouseByImageCode(String imageCode);

    String updateMouse(Long id, MouseDto mouseDto);

    String deleteMouse(Long id);

    Mouse getMouseById(Long id);

    String replaceImageMouse(Long id, String oldCode, String newCode, MultipartFile file) throws IOException;
}
