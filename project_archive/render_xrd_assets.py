import os
import fitz

base_dir = r"d:\1.Antigravity Projects\11_XRD_Analysis_Research_Review"
slides_pdf = os.path.join(base_dir, "docs", "210494D_Presentation_Slides.pdf")
case_pdf = os.path.join(base_dir, "docs", "XRD_CaseStudy_210494D.pdf")
durability_pdf = os.path.join(base_dir, "docs", "Durability_of_Paper_Postprint.pdf")

slides_out = os.path.join(base_dir, "rendered_slides")
case_out = os.path.join(base_dir, "rendered_case_study")

os.makedirs(slides_out, exist_ok=True)
os.makedirs(case_out, exist_ok=True)

# Render 6 presentation slides at 200 DPI
doc_slides = fitz.open(slides_pdf)
print(f"Rendering {len(doc_slides)} presentation slides...")
for i, page in enumerate(doc_slides):
    pix = page.get_pixmap(dpi=200)
    out_path = os.path.join(slides_out, f"slide_{i+1:02d}.png")
    pix.save(out_path)
    print(f"Saved {out_path}")

# Render 10 case study pages at 180 DPI
doc_case = fitz.open(case_pdf)
print(f"Rendering {len(doc_case)} case study pages...")
for i, page in enumerate(doc_case):
    pix = page.get_pixmap(dpi=180)
    out_path = os.path.join(case_out, f"case_page_{i+1:02d}.png")
    pix.save(out_path)
    print(f"Saved {out_path}")

print("Rendering completed!")
