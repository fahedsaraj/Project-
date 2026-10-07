"""Rebuild UIA logo lockups as vector SVG.

Symbol: traced from the raster in the brand guidelines (trace_symbol.py).
Wordmark: the original Archivo glyph outlines, lifted from the guidelines PDF
(pdftocairo -svg), so letterforms and spacing match the approved artwork.
"""
import re, sys, json

def glyph_defs(svg):
    return dict(re.findall(r'<g id="(glyph-[\d-]+)">\s*<path d="([^"]*)"', svg))

def uses_in(svg, x0, y0, x1, y1):
    body = svg[svg.index('</defs>'):]
    out = []
    for gid, x, y in re.findall(r'<use xlink:href="#(glyph-[\d-]+)" x="([\d.]+)" y="([\d.]+)"/>', body):
        x, y = float(x), float(y)
        if x0 <= x <= x1 and y0 <= y <= y1:
            out.append((gid, x, y))
    return out

def symbol_paths(traced):
    return dict(re.findall(r'<path id="(gold|blue)"[^>]* d="([^"]*)"', traced))

def lockup(page_svg, traced, sym_matrix, region):
    g = glyph_defs(page_svg)
    a, _, _, d, e, f = sym_matrix
    sym = symbol_paths(traced)
    parts = {
        'gold': f'<path fill="{{gold}}" fill-rule="evenodd" transform="matrix({a} 0 0 {d} {e} {f})" d="{sym["gold"]}"/>',
        'accent': f'<path fill="{{accent}}" fill-rule="evenodd" transform="matrix({a} 0 0 {d} {e} {f})" d="{sym["blue"]}"/>',
        'word': ''.join(f'<path fill="{{word}}" transform="translate({x} {y})" d="{g[gid]}"/>' for gid, x, y in uses_in(page_svg, *region)),
    }
    return parts

if __name__ == '__main__':
    cfg = json.load(open(sys.argv[1]))
    traced = open(cfg['traced']).read()
    result = {}
    for name, spec in cfg['lockups'].items():
        page = open(spec['page']).read()
        result[name] = lockup(page, traced, spec['matrix'], spec['region']) if spec.get('region') else {
            'gold': lockup(page, traced, spec['matrix'], (0, 0, 0, 0))['gold'],
            'accent': lockup(page, traced, spec['matrix'], (0, 0, 0, 0))['accent'], 'word': ''}
    json.dump(result, open(sys.argv[2], 'w'))
    print({k: len(v['word']) for k, v in result.items()})
