package com.scrapping.seo.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "product_analyses")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ProductAnalysis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String productName;
    
    private String slug;
    private String source;
    private String category;
    private String price;
    private String imageUrl;
    
    @Column(columnDefinition = "TEXT")
    private String link; // 수익화 코드가 포함된 제휴 링크

    private String title;
    
    @Column(columnDefinition = "LONGTEXT")
    private String contentHtml;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
}
