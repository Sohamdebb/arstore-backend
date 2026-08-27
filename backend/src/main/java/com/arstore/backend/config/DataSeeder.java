package com.arstore.backend.config;

import com.arstore.backend.entity.Product;
import com.arstore.backend.entity.User;
import com.arstore.backend.repository.ProductRepository;
import com.arstore.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (productRepository.count() == 0) {
            seedProducts();
        }
        if (userRepository.count() == 0) {
            seedUsers();
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
}
