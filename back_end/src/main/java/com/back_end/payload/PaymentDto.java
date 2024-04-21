package com.back_end.payload;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.stripe.model.Token;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDto {
    private String cardNumber;
    private String expMonth;
    private String expYear;
    private String cvc;
    private Double  amount;
    private boolean success;
}
