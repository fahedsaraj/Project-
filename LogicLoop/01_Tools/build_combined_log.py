"""Combine every agent log in 00_Activity_Logs into one file.

Writes Combined_Log.md and Combined_Log.html (open in a browser and Print -> Save as PDF).
If reportlab is installed, also writes Combined_Log.pdf directly.
"""
import html
from datetime import date
from pathlib import Path

LOGS = Path(__file__).resolve().parent.parent / "00_Activity_Logs"
SKIP = {"Combined_Log.md"}


def main():
    parts = [f"# Logic Loop — Combined Activity Log\n\nGenerated {date.today().isoformat()}\n"]
    for log in sorted(LOGS.glob("*.md")):
        if log.name in SKIP:
            continue
        parts.append(log.read_text(encoding="utf-8").strip())
    text = "\n\n---\n\n".join(parts) + "\n"

    (LOGS / "Combined_Log.md").write_text(text, encoding="utf-8")
    body = html.escape(text)
    (LOGS / "Combined_Log.html").write_text(
        "<!doctype html><meta charset='utf-8'><title>Logic Loop Combined Log</title>"
        f"<pre style='font-family:sans-serif;white-space:pre-wrap'>{body}</pre>",
        encoding="utf-8",
    )

    try:
        from reportlab.lib.pagesizes import A4
        from reportlab.lib.styles import getSampleStyleSheet
        from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer
    except ImportError:
        print("Wrote Combined_Log.md and Combined_Log.html (install reportlab for a direct PDF).")
        return

    style = getSampleStyleSheet()["BodyText"]
    story = []
    for line in text.splitlines():
        story.append(Paragraph(html.escape(line), style) if line.strip() else Spacer(1, 6))
    SimpleDocTemplate(str(LOGS / "Combined_Log.pdf"), pagesize=A4).build(story)
    print("Wrote Combined_Log.md, Combined_Log.html and Combined_Log.pdf.")


if __name__ == "__main__":
    main()
