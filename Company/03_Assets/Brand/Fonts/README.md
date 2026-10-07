# Brand fonts (local copies for rendering)

- **Archivo** (variable width/weight) and **Newsreader** are the brand fonts named in the guidelines (§12).
- **IBM Plex Sans Arabic** is a **proposed** Arabic pairing (the guidelines define no Arabic font). It needs Fahed's approval; see open decision D-06.
- All three are from Google Fonts under the SIL Open Font License 1.1, which allows bundling.
- `fonts-local.css` loads them for the design generator in `01_Tools/brand_assets/`.
- **static/**: Archivo static cuts (Regular, SemiBold, SemiBold Expanded) instanced from the variable font for print PDFs, so they embed as TrueType rather than Type 3.
