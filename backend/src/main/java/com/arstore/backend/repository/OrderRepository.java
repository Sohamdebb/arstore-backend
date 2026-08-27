package com.arstore.backend.repository;

import com.arstore.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUserIdOrderByCreatedAtDesc(Long userId);

    List<Order> findByStatusOrderByCreatedAtDesc(String status);

    Optional<Order> findByIdAndUserId(Long id, Long userId);

    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o WHERE o.status != 'CANCELLED'")
    Double getTotalRevenue();

    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o WHERE o.status != 'CANCELLED' AND MONTH(o.createdAt) = :month AND YEAR(o.createdAt) = :year")
    Double getMonthlyRevenue(@Param("month") int month, @Param("year") int year);

    @Query("SELECT COUNT(o) FROM Order o WHERE o.status != 'CANCELLED'")
    Long getTotalOrders();

    @Query("SELECT o.status, COUNT(o) FROM Order o GROUP BY o.status")
    List<Object[]> getOrdersByStatus();

    @Query("SELECT FUNCTION('DATE', o.createdAt), COALESCE(SUM(o.totalAmount), 0) FROM Order o WHERE o.status != 'CANCELLED' GROUP BY FUNCTION('DATE', o.createdAt) ORDER BY FUNCTION('DATE', o.createdAt) DESC")
    List<Object[]> getDailyRevenue();
}
