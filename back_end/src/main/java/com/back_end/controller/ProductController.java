package com.back_end.controller;

import com.back_end.entity.Product;
import com.back_end.payload.PacketPerMonthDto;
import com.back_end.payload.PaymentDto;
import com.back_end.service.ProductService;
import com.back_end.utils.AppConstants;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.PaymentIntent;
import com.stripe.model.Token;
import com.stripe.param.ChargeCreateParams;
import com.stripe.param.PaymentIntentCreateParams;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@CrossOrigin(origins = "*")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping(value = "/api/product/get/{keyword}/{pageNo}")
    public ResponseEntity<List<Product>> search(@PathVariable String keyword, @PathVariable Integer pageNo) {
        return new ResponseEntity<>(productService.search(keyword, pageNo), HttpStatus.OK);
    }

    @GetMapping(value = "/api/product/delete")
    public ResponseEntity<String> delete() {
        return new ResponseEntity<>(productService.deleteAllProduct(), HttpStatus.OK);
    }

    @GetMapping(value = "/api/product/generate")
    public ResponseEntity<String> generate() {
        return new ResponseEntity<>(productService.addOrderAndPacket(), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping(value = "/api/product/reportNumberPacketPerMonth")
    public ResponseEntity<List<PacketPerMonthDto>> reportNumberPacketPerMonth() {
        return new ResponseEntity<>(productService.reportNumberPacketPerMonth(), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping(value = "/api/product/reportTotalMoneyPerMonth")
    public ResponseEntity<List<PacketPerMonthDto>> reportTotalMoneyPerMonth() {
        return new ResponseEntity<>(productService.reportTotalMoneyPerMonth(), HttpStatus.OK);
    }

    @PostMapping("/api/product/checkout/integrated")
    public ResponseEntity<String> integratedCheckout(@RequestBody PaymentDto paymentDto) throws StripeException {


        System.out.println("start");
        Stripe.apiKey = AppConstants.STRIPE_SECRET_KEY;

        PaymentIntentCreateParams params =
                PaymentIntentCreateParams.builder()
                        .setAmount(200L)
                        .setCurrency("RON")
                        .setPaymentMethod("pm_card_visa")
                        .build();

        PaymentIntent.create(params);
        System.out.println("demo");
        return new ResponseEntity<>("success", HttpStatus.OK);
    }
}
