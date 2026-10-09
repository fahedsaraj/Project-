"""Write captions, campaign overview, README and the ZIP for the AP campaign.
Course descriptions paraphrase the academy's own 19 Sep 2026 posts; no dates, prices or result claims."""
import csv, json, os, shutil, zipfile, pathlib
HERE = pathlib.Path(__file__).parent
data = json.load(open(HERE / 'campaign_data.json'))
T, S = data['TEACHERS'], data['SUBJECT']
PHONE = '+962 79 055 5890'

# What each course covers, from our original posts (EN, AR).
FOCUS = {
 'bio': ('the core concepts of AP Biology, with structured practice for the exam', 'المفاهيم الأساسية في الأحياء مع تدريب منظّم على الامتحان'),
 'envsci': ('environmental systems and their real-world impact, with exam-focused practice', 'الأنظمة البيئية وأثرها، مع تدريب مركّز على الامتحان'),
 'chem': ('a strong understanding of key concepts and confident problem-solving', 'فهم قوي للمفاهيم الأساسية ومهارات حل المسائل'),
 'physics1': ('deep conceptual understanding and problem-solving skills', 'فهم عميق للمفاهيم ومهارات حل المسائل'),
 'calc': ('the core ideas of Calculus, step by step, with exam practice', 'أساسيات التفاضل والتكامل خطوة بخطوة مع تدريب على الامتحان'),
 'precalc': ('a solid Precalculus foundation, explained clearly and practised for the exam', 'أساس متين في ما قبل التفاضل والتكامل، بشرح واضح وتدريب على الامتحان'),
 'cs': ('essential programming concepts, problem-solving strategies and exam technique', 'مفاهيم البرمجة الأساسية واستراتيجيات حل المشكلات وتقنيات الامتحان'),
 'englang': ('rhetorical analysis, persuasive argument and synthesis writing', 'التحليل البلاغي، والكتابة الإقناعية، ومقالات الـ Synthesis'),
 'englit': ('literary analysis, critical reading and essay writing', 'التحليل الأدبي، والقراءة النقدية، وكتابة المقالات'),
 'worldhist': ('historical connections and DBQ & SAQ writing strategies', 'الروابط التاريخية واستراتيجيات كتابة الـ DBQ والـ SAQ'),
 'psych': ('human behaviour, cognitive processes and psychological theories', 'السلوك الإنساني، والعمليات المعرفية، والنظريات النفسية'),
 'humgeo': ('spatial patterns, human impact and global processes', 'الأنماط المكانية، وأثر الإنسان، والعمليات العالمية'),
 'micro': ('strong economic concepts and sharp exam skills', 'مفاهيم اقتصادية قوية ومهارات حل أسئلة الامتحان'),
 'bpf': ('key business concepts and practical personal-finance skills', 'المفاهيم الأساسية في الأعمال ومهارات التمويل الشخصي العملية'),
}
AR_NAME = {'09_hosam-al-khalil': 'حسام الخليل'}
TAG = {'bio':'#APBiology','envsci':'#APEnvironmentalScience','chem':'#APChemistry','physics1':'#APPhysics1','calc':'#APCalculus',
 'precalc':'#APPrecalculus','cs':'#APComputerScience','englang':'#APEnglishLanguage','englit':'#APEnglishLiterature',
 'worldhist':'#APWorldHistory','psych':'#APPsychology','humgeo':'#APHumanGeography','micro':'#APMicroeconomics','bpf':'#APBusiness'}

def join_en(xs): return xs[0] if len(xs)==1 else ', '.join(xs[:-1]) + ' and ' + xs[-1]
def join_ar(xs): return xs[0] if len(xs)==1 else '، '.join(xs[:-1]) + ' و' + xs[-1]

def caption(t):
    ks = t['subjects']; en_names = [S[k][0] for k in ks]; ar_names = [f"{S[k][0]} ({S[k][1]})" for k in ks]
    ar_teacher = f"{t['ar']} {AR_NAME.get(t['id'], t['name'].split('. ',1)[1])}"
    ar = [f"تعرّفوا على {ar_teacher} 🎓", f"{'مادة' if len(ks)==1 else 'مواد'} {join_ar([S[k][0] for k in ks])} في United International Academy.", ""]
    for k in ks: ar.append(f"• {S[k][0]}: {FOCUS[k][1]}.")
    ar += ["", "حضوري في عمّان · أونلاين · حصص مسجّلة.", "للتسجيل أو أي استفسار، تواصلوا معنا:", f"📞 اتصال أو واتساب: {PHONE}", "📍 الطابق الرابع، خلدا، عمّان"]
    en = [f"Meet {t['name']}, your teacher for {join_en(en_names)} at United International Academy.", ""]
    for k in ks: en.append(f"• {S[k][0]}: {FOCUS[k][0]}.")
    en += ["", "In-person in Amman, online, or recorded: choose the way that works for you.", "To register or ask a question, get in touch:", f"Call or WhatsApp: {PHONE}", "Floor 4, Khalda, Amman"]
    tags = ' '.join(['#UnitedInternationalAcademy', '#UIA'] + [TAG[k] for k in ks][:2] + ['#APExams', '#Amman'])
    return '\n'.join(ar + ['', '—', ''] + en + ['', '(سابقاً Success 4Sure – خلدا · Formerly Success 4Sure – Khalda)', 'Shaping Global Minds.', tags]) + '\n'

