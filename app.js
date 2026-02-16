import { DB } from "./data/index.js";

const qEl = document.getElementById("q");
const posEl = document.getElementById("pos");
const levelEl = document.getElementById("level");
const clearEl = document.getElementById("clear");
const resultsEl = document.getElementById("results");
const statsEl = document.getElementById("stats");

function flattenDB() {
  const out = [];
  for (const pos of ["verbs", "nouns", "adjectives"]) {
    for (const level of ["A1","A2","B1","B2","C1","C2"]) {
      const arr = DB[pos][level] || [];
      for (const item of arr) out.push({ pos, level, item });
    }
  }
  return out;
}
const ALL = flattenDB();

function matches(entry, query) {
  if (!query) return true;
  const needles = query.toLowerCase().split(/\s+/).filter(Boolean);
  const it = entry.item;

  const fields = [
    it.base,
    ...(it.translations || []),
    ...(it.derived || []),
    it.past,
    it.participle,
    it.plural,
    it.comparative,
    it.superlative,
    ...(it.varieties || []).flatMap(v => [v.variant, v.explanation, ...(v.examples || [])])
  ].filter(Boolean).join(" • ").toLowerCase();

  return needles.every(n => fields.includes(n));
}

function renderCard({ pos, level, item }) {
  if (pos === "verbs") {
    const varieties = (item.varieties || []).map(v => `
      <li>
        <div><b>${v.variant}</b> ${v.prepositions?.length ? `<span class="badge">${v.prepositions.join(", ")}</span>` : ""}</div>
        <div class="small muted">${v.explanation || ""}</div>
        ${v.examples?.length ? `<div class="small">e.g. ${v.examples.join(" / ")}</div>` : ""}
      </li>
    `).join("");

    return `
      <article class="card">
        <h3>${item.base} <span class="badge">verb • ${level}</span></h3>
        <div class="muted small">
          <div><b>Past:</b> ${item.past || "—"} • <b>Participle:</b> ${item.participle || "—"}</div>
          <div><b>EN:</b> ${(item.translations || []).join(", ") || "—"}</div>
          <div><b>Derived:</b> ${(item.derived || []).join(", ") || "—"}</div>
        </div>
        ${varieties ? `<ul class="list">${varieties}</ul>` : ""}
      </article>
    `;
  }

  if (pos === "nouns") {
    return `
      <article class="card">
        <h3>${item.base} <span class="badge">noun • ${level}</span></h3>
        <div class="muted small"><b>Plural:</b> ${item.plural || "—"}</div>
        <div class="muted small"><b>EN:</b> ${(item.translations || []).join(", ") || "—"}</div>
      </article>
    `;
  }

  return `
    <article class="card">
      <h3>${item.base} <span class="badge">adjective • ${level}</span></h3>
      <div class="muted small"><b>Comparative:</b> ${item.comparative || "—"} • <b>Superlative:</b> ${item.superlative || "—"}</div>
      <div class="muted small"><b>EN:</b> ${(item.translations || []).join(", ") || "—"}</div>
    </article>
  `;
}

function rerender() {
  const q = qEl.value.trim();
  const pos = posEl.value;
  const level = levelEl.value;

  const filtered = ALL.filter(e => {
    if (pos !== "all" && e.pos !== pos) return false;
    if (level !== "all" && e.level !== level) return false;
    return matches(e, q);
  });

  statsEl.textContent = `${filtered.length} / ${ALL.length} items`;
  resultsEl.innerHTML = filtered.map(renderCard).join("") || `<div class="muted">No results.</div>`;
}

[qEl, posEl, levelEl].forEach(el => el.addEventListener("input", rerender));
clearEl.addEventListener("click", () => { qEl.value = ""; posEl.value = "all"; levelEl.value = "all"; rerender(); });
rerender();
