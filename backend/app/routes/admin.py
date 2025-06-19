from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..crud import call as crud_call
from ..schemas import CallRead
from ..core.security import role_required
from ..core.enums import UserRole

router = APIRouter(prefix="/admin", tags=["Admin"])


@router.get("/call", response_model=list[CallRead])
@role_required(UserRole.admin, UserRole.super_admin)
def list_calls(db: Session = Depends(get_db)):
    return list(crud_call.get_all(db))
