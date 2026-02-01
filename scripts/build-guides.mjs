import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

/**
 * Build HTML pages from /guides/*.md into /docs/guides/*.html
 *
 * Output:
 *  - guides/README.md -> docs/guides/index.html
 *  - all other guides/*.md -> docs/guides/<same-name>.html
 *  - docs/guides/guides.css (shared stylesheet)
 *
 * Requirements:
 *   npm i -D marked
 *
 * Features:
 * - Site-friendly links: rewrites relative *.md links -> *.html (README.md -> index.html)
 * - Index-page link styling: links to other guides become "guide tiles" (no changes needed to your .md)
 * - Global navigation: Brand + any "Guides" nav links go to /guides/index.html (not the folder)
 * - Custom guide ordering: Quickstart first, then a sensible progression
 *
 * Fixes in this version:
 * - De-bold "**Glossary:**" (and Audience/Scope) labels in markdown blocks
 * - Hide horizontal rules (<hr>) so stray markdown '---' doesn't show as a long line
 */

const inDir = "guides";
const outDir = path.join("docs", "guides");
const cssPath = path.join(outDir, "guides.css");

// Update these to match your project
const SITE_BASE = "https://derrickscottux-collab.github.io/github-issues-openapi-portfolio";
const REPO_URL = "https://github.com/derrickscottux-collab/github-issues-openapi-portfolio";
const REFERENCE_URL = `${SITE_BASE}/`;                    // Redoc output (docs/index.html)
const GUIDES_HOME_URL = `${SITE_BASE}/guides/index.html`; // IMPORTANT: link directly to index.html

// Top-left brand label (header)
const BRAND_LABEL = "GitHub Issues API Docs";

fs.mkdirSync(outDir, { recursive: true });

marked.setOptions({ gfm: true, breaks: false });

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function mdFileToHtmlFile(mdFile) {
  if (mdFile.toLowerCase() === "readme.md") return "index.html";
  return mdFile.replace(/\.md$/i, ".html");
}

function baseNameNoExt(p) {
  const b = p.split("/").pop() || p;
  return b.replace(/\.[^.]+$/i, "");
}

function toTitleCaseFromSlug(slug) {
  const cleaned = String(slug)
    .replace(/\.(md|html)$/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) return "Guide";

  return cleaned
    .split(" ")
    .map((w) => (w ? (w[0].toUpperCase() + w.slice(1)) : w))
    .join(" ");
}

