import os
import fitz
import zipfile
import xml.etree.ElementTree as ET

base_dir = r"d:\1.Antigravity Projects\11_XRD_Analysis_Research_Review\docs"
output_txt = r"d:\1.Antigravity Projects\11_XRD_Analysis_Research_Review\docs_summary.txt"

def read_docx(path):
    try:
        with zipfile.ZipFile(path) as z:
            xml_content = z.read("word/document.xml")
            tree = ET.fromstring(xml_content)
            paragraphs = []
            for p in tree.iter("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p"):
                texts = [node.text for node in p.iter("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t") if node.text]
                if texts:
                    paragraphs.append("".join(texts))
            return "\n".join(paragraphs)
    except Exception as e:
        return f"Error reading docx: {e}"

with open(output_txt, "w", encoding="utf-8") as out:
    def log(msg=""):
        out.write(str(msg) + "\n")

    # 1. Inspect Presentation Slides PDF
    slides_pdf = os.path.join(base_dir, "210494D_Presentation_Slides.pdf")
    if os.path.exists(slides_pdf):
        doc = fitz.open(slides_pdf)
        log("=" * 60)
        log(f"PRESENTATION SLIDES: {len(doc)} pages")
        for i, page in enumerate(doc):
            log(f"\n--- SLIDE {i+1} ---")
            log(page.get_text().strip())

    # 2. Inspect Case Study PDF
    case_pdf = os.path.join(base_dir, "XRD_CaseStudy_210494D.pdf")
    if os.path.exists(case_pdf):
        doc = fitz.open(case_pdf)
        log("\n" + "=" * 60)
        log(f"CASE STUDY: {len(doc)} pages")
        for i, page in enumerate(doc):
            log(f"\n--- CASE STUDY PAGE {i+1} ---")
            log(page.get_text().strip())

    # 3. Inspect Durability Paper PDF
    durability_pdf = os.path.join(base_dir, "Durability_of_Paper_Postprint.pdf")
    if os.path.exists(durability_pdf):
        doc = fitz.open(durability_pdf)
        log("\n" + "=" * 60)
        log(f"DURABILITY PAPER: {len(doc)} pages")
        for i in range(min(5, len(doc))):
            log(f"\n--- DURABILITY PAPER PAGE {i+1} ---")
            log(doc[i].get_text()[:1200].strip())

    # 4. Inspect DOCX files
    obj_docx = os.path.join(base_dir, "Research_Objective_and_Findings.docx")
    if os.path.exists(obj_docx):
        log("\n" + "=" * 60)
        log("RESEARCH OBJECTIVE AND FINDINGS:")
        log(read_docx(obj_docx))

    pattern_docx = os.path.join(base_dir, "XRD_Pattern_to_Crystallinity.docx")
    if os.path.exists(pattern_docx):
        log("\n" + "=" * 60)
        log("XRD PATTERN TO CRYSTALLINITY:")
        log(read_docx(pattern_docx))

print("Inspection completed.")
