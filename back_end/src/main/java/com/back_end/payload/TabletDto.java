package com.back_end.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TabletDto {
    private String name;
    private Integer price;
    private String brand;
    private String memory;
    private String resolution;
    private String imageCode;
}
