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
public class TabletRequestDto {
    private Integer min;
    private Integer max;
    private List<String> brand;
    private List<String> memory;
    private List<String> resolution;
}
