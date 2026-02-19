package com.scrapping.seo.processor;

import com.scrapping.seo.entity.ProductAnalysis;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
public class NutrientItemProcessor implements ItemProcessor<ProductAnalysis, ProductAnalysis> {

    private final WebClient webClient = WebClient.create("https://generativelanguage.googleapis.com");
    private final String AFFILIATE_ID = "YOUR_AFFILIATE_ID"; // 쿠팡/아이허브 파트너스 ID

    @Override
    public ProductAnalysis process(ProductAnalysis item) throws Exception {
        // 1. Gemini API 호출 (추후 구현)
        
        // 2. 수익화 링크 생성
        String affiliateLink = convertToAffiliateLink(item.getLink());
        item.setLink(affiliateLink);
        
        return item;
    }

    private String convertToAffiliateLink(String originalLink) {
        if (originalLink.contains("coupang.com")) {
            return originalLink + "?lptag=" + AFFILIATE_ID;
        }
        return originalLink;
    }
}
