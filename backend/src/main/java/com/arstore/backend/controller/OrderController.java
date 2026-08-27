package com.arstore.backend.controller;

import com.arstore.backend.dto.ApiResponse;
import com.arstore.backend.dto.OrderRequest;
import com.arstore.backend.entity.Order;
import com.arstore.backend.entity.User;
import com.arstore.backend.service.OrderService;
import com.arstore.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<ApiResponse<Order>> createOrder(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @Valid @RequestBody OrderRequest request) {
        User user = getUserFromHeader(authHeader);
        Order order = orderService.createOrder(user.getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Order placed successfully", order));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Order>>> getMyOrders(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        User user = getUserFromHeader(authHeader);
        List<Order> orders = orderService.getUserOrders(user.getId());
        return ResponseEntity.ok(ApiResponse.success("Orders fetched", orders));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Order>> getOrderById(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @PathVariable Long id) {
        User user = getUserFromHeader(authHeader);
        Order order = orderService.getOrderByIdAndUserId(id, user.getId());
        return ResponseEntity.ok(ApiResponse.success("Order fetched", order));
    }

    // Admin endpoints
    @GetMapping("/admin/all")
    public ResponseEntity<ApiResponse<List<Order>>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(ApiResponse.success("All orders fetched", orders));
    }

    @PutMapping("/admin/{id}/status")
    public ResponseEntity<ApiResponse<Order>> updateOrderStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        Order order = orderService.updateOrderStatus(id, body.get("status"));
        return ResponseEntity.ok(ApiResponse.success("Order status updated", order));
    }

    @GetMapping("/admin/stats")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getAdminStats() {
        Map<String, Object> stats = orderService.getAdminStats();
        return ResponseEntity.ok(ApiResponse.success("Stats fetched", stats));
    }

    private User getUserFromHeader(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Not authenticated");
        }
        String token = authHeader.substring(7);
        return userService.getUserFromToken(token);
    }
}
