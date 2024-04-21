package com.back_end.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Month;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PacketPerMonthDto {
    int number;
    Month time;
}