INTRO = f"""دورات AP مع نفس الأساتذة، باسمنا الجديد 🎓
في United International Academy نقدّم {sum(len(t['subjects']) for t in T)} مادة AP مع {len(T)} أساتذة، في العلوم والرياضيات وعلوم الحاسوب واللغة الإنجليزية والعلوم الإنسانية والاقتصاد والأعمال.
تابعوا منشوراتنا القادمة لتتعرّفوا على كل أستاذ وموادّه.

حضوري في عمّان · أونلاين · حصص مسجّلة.
📞 اتصال أو واتساب: {PHONE}
📍 الطابق الرابع، خلدا، عمّان

—

Advanced Placement at United International Academy: the same AP teachers, under our new name.
We offer {sum(len(t['subjects']) for t in T)} AP subjects with {len(T)} teachers, across the sciences, mathematics, computer science, English, the humanities, economics and business.
Follow along: over the coming posts, you'll meet each teacher and their subjects.

In-person in Amman, online, or recorded.
Call or WhatsApp: {PHONE}
Floor 4, Khalda, Amman

(سابقاً Success 4Sure – خلدا · Formerly Success 4Sure – Khalda)
Shaping Global Minds.
#UnitedInternationalAcademy #UIA #APExams #AdvancedPlacement #Amman #Khalda
"""

ROOT = HERE / 'United_International_Academy_AP_Campaign'
if ROOT.exists(): shutil.rmtree(ROOT)
for d in ('Social_Media_Designs', 'Captions_Arabic_English', 'Campaign_Overview'): (ROOT / d).mkdir(parents=True)
rows = []
posts = [('00_AP-campaign-intro', 'Campaign intro', 'All 14 AP subjects', INTRO)] + \
        [(t['id'], t['name'], ' + '.join(S[k][0] for k in t['subjects']), caption(t)) for t in T]
for pid, who, subj, cap in posts:
    img = f'UIA_AP_{pid}_1080x1350.png'; capf = f'UIA_AP_{pid}_caption.txt'
    shutil.copy(HERE / 'Social_Media_Designs' / img, ROOT / 'Social_Media_Designs' / img)
    (ROOT / 'Captions_Arabic_English' / capf).write_text(f"POST: {img}\nTEACHER: {who}\nSUBJECTS: {subj}\n\n" + cap, encoding='utf-8')
    rows.append((pid[:2], who, subj, img, capf))
(ROOT / 'Captions_Arabic_English' / 'ALL_CAPTIONS.txt').write_text(
    '\n\n==========\n\n'.join((ROOT / 'Captions_Arabic_English' / r[4]).read_text(encoding='utf-8') for r in rows), encoding='utf-8')
with open(ROOT / 'Campaign_Overview' / 'AP_Campaign_Overview.csv', 'w', newline='', encoding='utf-8-sig') as f:
    w = csv.writer(f); w.writerow(['#', 'Teacher', 'AP subjects', 'Design file', 'Caption file']); w.writerows(rows)
md = ['# AP campaign overview: United International Academy', '', '| # | Teacher | AP subjects | Design | Caption |', '|---|---|---|---|---|']
md += [f'| {r[0]} | {r[1]} | {r[2]} | {r[3]} | {r[4]} |' for r in rows]
md += ['', '## Source & quality control', (HERE / 'QC_NOTES.md').read_text(encoding='utf-8')]
(ROOT / 'Campaign_Overview' / 'AP_Campaign_Overview.md').write_text('\n'.join(md) + '\n', encoding='utf-8')
(ROOT / 'README.txt').write_text(f"""UNITED INTERNATIONAL ACADEMY · AP CAMPAIGN (prepared 9 Oct 2026, for review and approval)

FOLDERS
- Social_Media_Designs/      {len(rows)} posts, 1080 x 1350 px (4:5), PNG, for Instagram and Facebook
- Captions_Arabic_English/   one caption file per post (Arabic + English) + ALL_CAPTIONS.txt
- Campaign_Overview/         teacher / subjects / files table (CSV + MD) and the source & QC notes

POSTS
""" + '\n'.join(f"{r[0]}  {r[1]:<26} {r[2]}" for r in rows) + f"""

RULES APPLIED
- One post per teacher; teachers with several AP subjects have them combined.
- No course dates, times, prices, discounts, deadlines or result claims.
- New name and official logo only; brand colours and fonts; phone {PHONE}.
- Nothing has been published. Suggested order: post 00 first, then one teacher post per day.

BEFORE PUBLISHING (see Campaign_Overview/AP_Campaign_Overview.md)
- Confirm the open points listed there with the academic team.
- Teacher photos: the originals you supplied, cut out and placed on the brand panel (no retouching). Confirm each teacher is happy with their photo.
""", encoding='utf-8')
zp = HERE / 'United_International_Academy_AP_Campaign.zip'
with zipfile.ZipFile(zp, 'w', zipfile.ZIP_DEFLATED) as z:
    for p in sorted(ROOT.rglob('*')):
        if p.is_file(): z.write(p, p.relative_to(HERE))
print('zip:', zp, round(zp.stat().st_size / 1e6, 2), 'MB,', len(rows), 'posts')
