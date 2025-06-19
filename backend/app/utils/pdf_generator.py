import os
import pdfkit
from jinja2 import Environment, FileSystemLoader
from tempfile import NamedTemporaryFile

def generate_application_pdf(data: dict) -> str:
    """
    Takes the application data dict and returns a path to the generated PDF file.
    """
    # Load HTML template from templates directory
    env = Environment(loader=FileSystemLoader("app/templates"))
    template = env.get_template("full_application.html")

    # Render the template with data
    html_content = template.render(**data)

    # Create temporary PDF output file
    with NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
        output_path = temp_file.name

    # PDFKit configuration - assumes wkhtmltopdf is in PATH
    options = {
        'page-size': 'A4',
        'encoding': "UTF-8",
        'margin-top': '10mm',
        'margin-bottom': '10mm',
        'margin-left': '12mm',
        'margin-right': '12mm',
        'no-outline': None,
    }

    pdfkit.from_string(html_content, output_path, options=options)
    return output_path
