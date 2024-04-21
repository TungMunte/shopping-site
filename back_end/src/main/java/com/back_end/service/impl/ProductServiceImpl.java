package com.back_end.service.impl;

import com.back_end.entity.Process;
import com.back_end.entity.*;
import com.back_end.payload.PacketPerMonthDto;
import com.back_end.repository.*;
import com.back_end.service.ProductService;
import com.back_end.utils.AppConstants;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.*;
import java.util.*;

@Service
@Slf4j
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final PacketRepository packetRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final LaptopRepository laptopRepository;
    private final MouseRepository mouseRepository;
    private final SmartPhoneRepository smartPhoneRepository;
    private final TabletRepository tabletRepository;
    private final TelevisionRepository televisionRepository;

    public ProductServiceImpl(TelevisionRepository televisionRepository, TabletRepository tabletRepository, SmartPhoneRepository smartPhoneRepository, MouseRepository mouseRepository, LaptopRepository laptopRepository, ProductRepository productRepository, PacketRepository packetRepository, UserRepository userRepository, OrderRepository orderRepository) {
        this.productRepository = productRepository;
        this.packetRepository = packetRepository;
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.laptopRepository = laptopRepository;
        this.mouseRepository = mouseRepository;
        this.smartPhoneRepository = smartPhoneRepository;
        this.tabletRepository = tabletRepository;
        this.televisionRepository = televisionRepository;
    }

    private List<LocalDate[]> separateByMonth(LocalDate startDate, LocalDate endDate) {
        List<LocalDate[]> subRanges = new ArrayList<>();
        LocalDate current = startDate;

        while (current.isBefore(endDate.plusDays(1))) {
            LocalDate monthStart = current.withDayOfMonth(1);
            LocalDate nextMonthStart = monthStart.plusMonths(1).withDayOfMonth(1);
            LocalDate monthEnd = nextMonthStart.minusDays(1);

            // Handle edge case for last month
            if (monthEnd.isAfter(endDate)) {
                monthEnd = endDate;
            }

            subRanges.add(new LocalDate[]{monthStart, monthEnd});
            current = nextMonthStart;
        }

        return subRanges;
    }

    @Override
    public List<Product> search(String keyword, Integer pageNo) {
        Sort sort = Sort.by(AppConstants.DEFAULT_SORT_BY).ascending();
        Pageable pageable = PageRequest.of(pageNo, AppConstants.DEFAULT_PAGE_SIZE, sort);
        String newKeyword = keyword.replace(" ", "\\ ");
        List<Product> productList = productRepository.search(newKeyword, pageable);
        for (Product product : productList) {
            log.info(product.getDescription());
        }
        return productList;
    }

    // for testing purpose
    @Override
    public String deleteAllProduct() {
        List<User> userList = userRepository.findAll();
        for (User user : userList) {
            user.setPackets(new HashSet<>());
            user.setOrders(new HashSet<>());
            user.setTotalPaid((double) 0L);
        }
        this.orderRepository.deleteAll();
        this.packetRepository.deleteAll();

        return "success";
    }

    private int getRandomNumberRange(int min, int max) {
        Random random = new Random();
        return random.nextInt(max - min) + min;
    }

    private Tablet getRandomTablet() {
        List<Tablet> tabletList = tabletRepository.findAll();
        return tabletList.get(getRandomNumberRange(0, tabletList.size() - 1));
    }

    private Laptop getRandomLaptop() {
        List<Laptop> laptopList = laptopRepository.findAll();
        return laptopList.get(getRandomNumberRange(0, laptopList.size() - 1));
    }

    private Mouse getRandomMouse() {
        List<Mouse> mouseList = mouseRepository.findAll();
        return mouseList.get(getRandomNumberRange(0, mouseList.size() - 1));
    }

    private SmartPhone getRandomSmartPhone() {
        List<SmartPhone> smartPhoneList = smartPhoneRepository.findAll();
        return smartPhoneList.get(getRandomNumberRange(0, smartPhoneList.size() - 1));
    }

    private Television getRandomTelevision() {
        List<Television> televisionList = televisionRepository.findAll();
        return televisionList.get(getRandomNumberRange(0, televisionList.size() - 1));
    }

    // for testing purpose
    @Override
    public String addOrderAndPacket() {

        List<User> userList = userRepository.findAllByRole(Role.USER);
        List<User> deliveryManList = userRepository.findAllByRole(Role.DELIVERY_MAN);
        for (User user : userList) {

            while (true) {
                int numberOfOrder = getRandomNumberRange(1, 4);
                Packet packet = new Packet();
                Set<Packet> packetSet = user.getPackets();
                Set<Order> orderSet = new HashSet<>();
                int deliveryTime = 0;
                double price = 0L;
                for (int i = 0; i < numberOfOrder; i++) {
                    Order order = new Order();
                    order.setOwner(user.getUsername());
                    order.setQuantity((long) this.getRandomNumberRange(1, 2));
                    int randomProductType = this.getRandomNumberRange(1, 5);
                    if (randomProductType == 1) {
                        order.setTablet(getRandomTablet());
                        price = price + order.getTablet().getPrice();
                        deliveryTime = order.getTablet().getDeliveryTime() > deliveryTime ? order.getTablet().getDeliveryTime() : deliveryTime;
                    } else if (randomProductType == 2) {
                        order.setSmartPhone(getRandomSmartPhone());
                        price = price + order.getSmartPhone().getPrice();
                        deliveryTime = order.getSmartPhone().getDeliveryTime() > deliveryTime ? order.getSmartPhone().getDeliveryTime() : deliveryTime;
                    } else if (randomProductType == 3) {
                        order.setMouse(getRandomMouse());
                        price = price + order.getMouse().getPrice();
                        deliveryTime = order.getMouse().getDeliveryTime() > deliveryTime ? order.getMouse().getDeliveryTime() : deliveryTime;
                    } else if (randomProductType == 4) {
                        order.setLaptop(getRandomLaptop());
                        price = price + order.getLaptop().getPrice();
                        deliveryTime = order.getLaptop().getDeliveryTime() > deliveryTime ? order.getLaptop().getDeliveryTime() : deliveryTime;
                    } else if (randomProductType == 5) {
                        order.setTelevision(getRandomTelevision());
                        price = price + order.getTelevision().getPrice();
                        deliveryTime = order.getTelevision().getDeliveryTime() > deliveryTime ? order.getTelevision().getDeliveryTime() : deliveryTime;
                    }

                    orderRepository.save(order);
                    orderSet.add(order);
                }

                packet.setOrders(orderSet);
                packet.setOwner(user.getUsername());
                packet.setDeliver(deliveryManList.get(this.getRandomNumberRange(0, deliveryManList.size() - 1)).getUsername());
                packet.setProcess(Process.COMPLETE);
                packet.setTotalPrice(price);

                LocalDate startDate = LocalDate.parse("2024-01-15");
                LocalDate endDate = LocalDate.parse("2024-04-14");
                long diffInDays = endDate.toEpochDay() - startDate.toEpochDay();
                long randomDay = new Random().nextInt((int) diffInDays);
                LocalDate randomDate = startDate.plusDays(randomDay);
                LocalTime specificTime = LocalTime.NOON;
                ZoneId zoneId = ZoneId.of("Europe/Bucharest");
                LocalDateTime localDateTime = LocalDateTime.of(randomDate, specificTime);
                Timestamp timestamp = Timestamp.valueOf(localDateTime.atZone(zoneId).toLocalDateTime());
                packet.setStartDate(timestamp);

                int randomDeliveryType = this.getRandomNumberRange(1, 4);
                if (randomDeliveryType == 1) {
                    packet.setDeliveryType(DeliveryType.BY_COURIER);
                    packet.setDeliveryTime(deliveryTime + 2);
                } else if (randomDeliveryType == 2) {
                    packet.setDeliveryType(DeliveryType.BY_POST);
                    packet.setDeliveryTime(deliveryTime + 3);
                } else if (randomDeliveryType == 3) {
                    packet.setDeliveryType(DeliveryType.AT_STORE);
                    packet.setDeliveryTime(deliveryTime);
                }

                Location location = new Location();
                location.setCountry("Romania");
                int randomCity = this.getRandomNumberRange(1, 4);
                if (randomCity == 1) {
                    location.setCity("Bucharest");
                } else if (randomCity == 2) {
                    location.setCity("Timisoara");
                } else if (randomCity == 3) {
                    location.setCity("Constanta");
                } else if (randomCity == 4) {
                    location.setCity("Cluj-Napoca");
                }
                location.setStreet("Splaiul Independentei");
                location.setNumber((long) this.getRandomNumberRange(1, 300));
                packet.setLocation(location);

                packetRepository.save(packet);
                System.out.println(packet.getStartDate());
                packetSet.add(packet);
                user.setPackets(packetSet);
                user.setTotalPaid(user.getTotalPaid() + price);

                if (user.getUserType() == UserType.GOLD && user.getTotalPaid() > 10000L) {
                    userRepository.save(user);
                    System.out.println(packet.getStartDate());
                    break;
                } else if (user.getUserType() == UserType.SILVER && ((user.getTotalPaid() > 5000L && user.getTotalPaid() < 10000L) || user.getTotalPaid() > 10000L)) {
                    if (user.getTotalPaid() > 10000L) {
                        user.setUserType(UserType.GOLD);
                    }
                    userRepository.save(user);
                    System.out.println(packet.getStartDate());
                    break;
                } else if (user.getUserType() == UserType.NORMAL && ((user.getTotalPaid() > 2000L && user.getTotalPaid() < 5000L) || (user.getTotalPaid() > 5000L && user.getTotalPaid() < 10000L) || user.getTotalPaid() > 10000L)) {
                    if (user.getTotalPaid() > 10000L) {
                        user.setUserType(UserType.GOLD);
                    } else if (user.getTotalPaid() < 10000L && user.getTotalPaid() > 5000L) {
                        user.setUserType(UserType.SILVER);
                    }
                    userRepository.save(user);
                    System.out.println(packet.getStartDate());
                    break;
                }
                userRepository.save(user);
                System.out.println(packet.getStartDate());
            }

        }
        return "success";
    }

    private Timestamp convertToTimestamp(LocalDate date) {
        LocalTime specificTime = LocalTime.NOON;
        ZoneId zoneId = ZoneId.of("Europe/Bucharest");
        LocalDateTime localDateTimeStart = LocalDateTime.of(date, specificTime);
        return Timestamp.valueOf(localDateTimeStart.atZone(zoneId).toLocalDateTime());
    }

    private Month extractMonthEnum(Timestamp timestamp) {
        LocalDate localDate = timestamp.toLocalDateTime().toLocalDate();
        return localDate.getMonth();
    }

    @Override
    public List<PacketPerMonthDto> reportNumberPacketPerMonth() {
        List<PacketPerMonthDto> packetPerMonthDtoList = new ArrayList<>();
        LocalDate startDate = LocalDate.parse("2024-01-15");
        LocalDate endDate = LocalDate.parse("2024-04-14");

        List<LocalDate[]> subRanges = this.separateByMonth(startDate, endDate);
        List<List<Packet>> packets = this.createListOfPacketMonthly(subRanges);

        for (List<Packet> packetList : packets) {
            PacketPerMonthDto packetPerMonthDto = new PacketPerMonthDto();
            packetPerMonthDto.setNumber(packetList.size());
            packetPerMonthDto.setTime(this.extractMonthEnum(packetList.get(0).getStartDate()));
            packetPerMonthDtoList.add(packetPerMonthDto);
        }
        return packetPerMonthDtoList;
    }

    private int calculateMoney(List<Packet> packetList) {
        int sum = 0;
        for (Packet packet : packetList) {
            for (Order order : packet.getOrders()) {
                if (order.getSmartPhone() != null) {
                    sum = sum + order.getSmartPhone().getPrice();
                } else if (order.getMouse() != null) {
                    sum = sum + order.getMouse().getPrice();
                } else if (order.getTelevision() != null) {
                    sum = sum + order.getTelevision().getPrice();
                } else if (order.getLaptop() != null) {
                    sum = sum + order.getLaptop().getPrice();
                } else if (order.getTablet() != null) {
                    sum = sum + order.getTablet().getPrice();
                }
            }
        }
        return sum;
    }

    @Override
    public List<PacketPerMonthDto> reportTotalMoneyPerMonth() {
        LocalDate startDate = LocalDate.parse("2024-01-15");
        LocalDate endDate = LocalDate.parse("2024-04-14");
        List<PacketPerMonthDto> packetPerMonthDtoList = new ArrayList<>();

        List<LocalDate[]> subRanges = this.separateByMonth(startDate, endDate);
        List<List<Packet>> packets = this.createListOfPacketMonthly(subRanges);

        for (List<Packet> packetList : packets) {
            PacketPerMonthDto packetPerMonthDto = new PacketPerMonthDto();
            packetPerMonthDto.setNumber(this.calculateMoney(packetList));
            packetPerMonthDto.setTime(this.extractMonthEnum(packetList.get(0).getStartDate()));
            packetPerMonthDtoList.add(packetPerMonthDto);
        }
        return packetPerMonthDtoList;
    }

    private List<List<Packet>> createListOfPacketMonthly(List<LocalDate[]> subRanges) {
        List<List<Packet>> packets = new ArrayList<>();

        for (LocalDate[] range : subRanges) {
            List<Packet> temp = packetRepository.findAllByStartDateBetween(this.convertToTimestamp(range[0]), this.convertToTimestamp(range[1]));
            packets.add(temp);
        }
        return packets;
    }


}
