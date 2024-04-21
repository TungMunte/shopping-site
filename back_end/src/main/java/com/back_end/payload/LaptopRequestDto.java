package com.back_end.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LaptopRequestDto {
    private Integer min;
    private Integer max;
    private List<String> brand;
    private List<String> type;
    private List<String> processor;
    private List<String> internalMemory;
    private List<String> ram;
    private List<String> screenDimension;
}
