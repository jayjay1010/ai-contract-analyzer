const API_BASE = "http://127.0.0.1:3000";
const el = (id) => document.getElementById(id);

el("apiBaseLabel").textContent = API_BASE;

const contractText = el("contractText");
const analyzeBtn = el("analyzeBtn");
const loadSampleBtn = el("loadSampleBtn");
const statusEl = el("status");
const results = el("results");
const summaryEl = el("summary");
const keyTermsEl = el("keyTerms");
const riskScoreEl = el("riskScore");
const risksEl = el("risks");
const questionsEl = el("questions");
const disclaimerEl = el("disclaimer");

function setStatus(msg){
  statusEl.textContent = msg || "";
}

function setLoading(isLoading){
  analyzeBtn.disabled = isLoading;
  loadSampleBtn.disabled = isLoading;
  analyzeBtn.textContent = isLoading ? "Analyzing..." : "Analyze";
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderKeyTerms(keyTerms) {
  keyTermsEl.innerHTML = "";

  const rows = [
    ["Parties", (keyTerms.parties || []).join(", ") || "Not specified"],
    ["Effective date", keyTerms.effective_date || "Not specified"],
    ["Term", keyTerms.term || "Not specified"],
    ["Payment", keyTerms.payment || "Not specified"],
    ["Termination", keyTerms.termination || "Not specified"],
    ["Governing law", keyTerms.governing_law || "Not specified"],
  ];

  for (const [k, v] of rows) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${k}:</strong> ${escapeHtml(v)}`;
    keyTermsEl.appendChild(li);
  }
}

function renderRisks(risks){
  risksEl.innerHTML = "";

  if(!risks || risks.length === 0){
    risksEl.innerHTML = `<p class="muted">No major risks detected (or not enough info).</p>`;
    return;
  }

  for (const r of risks) {
    const div = document.createElement("div");
    div.className = "risk";
    div.innerHTML = `
      <div class="top">
        <strong>${escapeHtml(r.title)}</strong>
        <span class="badge">${escapeHtml(r.severity)}</span>
      </div>
      <p class="muted">${escapeHtml(r.rationale)}</p>
      ${r.suggested_fix ? `<p><strong>Suggested fix:</strong> ${escapeHtml(r.suggested_fix)}</p>` : ""}
    `;
    risksEl.appendChild(div);
  }
}

function renderQuestions(questions) {
  questionsEl.innerHTML = "";
  for (const q of questions || []) {
    const li = document.createElement("li");
    li.textContent = q;
    questionsEl.appendChild(li);
  }
}
//
async function analyze() {
  const text = contractText.value.trim();

  if (text.length < 20) {
    setStatus("Paste a bit more contract text first.");
    return;
  }

  setStatus("");
  setLoading(true);

  try {
    const res = await fetch(`${API_BASE}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.detail || `Request failed (${res.status})`);

    results.classList.remove("hidden");

    summaryEl.textContent = data.summary || "";
    riskScoreEl.textContent =
    typeof data.risk_score === "number" ? String(data.risk_score) : "";
    disclaimerEl.textContent = data.disclaimer || "";

    renderKeyTerms(data.key_terms || {});
    renderRisks(data.risks || []);
    renderQuestions(data.questions || []);

    setStatus("Done.");
  } catch (err) {
    setStatus(`Error: ${err.message}`);
  } finally {
    setLoading(false);
  }
}
//
function loadSample() {
  contractText.value = `SERVICE AGREEMENT

This Service Agreement ("Agreement") is entered into on January 1, 2026, between ABC Digital Solutions LLC ("Service Provider") and John Smith ("Client").

Payment: $12,000 total; 50% upfront and 50% upon completion. Late payments incur 5% monthly interest.
Term: 12 months.
Termination: Either party may terminate with 30 days written notice; immediate termination for non-payment.
Governing Law: California.
Liability limited to fees paid; no consequential damages.
Client indemnifies Service Provider for claims arising from Client content.`;

  setStatus("Sample loaded. Click Analyze.");
}

// Attach handlers (guarded so it doesn't crash if IDs ever change)
if (analyzeBtn) analyzeBtn.addEventListener("click", analyze);
if (loadSampleBtn) loadSampleBtn.addEventListener("click", loadSample);