package com.arstore.backend.service;

import com.arstore.backend.dto.OrderRequest;
import com.arstore.backend.entity.Order;
import com.arstore.backend.entity.OrderItem;
import com.arstore.backend.entity.Product;
import com.arstore.backend.entity.User;
import com.arstore.backend.repository.OrderRepository;
import com.arstore.backend.repository.ProductRepository;
import com.arstore.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Transactional
    public Order createOrder(Long userId, OrderRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = Order.builder()
                .user(user)
                .shippingAddress(request.getShippingAddress())
                .paymentMethod(request.getPaymentMethod() != null ? request.getPaymentMethod() : "Credit Card")
                .status("CONFIRMED")
                .orderNumber("AR-" + System.currentTimeMillis() % 1000000)
                .build();

        List<OrderItem> items = new ArrayList<>();
        double totalAmount = 0.0;

        for (OrderRequest.OrderItemRequest itemReq : request.getItems()) {
            Product product = productRepository.findById(itemReq.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found with id: " + itemReq.getProductId()));

            if (product.getStock() < itemReq.getQuantity()) {
                throw new RuntimeException("Insufficient stock for " + product.getProductName() +
                        " (available: " + product.getStock() + ", requested: " + itemReq.getQuantity() + ")");
            }

            product.setStock(product.getStock() - itemReq.getQuantity());
            productRepository.save(product);

            OrderItem item = OrderItem.builder()
                    .order(order)
                    .product(product)
                    .quantity(itemReq.getQuantity())
                    .price(product.getPrice())
                    .build();

            totalAmount += product.getPrice() * itemReq.getQuantity();
            items.add(item);
        }

        // Free shipping over $500
        if (totalAmount < 500) {
            totalAmount += 29.99; // shipping
        }

        // Tax 8%
        double tax = totalAmount * 0.08;
        totalAmount += tax;

        order.setItems(items);
        order.setTotalAmount(Math.round(totalAmount * 100.0) / 100.0);

        return orderRepository.save(order);
    }

    public List<Order> getUserOrders(Long userId) {
        return orderRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
    }

    public Order getOrderByIdAndUserId(Long orderId, Long userId) {
        return orderRepository.findByIdAndUserId(orderId, userId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order updateOrderStatus(Long orderId, String status) {
        Order order = getOrderById(orderId);
        order.setStatus(status);
        return orderRepository.save(order);
    }

    // Admin statistics
    public Map<String, Object> getAdminStats() {
        Map<String, Object> stats = new HashMap<>();

        Double totalRevenue = orderRepository.getTotalRevenue();
        Long totalOrders = orderRepository.getTotalOrders();

        int currentMonth = LocalDateTime.now().getMonthValue();
        int currentYear = LocalDateTime.now().getYear();
        Double monthlyRevenue = orderRepository.getMonthlyRevenue(currentMonth, currentYear);

        List<Object[]> ordersByStatus = orderRepository.getOrdersByStatus();
        Map<String, Long> statusCounts = new HashMap<>();
        for (Object[] row : ordersByStatus) {
            statusCounts.put((String) row[0], (Long) row[1]);
        }

        stats.put("totalRevenue", totalRevenue != null ? totalRevenue : 0.0);
        stats.put("totalOrders", totalOrders != null ? totalOrders : 0L);
        stats.put("monthlyRevenue", monthlyRevenue != null ? monthlyRevenue : 0.0);
        stats.put("ordersByStatus", statusCounts);

        return stats;
    }
}
