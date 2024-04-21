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
public class TelevisionRequestDto {
    private Integer min;
    private Integer max;
    private List<String> brand;
    private List<String> type;
    private List<String> imageQuality;
    private List<String> screenDimension;
}