// ---- CSS (generated every run) ----
const CSS = `
:root{
  --bg: #ffffff;
  --panel: #ffffff;
  --panel2: #f3f6fa;
  --text: #0b1220;
  --muted: #334155;

  --border: rgba(15,23,42,.14);
  --border2: rgba(15,23,42,.22);
  --shadow: 0 10px 28px rgba(15,23,42,.12);

  --link: #005bd1;
  --linkHover: #0048a8;

  --accent: #1f6feb;
  --accent2: #7c3aed;

  --codeBg: #0b1220;
  --codeText: #e6edf3;
  --codeBorder: rgba(15,23,42,.18);

  --g1: rgba(31,111,235,.12);
  --g2: rgba(124,58,237,.10);
  --g3: rgba(14,165,233,.07);

  --radius: 14px;
  --max: 1240px;
  --tocW: 260px;

  --font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, Arial, sans-serif;
  --mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

@media (prefers-color-scheme: dark){
  :root{
    --bg: #070b14;
    --panel: #0f172a;
    --panel2: #0b1324;
    --text: #eef2f7;
    --muted: #c1cbe0;

    --border: rgba(255,255,255,.12);
    --border2: rgba(255,255,255,.18);
    --shadow: 0 12px 34px rgba(0,0,0,.45);

    --link: #7db6ff;
    --linkHover: #a8d1ff;

    --accent: #79c0ff;
    --accent2: #c4b5fd;

    --codeBg: #050a14;
    --codeText: #eef2f7;
    --codeBorder: rgba(255,255,255,.14);

    --g1: rgba(121,192,255,.12);
    --g2: rgba(196,181,253,.09);
    --g3: rgba(34,211,238,.07);
  }
}

*{ box-sizing: border-box; }
html,body{ height:100%; }

body{
  margin:0;
  font-family: var(--font);
  background: var(--bg);
  color: var(--text);
  line-height: 1.7;
  font-size: 16.5px;
  position: relative;
  z-index: 0;
}

body::before{
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: -1;
  background:
    radial-gradient(900px 520px at 18% -12%, var(--g1), transparent 62%),
    radial-gradient(820px 540px at 92% 0%,  var(--g2), transparent 60%),
    radial-gradient(980px 760px at 52% 115%, var(--g3), transparent 62%);
  background-repeat: no-repeat;
}

/* Hide stray markdown horizontal rules (often caused by a line with '---') */
hr{ display: none; }

a{ color: var(--link); text-decoration: none; }
a:hover{ color: var(--linkHover); text-decoration: underline; }

.topbar{
  position: sticky;
  top: 0;
  z-index: 20;
  background: color-mix(in oklab, var(--bg) 94%, transparent);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(10px);
}

.topbarInner{
  max-width: var(--max);
  margin: 0 auto;
  padding: 12px 16px;
  display:flex;
  align-items:center;
  justify-content: space-between;
  gap: 12px;
}

.brand{
  display:flex;
  align-items:center;
  gap: 10px;
  font-weight: 750;
  color: var(--text);
  text-decoration: none;
  white-space: nowrap;
}

.brandMark{
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  box-shadow: 0 0 0 4px color-mix(in oklab, var(--accent) 14%, transparent);
}

.nav{
  display:flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items:center;
  justify-content: flex-end;
}

.nav a{
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid transparent;
  color: var(--text);
  opacity: .95;
  text-decoration: none;
}

.nav a:hover{
  border-color: var(--border2);
  background: color-mix(in oklab, var(--panel) 86%, transparent);
  text-decoration: none;
  opacity: 1;
}

.wrap{
  max-width: var(--max);
  margin: 0 auto;
  padding: 18px 16px 70px;
}

.headerCard{
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 18px 20px;
  margin-bottom: 14px;
}

.kicker{
  margin: 0 0 6px;
  color: var(--muted);
  font-size: 12.5px;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.h1{
  margin: 0 0 8px;
  font-size: 34px;
  letter-spacing: -0.02em;
  line-height: 1.18;
  font-weight: 780;
}

.sub{
  margin: 0;
  color: var(--muted);
  max-width: 105ch;
}

.layout{
  display:grid;
  grid-template-columns: var(--tocW) 1fr;
  gap: 14px;
  align-items: start;
}

@media (max-width: 1000px){
  .layout{ grid-template-columns: 1fr; }
}

.toc{
  position: sticky;
  top: 74px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 14px;
  min-width: 0;
}

@media (max-width: 1000px){
  .toc{ position: static; }
}

.tocTitle{
  font-weight: 750;
  margin: 0 0 10px;
  font-size: 14px;
  color: var(--text);
}

.tocSection{
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--border);
}

.tocItem{
  display:block;
  padding: 9px 10px;
  border-radius: 10px;
  border: 1px solid var(--border2);
  background: color-mix(in oklab, var(--panel2) 92%, transparent);
  color: var(--text);
  margin-bottom: 8px;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tocItem:hover{
  background: color-mix(in oklab, var(--panel2) 80%, transparent);
  border-color: color-mix(in oklab, var(--accent) 35%, var(--border2));
  text-decoration: none;
}

.tocItemSub{
  margin-left: 10px;
  font-size: 13px;
}

.content{
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 22px 24px;
  min-width: 0;
}

h1,h2,h3,h4{
  line-height: 1.26;
  letter-spacing: -0.01em;
  scroll-margin-top: 92px;
  color: var(--text);
}
h1{ font-size: 32px; margin: 10px 0 12px; font-weight: 780; }
h2{
  font-size: 24px;
  margin: 28px 0 12px;
  font-weight: 740;
  padding: 6px 0 6px 12px;
  border-left: 4px solid color-mix(in oklab, var(--accent) 80%, transparent);
  background: linear-gradient(90deg, color-mix(in oklab, var(--accent) 10%, transparent), transparent 70%);
  border-radius: 10px;
}
h3{ font-size: 20px; margin: 22px 0 10px; font-weight: 680; }
h4{ font-size: 16.5px; margin: 18px 0 8px; font-weight: 640; color: color-mix(in oklab, var(--text) 92%, var(--muted)); }

p{ margin: 10px 0; }
ul,ol{ padding-left: 22px; }
li{ margin: 6px 0; }

blockquote{
  margin: 14px 0;
  padding: 12px 14px;
  border-left: 4px solid color-mix(in oklab, var(--accent2) 70%, transparent);
  background: color-mix(in oklab, var(--panel2) 86%, transparent);
  border-radius: 12px;
  color: var(--muted);
}

code{ font-family: var(--mono); font-size: 0.95em; }
p code, li code{
  padding: 2px 6px;
  border: 1px solid var(--border2);
  border-radius: 8px;
  background: color-mix(in oklab, var(--panel2) 92%, transparent);
}

pre{
  margin: 14px 0;
  padding: 12px 14px;
  overflow: auto;
  background: var(--codeBg);
  color: var(--codeText);
  border: 1px solid var(--codeBorder);
  border-radius: 12px;
}
pre code{ padding: 0; background: transparent; border: none; color: inherit; }

/* Permalinks */
.hlink{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  margin-left: 10px;
  border-radius: 8px;
  border: 1px solid transparent;
  opacity: 0;
  transform: translateY(-1px);
  text-decoration: none;
  color: color-mix(in oklab, var(--text) 72%, var(--muted));
}
h2:hover .hlink, h3:hover .hlink, h4:hover .hlink{ opacity: .95; }
.hlink:hover{
  border-color: var(--border2);
  background: color-mix(in oklab, var(--panel2) 90%, transparent);
  text-decoration: none;
  color: var(--text);
}
.hlink svg{ width: 14px; height: 14px; fill: currentColor; }

/* Index page: guide tiles */
.guidesIndexLinks{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 10px;
  margin: 14px 0 6px;
  padding: 0;
  list-style: none;
}
.guidesIndexLinks li{ margin: 0; }
a.guideTile{
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 12px;
  border-radius: 12px;
  border: 1px solid var(--border2);
  background: color-mix(in oklab, var(--panel2) 92%, transparent);
  color: var(--text);
  text-decoration: none;
}
a.guideTile:hover{
  border-color: color-mix(in oklab, var(--accent) 35%, var(--border2));
  background: color-mix(in oklab, var(--panel2) 80%, transparent);
  text-decoration: none;
}
a.guideTile .tileMeta{
  display:flex;
  flex-direction: column;
  min-width: 0;
}
a.guideTile .tileTitle{
  font-weight: 720;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
a.guideTile .tileHint{
  color: var(--muted);
  font-size: 12.5px;
}
a.guideTile .tileArrow{
  opacity: .85;
  flex: 0 0 auto;
}

.pager{
  display:flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 22px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

.pager a{
  display:inline-flex;
  align-items:center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid var(--border2);
  background: color-mix(in oklab, var(--panel2) 92%, transparent);
  color: var(--text);
  max-width: 48%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pager a:hover{
  border-color: color-mix(in oklab, var(--accent) 35%, var(--border2));
  background: color-mix(in oklab, var(--panel2) 80%, transparent);
  text-decoration: none;
}

.foot{
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid var(--border);
  color: var(--muted);
  font-size: 13px;
}
`;

