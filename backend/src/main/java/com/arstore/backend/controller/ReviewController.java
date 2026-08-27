package com.arstore.backend.controller;

import com.arstore.backend.dto.ApiResponse;
import com.arstore.backend.entity.Review;
import com.arstore.backend.entity.User;
import com.arstore.backend.service.ReviewService;
import com.arstore.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final UserService userService;

    @PostMapping("/product/{productId}")
    public ResponseEntity<ApiResponse<Review>> createReview(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @PathVariable Long productId,
            @RequestBody Map<String, Object> body) {
        User user = getUserFromHeader(authHeader);
        Integer rating = (Integer) body.get("rating");
        String title = (String) body.get("title");
        String comment = (String) body.get("comment");
        Review review = reviewService.createReview(user.getId(), productId, rating, title, comment);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Review submitted", review));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<ApiResponse<List<Review>>> getProductReviews(@PathVariable Long productId) {
        List<Review> reviews = reviewService.getProductReviews(productId);
        return ResponseEntity.ok(ApiResponse.success("Reviews fetched", reviews));
    }

    @GetMapping("/product/{productId}/summary")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getProductRatingSummary(@PathVariable Long productId) {
        Map<String, Object> summary = reviewService.getProductRatingSummary(productId);
        return ResponseEntity.ok(ApiResponse.success("Rating summary", summary));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<Review>>> getMyReviews(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        User user = getUserFromHeader(authHeader);
        List<Review> reviews = reviewService.getUserReviews(user.getId());
        return ResponseEntity.ok(ApiResponse.success("Your reviews", reviews));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteReview(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @PathVariable Long id) {
        User user = getUserFromHeader(authHeader);
        reviewService.deleteReview(id, user.getId());
        return ResponseEntity.ok(ApiResponse.success("Review deleted", null));
    }

    private User getUserFromHeader(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Not authenticated");
        }
        return userService.getUserFromToken(authHeader.substring(7));
    }
}
