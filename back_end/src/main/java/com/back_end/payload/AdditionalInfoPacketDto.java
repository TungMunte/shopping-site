package com.back_end.payload;

import com.back_end.entity.DeliveryType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdditionalInfoPacketDto {
    private Long number;
    private String street;
    private String city;
    private String country;
    private DeliveryType deliveryType;
    private Double totalPrice;
}
