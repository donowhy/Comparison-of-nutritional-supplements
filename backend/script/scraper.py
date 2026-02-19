import os
import time
import pymysql
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

# 경로 설정
script_dir = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(script_dir, '.env'))

class NutrientScraper:
    def __init__(self):
        self.db_config = {
            'host': os.getenv("DB_HOST", "127.0.0.1"),
            'port': int(os.getenv("DB_PORT", 3307)),
            'user': os.getenv("DB_USER", "admin"),
            'password': os.getenv("DB_PASSWORD", "adminpassword1!"),
            'db': os.getenv("DB_NAME", "nutrient_analysis"),
            'charset': 'utf8mb4',
            'cursorclass': pymysql.cursors.DictCursor
        }
        self.driver = self._init_driver()

    def _init_driver(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
        return webdriver.Chrome(options=chrome_options)

    def scrape(self, keyword):
        print(f">>> {keyword} 수집 중...")
        url = f"https://www.iherb.com/search?kw={keyword}"
        self.driver.get(url)
        time.sleep(3)
        
        products = []
        try:
            items = self.driver.find_elements(By.CLASS_NAME, "product-inner")[:10]
            for item in items:
                try:
                    name = item.find_element(By.CLASS_NAME, "product-title").text
                    price = item.find_element(By.CLASS_NAME, "product-price").text
                    link = item.find_element(By.TAG_NAME, "a").get_attribute("href")
                    img = item.find_element(By.TAG_NAME, "img").get_attribute("src")
                    products.append((keyword, name, price, link, img, "iHerb"))
                except: continue
            
            conn = pymysql.connect(**self.db_config)
            with conn.cursor() as cursor:
                sql = "INSERT IGNORE INTO raw_products (keyword, product_name, price, link, image_url, source) VALUES (%s, %s, %s, %s, %s, %s)"
                cursor.executemany(sql, products)
                conn.commit()
            conn.close()
            print(f"✅ {len(products)}개 원본 저장 완료")
        except Exception as e:
            print(f"❌ 에러: {e}")

    def close(self):
        self.driver.quit()

if __name__ == "__main__":
    scraper = NutrientScraper()
    for kw in ["오메가3", "마그네슘", "비타민D"]:
        scraper.scrape(kw)
    scraper.close()
