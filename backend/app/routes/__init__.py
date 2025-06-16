from fastapi import APIRouter

from .user import router as user_router
from .call import router as call_router

api_router = APIRouter()
api_router.include_router(user_router)
api_router.include_router(call_router)

__all__ = ["api_router"]
