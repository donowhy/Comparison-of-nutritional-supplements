FROM python:3.9-slim

# 크롬 및 드라이버 설치 필수 패키지
RUN apt-get update && apt-get install -y 
    wget 
    gnupg 
    unzip 
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - 
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' 
    && apt-get update 
    && apt-get install -y google-chrome-stable

# 작업 디렉토리 설정
WORKDIR /app

# 라이브러리 설치
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 소스 복사
COPY . .

# 실행 명령어 (외부에서 호출 가능하게 대기하거나, 바로 실행)
CMD ["python", "scraper.py"]
