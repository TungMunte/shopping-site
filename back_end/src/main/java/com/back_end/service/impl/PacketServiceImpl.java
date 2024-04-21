package com.back_end.service.impl;

import com.back_end.entity.Process;
import com.back_end.entity.*;
import com.back_end.payload.AdditionalInfoPacketDto;
import com.back_end.repository.LocationRepository;
import com.back_end.repository.PacketRepository;
import com.back_end.repository.UserRepository;
import com.back_end.service.PacketService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Slf4j
public class PacketServiceImpl implements PacketService {
    private final UserRepository userRepository;
    private final PacketRepository packetRepository;

    private final LocationRepository locationRepository;

    public PacketServiceImpl(UserRepository userRepository, PacketRepository packetRepository, LocationRepository locationRepository) {
        this.userRepository = userRepository;
        this.packetRepository = packetRepository;
        this.locationRepository = locationRepository;
    }

    @Override
    public String addPacket(AdditionalInfoPacketDto additionalInfoPacketDto, String username) {

        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found with username or email: " + username));
        Set<Order> orderSet = new HashSet<>(user.getOrders());
        int maxDeliveryTime = 0;
        for (Order order : orderSet.stream().toList()) {
            if (order.getSmartPhone() != null) {
                if (order.getSmartPhone().getDeliveryTime() > maxDeliveryTime) {
                    maxDeliveryTime = order.getSmartPhone().getDeliveryTime();
                }
            } else if (order.getLaptop() != null) {
                if (order.getLaptop().getDeliveryTime() > maxDeliveryTime) {
                    maxDeliveryTime = order.getLaptop().getDeliveryTime();
                }
            } else if (order.getMouse() != null) {
                if (order.getMouse().getDeliveryTime() > maxDeliveryTime) {
                    maxDeliveryTime = order.getMouse().getDeliveryTime();
                }
            } else if (order.getTablet() != null) {
                if (order.getTablet().getDeliveryTime() > maxDeliveryTime) {
                    maxDeliveryTime = order.getTablet().getDeliveryTime();
                }
            } else if (order.getTelevision() != null) {
                if (order.getTelevision().getDeliveryTime() > maxDeliveryTime) {
                    maxDeliveryTime = order.getTelevision().getDeliveryTime();
                }
            }
        }

        Packet packet = new Packet();
        Location location = new Location();
        location.setNumber(additionalInfoPacketDto.getNumber());
        location.setStreet(additionalInfoPacketDto.getStreet());
        location.setCity(additionalInfoPacketDto.getCity());
        location.setCountry(additionalInfoPacketDto.getCountry());
        packet.setLocation(location);
        packet.setProcess(Process.ON_DELIVERY);

        packet.setDeliveryType(additionalInfoPacketDto.getDeliveryType());
        if (additionalInfoPacketDto.getDeliveryType() == DeliveryType.BY_COURIER) {
            packet.setDeliveryTime(maxDeliveryTime + 2);
        }
        if (additionalInfoPacketDto.getDeliveryType() == DeliveryType.BY_POST) {
            packet.setDeliveryTime(maxDeliveryTime + 3);
        }

        packet.setTotalPrice(additionalInfoPacketDto.getTotalPrice());
        packet.setOwner(username);
        packet.setOrders(orderSet);
        LocalDateTime now = LocalDateTime.now();
        Timestamp timestamp = Timestamp.valueOf(now);
        packet.setStartDate(timestamp);
        packetRepository.save(packet);
        Set<Packet> packetSet = user.getPackets();
        packetSet.add(packet);

        user.setPackets(packetSet);
        user.setOrders(new HashSet<>());
        if (user.getTotalPaid() + additionalInfoPacketDto.getTotalPrice() > 5000 && user.getTotalPaid() + additionalInfoPacketDto.getTotalPrice() < 10000) {
            user.setUserType(UserType.SILVER);
        } else if (user.getTotalPaid() + additionalInfoPacketDto.getTotalPrice() > 10000) {
            user.setUserType(UserType.GOLD);
        }
        user.setTotalPaid(user.getTotalPaid() + additionalInfoPacketDto.getTotalPrice());
        userRepository.save(user);
        return "Success";
    }

    @Override
    public List<Packet> getPackets(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Packet not found with username or email: " + username));
        return user.getPackets().stream().toList();
    }

    @Override
    public String updatePacket(Long id, Process process) {
        Packet packet = packetRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Packet not found with id : " + id));
        packet.setProcess(process);
        packetRepository.save(packet);
        return "Success";
    }

    @Override
    public String deletePacket(Long id) {
        Packet packet = packetRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Packet not found with id: " + id));
        packet.setOrders(new HashSet<>());
        packet.setLocation(null);
        User owner = userRepository.findByUsername(packet.getOwner()).orElseThrow(() -> new UsernameNotFoundException("Packet not found with id: " + id));
        for (Packet p : owner.getPackets()) {
            if (Objects.equals(p.getId(), id)) {
                Set<Packet> newPackets = owner.getPackets();
                newPackets.remove(p);
                owner.setPackets(newPackets);
                userRepository.save(owner);
                break;
            }
        }
        Optional<User> deliver = userRepository.findByUsername(packet.getDeliver());
        if (deliver.isPresent()) {
            for (Packet p : deliver.get().getPackets()) {
                if (Objects.equals(p.getId(), id)) {
                    Set<Packet> newPackets = owner.getPackets();
                    newPackets.remove(p);
                    owner.setPackets(newPackets);
                    userRepository.save(owner);
                    break;
                }
            }
        }
        packetRepository.save(packet);
        packetRepository.deleteById(id);
        return "Success";
    }

    @Override
    public List<Packet> getAllPacket() {
        return packetRepository.findAll();
    }

    @Override
    public List<Packet> getPacketForDeliver(String deliver) {
        return packetRepository.findAllByDeliver(deliver);
    }

    @Override
    public List<Packet> getPacketByProcess(Process process) {
        return packetRepository.findByProcess(process);
    }

    @Override
    public String packetSelectByDeliver(String deliver, Long id) {
        Packet packet = packetRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Packet not found with id: " + id));
        packet.setDeliver(deliver);
        packetRepository.save(packet);
        return "Success";
    }

}
