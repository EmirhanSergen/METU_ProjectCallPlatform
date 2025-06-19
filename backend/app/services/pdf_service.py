from io import BytesIO
from reportlab.pdfgen import canvas


def create_simple_pdf(text: str) -> bytes:
    """Create a simple single-page PDF with the given text."""
    buffer = BytesIO()
    c = canvas.Canvas(buffer)
    c.drawString(100, 750, text)
    c.save()
    buffer.seek(0)
    return buffer.getvalue()
