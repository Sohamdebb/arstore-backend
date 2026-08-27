package com.arstore.backend.config;

import com.arstore.backend.entity.Order;
import com.arstore.backend.entity.OrderItem;
import com.arstore.backend.entity.Product;
import com.arstore.backend.entity.User;
import com.arstore.backend.repository.OrderRepository;
import com.arstore.backend.repository.ProductRepository;
import com.arstore.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (productRepository.count() == 0) {
            seedProducts();
        }
        if (userRepository.count() == 0) {
            seedUsers();
        }
        if (orderRepository.count() == 0) {
            seedOrders();
        }
    }

    private void seedProducts() {
        List<Product> products = List.of(
            Product.builder()
                .productName("Apple iPhone 15 Pro Max")
                .description("The most powerful iPhone ever with A17 Pro chip, titanium design, and 48MP camera system. Experience AR features with advanced LiDAR scanner.")
                .price(1199.99)
                .imageUrl("https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800")
                .category("Smartphones")
                .brand("Apple")
                .stock(50)
                .active(true)
                .build(),

            Product.builder()
                .productName("Samsung Galaxy S24 Ultra")
                .description("Samsung's flagship with built-in AI, S Pen, and stunning Dynamic AMOLED 2X display. Perfect for AR applications.")
                .price(1299.99)
                .imageUrl("https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800")
                .category("Smartphones")
                .brand("Samsung")
                .stock(35)
                .active(true)
                .build(),

            Product.builder()
                .productName("Meta Quest 3 VR Headset")
                .description("Mixed reality headset with full-color passthrough for AR experiences. 128GB storage, Snapdragon XR2 Gen 2 processor.")
                .price(499.99)
                .imageUrl("https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800")
                .category("AR/VR Headsets")
                .brand("Meta")
                .stock(25)
                .active(true)
                .build(),

            Product.builder()
                .productName("Apple Vision Pro")
                .description("Apple's revolutionary spatial computing device. Seamlessly blend digital content with the physical world.")
                .price(3499.99)
                .imageUrl("https://images.unsplash.com/photo-1709884735646-897b57461d61?w=800")
                .category("AR/VR Headsets")
                .brand("Apple")
                .stock(10)
                .active(true)
                .build(),

            Product.builder()
                .productName("Microsoft HoloLens 2")
                .description("Enterprise-grade mixed reality headset. Hands-free interaction, holographic processing unit, and enterprise support.")
                .price(3500.00)
                .imageUrl("https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=800")
                .category("AR/VR Headsets")
                .brand("Microsoft")
                .stock(8)
                .active(true)
                .build(),

            Product.builder()
                .productName("Sony PlayStation VR2")
                .description("Next-gen VR gaming headset with 4K HDR OLED display, eye tracking, and haptic feedback.")
                .price(549.99)
                .imageUrl("https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=800")
                .category("AR/VR Headsets")
                .brand("Sony")
                .stock(40)
                .active(true)
                .build(),

            Product.builder()
                .productName("iPhone 15 Pro Case with AR Markers")
                .description("Special case designed with AR tracking markers for enhanced augmented reality experiences. Compatible with all AR apps.")
                .price(39.99)
                .imageUrl("https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800")
                .category("Accessories")
                .brand("TechArmor")
                .stock(200)
                .active(true)
                .build(),

            Product.builder()
                .productName("RealSense Depth Camera D455")
                .description("Stereoscopic depth camera for AR/3D applications. USB-C, 90fps depth sensing, 1280x720 resolution.")
                .price(349.99)
                .imageUrl("https://images.unsplash.com/photo-1518770660439-4636190af475?w=800")
                .category("Cameras")
                .brand("Intel")
                .stock(15)
                .active(true)
                .build(),

            Product.builder()
                .productName("Leap Motion Controller 2")
                .description("Ultra-precise hand tracking controller for AR/VR development. Compact design with wide field of view.")
                .price(249.99)
                .imageUrl("https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800")
                .category("Input Devices")
                .brand("Ultraleap")
                .stock(30)
                .active(true)
                .build(),

            Product.builder()
                .productName("Nreal Air AR Glasses")
                .description("Lightweight AR glasses that project a 130-inch virtual screen. TUV certified eye comfort. Compatible with phones and PCs.")
                .price(379.99)
                .imageUrl("https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800")
                .category("AR Glasses")
                .brand("Xreal")
                .stock(45)
                .active(true)
                .build(),

            Product.builder()
                .productName("Magic Leap 2")
                .description("Enterprise AR headset with largest field of view, dynamic dimming, and enterprise-grade compute pack.")
                .price(3299.99)
                .imageUrl("https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800")
                .category("AR/VR Headsets")
                .brand("Magic Leap")
                .stock(5)
                .active(true)
                .build(),

            Product.builder()
                .productName("Qualcomm Snapdragon XR2 Dev Kit")
                .description("Development kit for building next-gen AR/VR experiences. Features Snapdragon XR2 Gen 2 platform.")
                .price(1399.99)
                .imageUrl("https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800")
                .category("Development Kits")
                .brand("Qualcomm")
                .stock(12)
                .active(true)
                .build()
        );

        productRepository.saveAll(products);
        log.info("Seeded {} products", products.size());
    }

    private void seedUsers() {
        User admin = User.builder()
                .name("Admin User")
                .email("admin@arstore.com")
                .password(passwordEncoder.encode("admin123"))
                .role("ADMIN")
                .address("123 Tech Street, Silicon Valley, CA")
                .phone("+1-555-0100")
                .build();

        User demoUser = User.builder()
                .name("Demo User")
                .email("demo@arstore.com")
                .password(passwordEncoder.encode("demo123"))
                .role("USER")
                .address("456 Innovation Ave, San Francisco, CA")
                .phone("+1-555-0200")
                .build();

        userRepository.saveAll(List.of(admin, demoUser));
        log.info("Seeded {} users", 2);
    }

    private void seedOrders() {
        User demoUser = userRepository.findByEmail("demo@arstore.com").orElse(null);
        User admin = userRepository.findByEmail("admin@arstore.com").orElse(null);
        if (demoUser == null || admin == null) return;

        List<Product> products = productRepository.findAll();
        if (products.size() < 4) return;

        // Order 1 - Demo user bought some items
        Order order1 = Order.builder()
                .user(demoUser)
                .shippingAddress("456 Innovation Ave, San Francisco, CA")
                .paymentMethod("Credit Card")
                .status("DELIVERED")
                .orderNumber("AR-100001")
                .totalAmount(1769.97)
                .createdAt(LocalDateTime.now().minusDays(15))
                .build();
        order1.setItems(new ArrayList<>());

        OrderItem item1 = OrderItem.builder().order(order1).product(products.get(0)).quantity(1).price(1199.99).build();
        OrderItem item2 = OrderItem.builder().order(order1).product(products.get(2)).quantity(1).price(499.99).build();
        order1.getItems().add(item1);
        order1.getItems().add(item2);
        orderRepository.save(order1);

        // Order 2 - Demo user shipped
        Order order2 = Order.builder()
                .user(demoUser)
                .shippingAddress("456 Innovation Ave, San Francisco, CA")
                .paymentMethod("PayPal")
                .status("SHIPPED")
                .orderNumber("AR-100002")
                .totalAmount(410.99)
                .createdAt(LocalDateTime.now().minusDays(5))
                .build();
        order2.setItems(new ArrayList<>());

        OrderItem item3 = OrderItem.builder().order(order2).product(products.get(9)).quantity(1).price(379.99).build();
        order2.getItems().add(item3);
        orderRepository.save(order2);

        // Order 3 - Admin bought items
        Order order3 = Order.builder()
                .user(admin)
                .shippingAddress("123 Tech Street, Silicon Valley, CA")
                .paymentMethod("Credit Card")
                .status("CONFIRMED")
                .orderNumber("AR-100003")
                .totalAmount(7139.97)
                .createdAt(LocalDateTime.now().minusDays(2))
                .build();
        order3.setItems(new ArrayList<>());

        OrderItem item4 = OrderItem.builder().order(order3).product(products.get(3)).quantity(1).price(3499.99).build();
        OrderItem item5 = OrderItem.builder().order(order3).product(products.get(4)).quantity(1).price(3500.00).build();
        order3.getItems().add(item4);
        order3.getItems().add(item5);
        orderRepository.save(order3);

        // Order 4 - Demo user pending
        Order order4 = Order.builder()
                .user(demoUser)
                .shippingAddress("456 Innovation Ave, San Francisco, CA")
                .paymentMethod("Debit Card")
                .status("PENDING")
                .orderNumber("AR-100004")
                .totalAmount(593.99)
                .createdAt(LocalDateTime.now().minusHours(6))
                .build();
        order4.setItems(new ArrayList<>());

        OrderItem item6 = OrderItem.builder().order(order4).product(products.get(5)).quantity(1).price(549.99).build();
        order4.getItems().add(item6);
        orderRepository.save(order4);

        log.info("Seeded {} orders", 4);
    }
}
