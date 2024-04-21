package com.back_end.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LaptopDto {
    private String name;
    private String brand;
    private String type;
    private Integer price;
    private String processor;
    private String internalMemory;
    private String ram;
    private String screenDimension;
    private String imageQuality;
    private String imageCode;
}
