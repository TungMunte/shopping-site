package com.back_end.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MouseDto {
    private String name;
    private Integer price;
    private String brand;
    private String dpi;
    private String type;
    private String imageCode;
}
