package com.scrapping.seo.reader;

import com.scrapping.seo.entity.ProductAnalysis;
import jakarta.persistence.EntityManagerFactory;
import org.springframework.batch.item.database.JpaPagingItemReader;
import org.springframework.batch.item.database.builder.JpaPagingItemReaderBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class NutrientItemReaderConfig {

    @Bean
    public JpaPagingItemReader<ProductAnalysis> rawProductReader(EntityManagerFactory entityManagerFactory) {
        return new JpaPagingItemReaderBuilder<ProductAnalysis>()
                .name("rawProductReader")
                .entityManagerFactory(entityManagerFactory)
                // title이 아직 없는(AI 분석 전인) 데이터만 가져옵니다.
                .queryString("SELECT p FROM ProductAnalysis p WHERE p.title IS NULL")
                .pageSize(10)
                .build();
    }
}