fs.writeFileSync(cssPath, CSS, "utf8");

// ---- Marked renderer (supports old + new APIs) ----
const renderer = new marked.Renderer();
const usedIds = new Map();

function uniqueId(base) {
  const n = usedIds.get(base) ?? 0;
  usedIds.set(base, n + 1);
  return n === 0 ? base : `${base}-${n + 1}`;
}

const LINK_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.59 13.41a1 1 0 0 1 0-1.41l3.59-3.59a3 3 0 1 1 4.24 4.24l-2.12 2.12a1 1 0 1 1-1.41-1.41l2.12-2.12a1 1 0 1 0-1.41-1.41l-3.59 3.59a1 1 0 0 1-1.41 0Z"/><path d="M13.41 10.59a1 1 0 0 1 0 1.41l-3.59 3.59a3 3 0 1 1-4.24-4.24l2.12-2.12a1 1 0 1 1 1.41 1.41l-2.12 2.12a1 1 0 1 0 1.41 1.41l3.59-3.59a1 1 0 0 1 1.41 0Z"/></svg>`;

function headingHtml({ level, htmlText, plainText }) {
  const base = slugify(plainText) || `section-${level}`;
  const id = uniqueId(base);
  if (level >= 2 && level <= 4) {
    return `<h${level} id="${id}">${htmlText}<a class="hlink" href="#${id}" aria-label="Permalink">${LINK_ICON}</a></h${level}>`;
  }
  return `<h${level} id="${id}">${htmlText}</h${level}>`;
}

