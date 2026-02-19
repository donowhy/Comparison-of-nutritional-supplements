package com.scrapping.seo.config;

import com.scrapping.seo.entity.ProductAnalysis;
import com.scrapping.seo.processor.NutrientItemProcessor;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.database.JpaItemWriter;
import org.springframework.batch.item.database.JpaPagingItemReader;
import org.springframework.batch.item.database.builder.JpaItemWriterBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;
import jakarta.persistence.EntityManagerFactory;

@Configuration
@RequiredArgsConstructor
public class ScrapingJobConfig {

    private final JobRepository jobRepository;
    private final PlatformTransactionManager transactionManager;
    private final EntityManagerFactory entityManagerFactory;
    private final JpaPagingItemReader<ProductAnalysis> rawProductReader; // DB 리더 사용
    private final NutrientItemProcessor nutrientItemProcessor;

    @Bean
    public Job analyzeJob() {
        return new JobBuilder("analyzeJob", jobRepository)
                .start(analyzeStep())
                .build();
    }

    @Bean
    public Step analyzeStep() {
        return new StepBuilder("analyzeStep", jobRepository)
                .<ProductAnalysis, ProductAnalysis>chunk(5, transactionManager)
                .reader(rawProductReader) // DB에서 5개씩 끊어서 읽음
                .processor(nutrientItemProcessor) // AI 분석 수행
                .writer(jpaItemWriter()) // 최종 결과 저장
                .build();
    }

    @Bean
    public JpaItemWriter<ProductAnalysis> jpaItemWriter() {
        return new JpaItemWriterBuilder<ProductAnalysis>()
                .entityManagerFactory(entityManagerFactory)
                .build();
    }
}
