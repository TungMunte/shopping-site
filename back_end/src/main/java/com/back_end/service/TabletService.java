package com.back_end.service;

import com.back_end.entity.Tablet;
import com.back_end.payload.TabletDto;
import com.back_end.payload.TabletRequestDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface TabletService {
    String addTablet(TabletDto tabletDto, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse);

    byte[] getImage(String imageCode);

    String addImage(MultipartFile file, String imageCode) throws IOException;

    List<Tablet> getTablets(TabletRequestDto tabletRequestDto, Integer pageNo);

    String deleteTabletByImageCode(String imageCode);

    String updateTablet(Long id, TabletDto tabletDto);

    String deleteTablet(Long id);

    Tablet getTabletById(Long id);

    String replaceImageTablet(Long id, String oldCode, String newCode, MultipartFile file) throws IOException;
}
