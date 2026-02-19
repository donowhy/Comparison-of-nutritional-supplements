# .env 파일 로드 (경로 명시)
script_dir = os.path.dirname(os.path.abspath(__file__))
dotenv_path = os.path.join(script_dir, '.env')
load_dotenv(dotenv_path)

# API 키 확인
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("❌ 에러: .env 파일에 GEMINI_API_KEY가 없습니다.")
else:
    print(f"✅ API 키 로드 성공: {api_key[:5]}****")

# Gemini 설정 (최신 2.0 Flash 모델 적용)
genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-2.0-flash') 