renderer.heading = function (textOrToken, levelMaybe, rawMaybe) {
  if (textOrToken && typeof textOrToken === "object") {
    const token = textOrToken;
    const level = token.depth ?? token.level ?? 2;
    let htmlText = "";
    if (this.parser && token.tokens) htmlText = this.parser.parseInline(token.tokens);
    else if (typeof token.text === "string") htmlText = escapeHtml(token.text);
    else htmlText = escapeHtml(String(token.raw ?? ""));
    const plainText = typeof token.text === "string"
      ? token.text
      : String(token.raw ?? "").replace(/[#\n]/g, " ").trim();
    return headingHtml({ level, htmlText, plainText });
  }
  const level = Number(levelMaybe) || 2;
  const htmlText = typeof textOrToken === "string" ? textOrToken : escapeHtml(String(textOrToken ?? ""));
  const plainText = typeof rawMaybe === "string" ? rawMaybe : String(htmlText).replace(/<[^>]+>/g, "");
  return headingHtml({ level, htmlText, plainText });
};

marked.use({ renderer });

// ---- Preprocess markdown ----
function normalizeMarkdown(md) {
  const trimmed = md.replace(/^\uFEFF/, "");
  const lines = trimmed.split("\n");
  const firstNonEmptyIdx = lines.findIndex((l) => l.trim().length > 0);
  if (firstNonEmptyIdx === -1) return md;

  const first = lines[firstNonEmptyIdx].trim();
  const hasHeadingEarly = /^#{1,6}\s+/.test(first);
  if (!hasHeadingEarly) lines[firstNonEmptyIdx] = `# ${first}`;

  // Remove bold formatting on specific label patterns you used in footers/blocks.
  return lines
    .join("\n")
    .replace(/\*\*(Audience|Scope|Glossary)\:\*\*/g, "$1:");
}

// ---- Rewrite relative links in HTML and optionally add classes ----
function rewriteLinks(html, { isIndex } = { isIndex: false }) {
  return html.replace(/<a\b([^>]*?)href="([^"]+)"([^>]*)>/g, (m, pre, href, post) => {
    const h = String(href);

    if (h.startsWith("http://") || h.startsWith("https://") || h.startsWith("mailto:") || h.startsWith("#")) {
      return m;
    }

    const [baseAndMaybeQuery, frag] = h.split("#");
    const [base0, query] = baseAndMaybeQuery.split("?");

    let base = base0;
    if (base.startsWith("./")) base = base.slice(2);

    if (base.toLowerCase().endsWith("readme.md")) base = base.replace(/readme\.md$/i, "index.html");
    else if (base.toLowerCase().endsWith(".md")) base = base.replace(/\.md$/i, ".html");

    if (!base.startsWith("/") && !base.startsWith("../")) base = `./${base}`;

    const rebuilt = base + (query ? `?${query}` : "") + (frag ? `#${frag}` : "");

    if (isIndex && rebuilt.startsWith("./") && rebuilt.toLowerCase().endsWith(".html") && rebuilt.toLowerCase() !== "./index.html") {
      const hasClass = /\bclass="/.test(pre + post);
      if (hasClass) {
        return `<a${pre}href="${rebuilt}"${post}>`.replace(/\bclass="([^"]*)"/, (mm, cls) => `class="${cls} guideTile"`);
      }
      return `<a${pre}href="${rebuilt}" class="guideTile"${post}>`;
    }

    return `<a${pre}href="${rebuilt}"${post}>`;
  });
}

