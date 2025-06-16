from . import (
    academic_portfolio,
    academic_reference,
    application,
    application_form,
    application_info,
    attachment,
    call,
    call_ethics_question,
    call_institution,
    call_required_document,
    call_security_question,
    call_supervisor,
    call_template,
    auth,
    admin,
    ethical_optional_table,
    ethics_answer,
    ethics_issue,
    ethics_meta,
    institution,
    mobility_entry,
    review_report,
    security_answer,
    security_euci,
    security_meta,
    security_misuse,
    security_other,
    suggested_reference,
    supervisor,
    user,
)

from fastapi import APIRouter

api_router = APIRouter()

api_router.include_router(academic_portfolio.router)
api_router.include_router(academic_reference.router)
api_router.include_router(application.router)
api_router.include_router(application_form.router)
api_router.include_router(application_info.router)
api_router.include_router(attachment.router)
api_router.include_router(call.router)
api_router.include_router(call_ethics_question.router)
api_router.include_router(call_institution.router)
api_router.include_router(call_required_document.router)
api_router.include_router(call_security_question.router)
api_router.include_router(call_supervisor.router)
api_router.include_router(call_template.router)
api_router.include_router(ethical_optional_table.router)
api_router.include_router(ethics_answer.router)
api_router.include_router(ethics_issue.router)
api_router.include_router(ethics_meta.router)
api_router.include_router(institution.router)
api_router.include_router(mobility_entry.router)
api_router.include_router(review_report.router)
api_router.include_router(security_answer.router)
api_router.include_router(security_euci.router)
api_router.include_router(security_meta.router)
api_router.include_router(security_misuse.router)
api_router.include_router(security_other.router)
api_router.include_router(suggested_reference.router)
api_router.include_router(supervisor.router)
api_router.include_router(user.router)
api_router.include_router(auth.router)
api_router.include_router(admin.router)

__all__ = ["api_router"]
