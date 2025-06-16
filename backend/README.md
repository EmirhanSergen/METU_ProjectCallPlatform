# Project Call Platform

Bu proje, FastAPI, SQLAlchemy ve Pydantic kullanarak akademik projelerin başvuru
süreçlerini yönetmek için başlangıç bir iskelet sunar.

## Database Initialization

İlk kez çalıştırmadan önce veritabanı tablolarını oluşturmanız gerekir.

```bash
python -c "from app.database import init_db; init_db()"
```