// Index-only: wrap the first guide link list into tiles, and normalize tile titles (no dashes/extensions).
function enhanceIndexLists(html) {
  const ulMatch = html.match(/<ul>([\s\S]*?)<\/ul>/i);
  if (!ulMatch) return html;

  const ul = ulMatch[0];
  const countTiles = (ul.match(/\bclass="[^"]*\bguideTile\b[^"]*"/g) || []).length;
  if (countTiles < 2) return html;

  let transformed = ul.replace(/<ul>/i, '<ul class="guidesIndexLinks">');

  transformed = transformed.replace(/<a\b([^>]*\bclass="[^"]*\bguideTile\b[^"]*"[^>]*)>([\s\S]*?)<\/a>/gi, (m, attrs) => {
    const hrefMatch = attrs.match(/\bhref="([^"]+)"/i);
    const href = hrefMatch ? hrefMatch[1] : "";
    const file = baseNameNoExt(href);
    const nice = toTitleCaseFromSlug(file);

    return `<a ${attrs}>
      <span class="tileMeta">
        <span class="tileTitle">${escapeHtml(nice)}</span>
        <span class="tileHint">Open guide</span>
      </span>
      <span class="tileArrow" aria-hidden="true">→</span>
    </a>`.replace(/\s+/g, " ").trim();
  });

  return html.replace(ul, transformed);
}

