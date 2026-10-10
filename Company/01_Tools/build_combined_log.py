"""Combine every agent log in 00_Activity_Logs into one PDF, organised by date.

Usage: python3 Company/01_Tools/build_combined_log.py
Output: Company/00_Activity_Logs/combined_activity_log.pdf
"""
import re
from collections import defaultdict
from datetime import datetime
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer

LOGS = Path(__file__).resolve().parent.parent / "00_Activity_Logs"
OUT = LOGS / "combined_activity_log.pdf"
BLUE, GOLD, CHARCOAL = HexColor("#29566C"), HexColor("#8F600C"), HexColor("#26292E")
ORDER = ["atlas", "quill", "lens", "spark", "keeper", "compass", "forge"]


def parse(path):
    """Return {date: [lines]} for one agent log."""
    entries, current = defaultdict(list), None
    for line in path.read_text(encoding="utf-8").splitlines():
        m = re.match(r"^## (\d{4}-\d{2}-\d{2})", line)
        if m:
            current = m.group(1)
        elif current and line.strip():
            entries[current].append(line.strip().lstrip("- ").strip())
    return entries


def esc(text):
    text = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    return re.sub(r"^(Done|In progress|Blocked / needs approval|Blocked|Next):", r"<b>\1:</b>", text)


def main():
    by_date = defaultdict(dict)
    agents = sorted((p for p in LOGS.glob("*.md") if p.name != "README.md"),
                    key=lambda p: ORDER.index(p.stem) if p.stem in ORDER else 99)
    for path in agents:
        for date, lines in parse(path).items():
            by_date[date][path.stem] = lines

    h1 = ParagraphStyle("h1", fontName="Helvetica-Bold", fontSize=18, leading=23, textColor=BLUE, spaceAfter=4)
    sub = ParagraphStyle("sub", fontName="Helvetica", fontSize=9, textColor=CHARCOAL, spaceAfter=10)
    h2 = ParagraphStyle("h2", fontName="Helvetica-Bold", fontSize=13, textColor=GOLD, spaceBefore=10, spaceAfter=4)
    h3 = ParagraphStyle("h3", fontName="Helvetica-Bold", fontSize=10.5, textColor=BLUE, spaceBefore=6, spaceAfter=2)
    body = ParagraphStyle("b", fontName="Helvetica", fontSize=9.5, leading=14, textColor=CHARCOAL, leftIndent=8)

    story = [Paragraph("United International Academy: Marketing Activity Log", h1),
             Paragraph(f"Combined from {len(agents)} agent logs · generated {datetime.now():%Y-%m-%d %H:%M}", sub)]
    for date in sorted(by_date, reverse=True):
        story.append(Paragraph(date, h2))
        for agent in sorted(by_date[date], key=lambda a: ORDER.index(a) if a in ORDER else 99):
            story.append(Paragraph(agent.capitalize(), h3))
            story += [Paragraph("• " + esc(line), body) for line in by_date[date][agent]]
        story.append(Spacer(1, 4))

    SimpleDocTemplate(str(OUT), pagesize=A4, leftMargin=20 * mm, rightMargin=20 * mm,
                      topMargin=18 * mm, bottomMargin=18 * mm,
                      title="UIA Marketing Activity Log").build(story)
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
