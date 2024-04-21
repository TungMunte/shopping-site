package com.back_end.service.impl;

import com.back_end.entity.*;
import com.back_end.payload.OrderDto;
import com.back_end.repository.*;
import com.back_end.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Slf4j
public class OrderServiceImpl implements OrderService {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final SmartPhoneRepository smartPhoneRepository;
    private final LaptopRepository laptopRepository;
    private final TelevisionRepository televisionRepository;
    private final MouseRepository mouseRepository;
    private final TabletRepository tabletRepository;

    public OrderServiceImpl(UserRepository userRepository, OrderRepository orderRepository, SmartPhoneRepository smartPhoneRepository, LaptopRepository laptopRepository, TelevisionRepository televisionRepository, MouseRepository mouseRepository, TabletRepository tabletRepository) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.smartPhoneRepository = smartPhoneRepository;
        this.laptopRepository = laptopRepository;
        this.televisionRepository = televisionRepository;
        this.mouseRepository = mouseRepository;
        this.tabletRepository = tabletRepository;
    }

    @Override
    public String postOrder(OrderDto orderDto, String username, String productType) {
        log.info("start");
        User user = userRepository.findByUsernameOrEmail(username, username).orElseThrow(() -> new UsernameNotFoundException("User not found with username or email: " + username));
        Order order = new Order();
        order.setQuantity(orderDto.getQuantity());
        order.setOwner(username);
        Set<Order> orderSet = user.getOrders();
        switch (productType) {
            case ("smartphone") -> {
                SmartPhone smartPhone = smartPhoneRepository.findByImageCode(orderDto.getImageCode());
                order.setSmartPhone(smartPhone);
            }
            case "television" -> {
                Television television = televisionRepository.findByImageCode(orderDto.getImageCode());
                order.setTelevision(television);
            }
            case "laptop" -> {
                Laptop laptop = laptopRepository.findByImageCode(orderDto.getImageCode());
                order.setLaptop(laptop);
            }
            case "mouse" -> {
                Mouse mouse = mouseRepository.findByImageCode(orderDto.getImageCode());
                order.setMouse(mouse);
            }
            case "tablet" -> {
                Tablet tablet = tabletRepository.findByImageCode(orderDto.getImageCode());
                order.setTablet(tablet);
            }
        }
        orderRepository.save(order);
        orderSet.add(order);
        user.setOrders(orderSet);
        userRepository.save(user);
        log.info("end");
        return "Success";
    }

    @Override
    public List<Order> getOrders(String username, Integer pageNo) {
        log.info("start");
        User user = userRepository.findByUsernameOrEmail(username, username).orElseThrow(() -> new UsernameNotFoundException("User not found with username or email: " + username));
        log.info("end");
        return new ArrayList<>(user.getOrders());
    }

    @Override
    public Order getOrder(Long id) {
        return orderRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found with username or email: " + id));

    }

    @Override
    public String updateOrder(Long id, Long quantity) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Order not found with id: " + id));
        order.setQuantity(quantity);
        orderRepository.save(order);
        return "Success";
    }

    @Override
    public String deleteOrder(Long id, String username) {
        User user = userRepository.findByUsernameOrEmail(username, username).orElseThrow(() -> new UsernameNotFoundException("User not found with username or email: " + username));
        Set<Order> orders = user.getOrders().stream().filter(order -> !Objects.equals(order.getId(), id)).collect(Collectors.toSet());
        user.setOrders(orders);
        orderRepository.deleteById(id);
        return "Success";
    }
}
