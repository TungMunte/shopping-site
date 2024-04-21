package com.back_end.service;

import com.back_end.entity.Product;
import com.back_end.payload.PacketPerMonthDto;

import java.util.List;

public interface ProductService {
    List<Product> search(String keyword, Integer pageNo);

    String deleteAllProduct();

    String addOrderAndPacket();

    List<PacketPerMonthDto> reportNumberPacketPerMonth();

    List<PacketPerMonthDto> reportTotalMoneyPerMonth();
}
