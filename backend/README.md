# Project Call Platform

Bu proje, FastAPI, SQLAlchemy ve Pydantic kullanarak akademik projelerin başvuru
süreçlerini yönetmek için başlangıç bir iskelet sunar.

## Database Initialization

İlk kez çalıştırmadan önce veritabanı tablolarını oluşturmanız gerekir. Bu
projede göç (migration) aracı kullanılmaz. Modellerde yapılan değişiklikler
veritabanına elle uygulanmalıdır.

```bash
python -c "from app.database import init_db; init_db()"
```

If your database was created before the `attachments.field_name` column was
introduced, add it manually:

```sql
ALTER TABLE attachments ADD COLUMN field_name VARCHAR;
```