function buildTocFromMarkdown(md) {
  const lines = md.split("\n");
  const items = [];
  for (const line of lines) {
    const m = /^(#{2,3})\s+(.*)$/.exec(line.trim());
    if (!m) continue;
    const level = m[1].length;
    const text = m[2].replace(/\s+#.*$/, "").trim();
    const id = slugify(text);
    items.push({ level, text, id });
  }
  if (!items.length) return "";
  return items
    .map((it) => {
      const cls = it.level === 3 ? "tocItem tocItemSub" : "tocItem";
      return `<a class="${cls}" href="#${it.id}">${escapeHtml(it.text)}</a>`;
    })
    .join("\n");
}

// ---- Custom order (Quickstart first, then a sensible flow) ----
const PREFERRED_ORDER = [
  "quickstart.md",
  "pagination-and-filters.md",
  "errors-and-troubleshooting.md",
  "support-checklist.md"
];

function orderedMdFiles(allMd) {
  const lower = allMd.map((f) => f);
  const picked = [];
  const remaining = new Set(lower);

  for (const name of PREFERRED_ORDER) {
    const match = lower.find((f) => f.toLowerCase() === name);
    if (match) {
      picked.push(match);
      remaining.delete(match);
    }
  }

  const readme = lower.find((f) => f.toLowerCase() === "readme.md");
  if (readme && remaining.has(readme)) remaining.delete(readme);

  const rest = Array.from(remaining).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
  return { readme, guides: [...picked, ...rest] };
}

const mdFiles = fs.readdirSync(inDir).filter((f) => f.endsWith(".md"));
const { readme: readmeFile, guides: orderedGuideMd } = orderedMdFiles(mdFiles);

function pageFromMd(mdFile) {
  const mdRaw = fs.readFileSync(path.join(inDir, mdFile), "utf8");
  const md = normalizeMarkdown(mdRaw);
  const firstH1 = md.split("\n").find((l) => l.startsWith("# "));
  const title = firstH1 ? firstH1.replace("# ", "").trim() : toTitleCaseFromSlug(mdFile);
  const htmlFile = mdFileToHtmlFile(mdFile);
  return { mdFile, htmlFile, title };
}

const indexPage = readmeFile ? pageFromMd(readmeFile) : { mdFile: "README.md", htmlFile: "index.html", title: "Guides" };
const guidePages = orderedGuideMd.map(pageFromMd);
const pagesForBuild = [indexPage, ...guidePages];

function buildOtherGuidesNav(currentHtmlFile) {
  const homeLink = `<a class="tocItem" href="./index.html" title="Guides home">Guides home</a>`;
  const links = guidePages
    .filter((p) => p.htmlFile !== currentHtmlFile)
    .map((p) => `<a class="tocItem" href="./${p.htmlFile}" title="${escapeHtml(p.title)}">${escapeHtml(p.title)}</a>`)
    .join("\n");

  return `<div class="tocSection">
    <div class="tocTitle">Guides</div>
    ${homeLink}
    ${links || ""}
  </div>`;
}

function buildPagerFor(htmlFile) {
  if (htmlFile.toLowerCase() === "index.html") {
    const first = guidePages[0];
    if (!first) return "";
    return `<nav class="pager" aria-label="Guide navigation"><span></span><a href="./${first.htmlFile}" title="${escapeHtml(first.title)}">${escapeHtml(first.title)} →</a></nav>`;
  }

  const idx = guidePages.findIndex((p) => p.htmlFile === htmlFile);
  if (idx === -1) return "";

  const prev = idx > 0 ? guidePages[idx - 1] : null;
  const next = idx < guidePages.length - 1 ? guidePages[idx + 1] : null;

  const left = prev
    ? `<a href="./${prev.htmlFile}" title="${escapeHtml(prev.title)}">← ${escapeHtml(prev.title)}</a>`
    : `<a href="./index.html" title="Guides home">← Guides home</a>`;

  const right = next
    ? `<a href="./${next.htmlFile}" title="${escapeHtml(next.title)}">${escapeHtml(next.title)} →</a>`
    : `<span></span>`;

  return `<nav class="pager" aria-label="Guide navigation">${left}${right}</nav>`;
}

function wrapper({ title, bodyHtml, tocHtml, otherGuidesHtml, pagerHtml }) {
  const fullTitle = `${title} · Guides`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light dark" />
  <title>${escapeHtml(fullTitle)}</title>
  <link rel="stylesheet" href="./guides.css" />
</head>
<body>
  <header class="topbar">
    <div class="topbarInner">
      <a class="brand" href="${GUIDES_HOME_URL}">
        <span class="brandMark" aria-hidden="true"></span>
        <span>${escapeHtml(BRAND_LABEL)}</span>
      </a>
      <nav class="nav" aria-label="Primary">
        <a href="${REFERENCE_URL}">Reference</a>
        <a href="${GUIDES_HOME_URL}">Guides</a>
        <a href="${REPO_URL}" target="_blank" rel="noreferrer">Repo</a>
      </nav>
    </div>
  </header>

  <div class="wrap">
    <section class="headerCard">
      <p class="kicker">Portfolio guides</p>
      <div class="h1">${escapeHtml(title)}</div>
      <p class="sub">Task-focused guides that complement the OpenAPI reference docs (Redoc).</p>
    </section>

    <div class="layout">
      <aside class="toc" aria-label="Navigation">
        <div class="tocTitle">On this page</div>
        <div>
          ${tocHtml || `<a class="tocItem" href="./index.html">Guides home</a>`}
        </div>
        ${otherGuidesHtml}
      </aside>

      <main class="content">
        ${bodyHtml}
        ${pagerHtml}
        <div class="foot">Generated from <code>${escapeHtml(inDir)}/</code> into <code>${escapeHtml(outDir)}/</code>.</div>
      </main>
    </div>
  </div>
</body>
</html>`;
}

for (const page of pagesForBuild) {
  const mdPath = path.join(inDir, page.mdFile);
  const mdRaw = fs.existsSync(mdPath) ? fs.readFileSync(mdPath, "utf8") : "";
  const md = normalizeMarkdown(mdRaw);

  usedIds.clear();

  const tocHtml = buildTocFromMarkdown(md);
  let htmlBody = marked.parse(md);

  const isIndex = page.htmlFile.toLowerCase() === "index.html";
  htmlBody = rewriteLinks(htmlBody, { isIndex });
  if (isIndex) htmlBody = enhanceIndexLists(htmlBody);

  const otherGuidesHtml = buildOtherGuidesNav(page.htmlFile);
  const pagerHtml = buildPagerFor(page.htmlFile);

  fs.writeFileSync(
    path.join(outDir, page.htmlFile),
    wrapper({
      title: page.title,
      bodyHtml: htmlBody,
      tocHtml,
      otherGuidesHtml,
      pagerHtml
    }),
    "utf8"
  );
}

console.log(`Built ${pagesForBuild.length} page(s) into ${outDir}`);
console.log(`Wrote shared stylesheet: ${cssPath}`);