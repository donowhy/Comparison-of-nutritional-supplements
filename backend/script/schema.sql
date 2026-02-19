-- 데이터베이스 생성 및 이동
CREATE DATABASE IF NOT EXISTS nutrient_analysis;
USE nutrient_analysis;

-- 1. 원본 제품 데이터 테이블
CREATE TABLE IF NOT EXISTS raw_products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    keyword VARCHAR(100),
    product_name VARCHAR(255),
    price VARCHAR(100),
    image_url TEXT,
    link TEXT UNIQUE,
    source VARCHAR(50),
    raw_description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_keyword (keyword)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. AI 조합 분석 테이블 (SEO용 기둥 페이지)
CREATE TABLE IF NOT EXISTS seo_pillar_pages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    keyword VARCHAR(100) UNIQUE,
    meta_title VARCHAR(255),
    meta_description TEXT,
    title VARCHAR(255),
    content_html LONGTEXT,
    product_ids JSON,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. 영양제 성분 궁합 분석 테이블 (사용자 추가 요청 반영)
CREATE TABLE IF NOT EXISTS ingredient_combinations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_a VARCHAR(100),
    name_b VARCHAR(100),
    synergy_type ENUM('GOOD', 'BAD', 'NEUTRAL'),
    synergy_score TINYINT,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY (name_a, name_b)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
