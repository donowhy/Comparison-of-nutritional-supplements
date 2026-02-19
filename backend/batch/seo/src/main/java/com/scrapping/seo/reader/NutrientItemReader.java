package com.scrapping.seo.reader;

import com.scrapping.seo.entity.ProductAnalysis;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.batch.item.ItemReader;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Component
public class NutrientItemReader implements ItemReader<ProductAnalysis> {

    private WebDriver driver;
    private Iterator<ProductAnalysis> productIterator;
    private final String[] keywords = {"오메가3", "마그네슘", "비타민D"}; // 수집할 키워드

    @PostConstruct
    public void init() {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless", "--no-sandbox", "--disable-dev-shm-usage");
        this.driver = new ChromeDriver(options);
    }

    @Override
    public ProductAnalysis read() {
        if (productIterator == null || !productIterator.hasNext()) {
            fetchNewProducts();
        }
        return (productIterator != null && productIterator.hasNext()) ? productIterator.next() : null;
    }

    private void fetchNewProducts() {
        List<ProductAnalysis> products = new ArrayList<>();
        for (String keyword : keywords) {
            try {
                driver.get("https://www.iherb.com/search?kw=" + keyword);
                Thread.sleep(3000);
                
                List<WebElement> items = driver.findElements(By.className("product-inner"));
                for (WebElement item : items.subList(0, Math.min(items.size(), 5))) {
                    String name = item.findElement(By.className("product-title")).getText();
                    String price = item.findElement(By.className("product-price")).getText();
                    String link = item.findElement(By.tagName("a")).getAttribute("href");
                    String img = item.findElement(By.tagName("img")).getAttribute("src");

                    products.add(ProductAnalysis.builder()
                            .productName(name)
                            .category(keyword)
                            .price(price)
                            .link(link)
                            .imageUrl(img)
                            .source("iHerb")
                            .build());
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        this.productIterator = products.iterator();
    }

    @PreDestroy
    public void close() {
        if (driver != null) {
            driver.quit();
        }
    }
}
