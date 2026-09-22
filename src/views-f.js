/* =====================================================================
   views-f.js -- ES6 allowed (same rule as views-d/e)
   VIEWS.docstudio -- Document Studio: upload, read, study
   VIEWS.resume    -- Resume / Writing Analyzer
   ===================================================================== */

/* DOCSTUDIO */
VIEWS.docstudio = {
  _activeIdx: -1,

  render: function(el) {
    var self = this;
    var docs = STORE.get("docs") || [];
    var activeDoc = self._activeIdx >= 0 ? docs[self._activeIdx] : null;

    var docListHtml = "";
    if (docs.length === 0) {
      docListHtml = "<p class=\"ds-empty\">No documents yet.<br>Upload a file or paste text below.</p>";
    } else {
      for (var i = 0; i < docs.length; i++) {
        var d = docs[i];
        var iact = self._activeIdx === i ? " active" : "";
        docListHtml += "<div class=\"ds-doc-item" + iact + "\" data-idx=\"" + i + "\">" +
          "<span class=\"ds-doc-icon\">📄</span>" +
          "<span class=\"ds-doc-name\">" + _escF(d.title) + "</span>" +
          "<button class=\"ds-doc-delete\" data-del=\"" + i + "\" title=\"Remove\">&#215;</button>" +
          "</div>";
      }
    }

    var readerHtml = activeDoc ? _renderDocReader(activeDoc) :
      "<div class=\"ds-no-doc\"><div class=\"ds-no-doc-icon\">📖</div>" +
      "<h2>Select or upload a document</h2>" +
      "<p>Choose from the list on the left, or upload a new file.</p></div>";

    el.innerHTML =
      "<div class=\"view-docstudio\">" +
        "<div class=\"ds-header\">" +
          "<div><h1>📄 Document Studio</h1>" +
          "<p class=\"sub\">Upload any text file or paste content &mdash; then read, study, and ask Nova about it.</p></div>" +
          "<label class=\"btn-primary ds-upload-btn\" for=\"ds-file-input\">" +
            "&#8679; Upload File" +
            "<input type=\"file\" id=\"ds-file-input\" accept=\".txt,.md,.csv,.js,.html,.py,.json,.pdf\" style=\"display:none\">" +
          "</label>" +
        "</div>" +
        "<div class=\"ds-layout\">" +
          "<div class=\"ds-sidebar\">" +
            "<div class=\"ds-sidebar-title\">Your Documents</div>" +
            docListHtml +
            "<div class=\"ds-paste-section\">" +
              "<textarea id=\"ds-paste\" placeholder=\"Or paste text here…\" rows=\"4\"></textarea>" +
              "<div class=\"ds-paste-row\">" +
                "<input type=\"text\" id=\"ds-paste-title\" placeholder=\"Document title\" />" +
                "<button class=\"btn-primary\" id=\"ds-paste-save\">Save</button>" +
              "</div>" +
            "</div>" +
          "</div>" +
          "<div class=\"ds-reader\" id=\"ds-reader\">" + readerHtml + "</div>" +
        "</div>" +
      "</div>";

    self._bindEvents(el, docs);
  },

  _bindEvents: function(el, docs) {
    var self = this;

    var fileInput = el.querySelector("#ds-file-input");
    if (fileInput) {
      fileInput.addEventListener("change", function(e) {
        var file = e.target.files[0];
        if (!file) return;
        var title = file.name.replace(/\.[^/.]+$/, "");
        var isPdf = file.name.toLowerCase().endsWith(".pdf");
        fileInput.value = "";

        if (isPdf) {
          /* FIX-4: Lazy-load local vendored pdf.js, then extract text */
          UI.toast("📄 Loading PDF…", "info");
          _loadPdfJs(function(err) {
            if (err) { UI.toast("❌ PDF engine failed to load: " + err, "error"); return; }
            _extractPdfText(file, function(text, extractErr) {
              if (extractErr) { UI.toast("❌ Could not read PDF: " + extractErr, "error"); return; }
              self._saveDoc(title, text, el);
            });
          });
        } else {
          var reader = new FileReader();
          reader.onload = function(ev) {
            self._saveDoc(title, ev.target.result, el);
          };
          reader.readAsText(file, "UTF-8");
        }
      });
    }

    var pasteSaveBtn = el.querySelector("#ds-paste-save");
    if (pasteSaveBtn) {
      pasteSaveBtn.addEventListener("click", function() {
        var text = (el.querySelector("#ds-paste").value || "").trim();
        var title = (el.querySelector("#ds-paste-title").value || "").trim() || "Pasted Document";
        if (!text) { UI.toast("Nothing to save", "error"); return; }
        self._saveDoc(title, text, el);
      });
    }

    el.querySelectorAll(".ds-doc-item").forEach(function(item) {
      item.addEventListener("click", function(e) {
        if (e.target.classList.contains("ds-doc-delete")) return;
        var idx = parseInt(item.dataset.idx, 10);
        self._activeIdx = idx;
        var d2 = STORE.get("docs") || [];
        d2.forEach(function(doc, i) { doc.active = (i === idx); });
        STORE.set("docs", d2);
        self.render(el);
      });
    });

    el.querySelectorAll(".ds-doc-delete").forEach(function(btn) {
      btn.addEventListener("click", function(e) {
        e.stopPropagation();
        var idx = parseInt(btn.dataset.del, 10);
        var d3 = STORE.get("docs") || [];
        d3.splice(idx, 1);
        STORE.set("docs", d3);
        if (self._activeIdx >= d3.length) self._activeIdx = d3.length - 1;
        self.render(el);
      });
    });

    var readerEl = el.querySelector("#ds-reader");
    if (readerEl) {
      /* dblclick — desktop word lookup */
      readerEl.addEventListener("dblclick", function() {
        var sel = window.getSelection ? window.getSelection().toString().trim() : "";
        if (!sel || sel.indexOf(" ") !== -1) return;
        var word = sel.toLowerCase().replace(/[^a-z]/g, "");
        if (!word) return;
        _showWordPopup(sel, word);
      });
      /* FIX-5: single-tap word lookup for touch devices — pointerup within 300ms */
      var _tapStart = 0;
      var _tapX0 = 0;
      var _tapY0 = 0;
      readerEl.addEventListener("pointerdown", function(e) {
        _tapStart = Date.now();
        _tapX0 = e.clientX;
        _tapY0 = e.clientY;
      });
      readerEl.addEventListener("pointerup", function(e) {
        var dt = Date.now() - _tapStart;
        var dx = Math.abs(e.clientX - _tapX0);
        var dy = Math.abs(e.clientY - _tapY0);
        if (dt > 300 || dx > 10 || dy > 10) return; /* not a quick tap */
        var sel = window.getSelection ? window.getSelection().toString().trim() : "";
        if (!sel || sel.indexOf(" ") !== -1) return;
        var word = sel.toLowerCase().replace(/[^a-z]/g, "");
        if (!word) return;
        _showWordPopup(sel, word);
      });
    }

    el.querySelectorAll(".ds-send-nova").forEach(function(btn) {
      btn.addEventListener("click", function() {
        var d4 = STORE.get("docs") || [];
        var idx = self._activeIdx;
        if (idx < 0 || !d4[idx]) return;
        d4.forEach(function(doc, i) { doc.active = (i === idx); });
        STORE.set("docs", d4);
        if (typeof VIEWS.coach !== "undefined") {
          VIEWS.coach._activeDoc = d4[idx];
          VIEWS.coach._mode = "document";
        }
        UI.toast("📄 Document sent to Nova — opening Nova!", "info");
        setTimeout(function() { window.navigate("coach"); }, 900);
      });
    });

    el.querySelectorAll(".ds-train-btn").forEach(function(btn) {
      btn.addEventListener("click", function() {
        TRAINER.log({skill: "reading", delta: 2, source: "docstudio/train"});
        STORE.addXP(10);
        UI.toast("🎓 +10 XP — trained from document!", "success");
      });
    });
  },

  _saveDoc: function(title, text, el) {
    var CHAR_LIMIT = 400000;
    var SIZE_LIMIT = 3 * 1024 * 1024; /* 3 MB in bytes */
    var truncated = false;

    /* FIX-2: hard cap per document */
    if (text.length > CHAR_LIMIT) {
      text = text.slice(0, CHAR_LIMIT);
      truncated = true;
    }

    /* FIX-2: check total stored size before saving */
    var docs = STORE.get("docs") || [];
    var existingSize = 0;
    for (var di = 0; di < docs.length; di++) {
      existingSize += (docs[di].text || "").length;
    }
    if (existingSize + text.length > SIZE_LIMIT) {
      UI.toast("❌ Storage full (3 MB limit). Delete some documents first, then retry.", "error");
      return;
    }

    var sections = _splitSections(text);
    var wc = text.split(/\s+/).length;
    var doc = { title: title, text: text, sections: sections, added: Date.now(), active: true, wordCount: wc };
    docs.forEach(function(d) { d.active = false; });
    docs.push(doc);
    STORE.set("docs", docs);
    this._activeIdx = docs.length - 1;
    TRAINER.log({skill: "reading", delta: 1, source: "docstudio/upload"});
    if (truncated) {
      UI.toast("⚠️ \"" + _truncate(title, 22) + "\" truncated to 400k chars — first portion saved.", "info");
    } else {
      UI.toast("✅ \"" + _truncate(title, 28) + "\" saved — " + wc.toLocaleString() + " words", "success");
    }
    this.render(el);
  }

};

/* FIX-4: PDF.js lazy-loader — injects local vendored scripts only when first PDF is picked.
   Paths are relative; works via file:// and any static server.
   INV-2 / INV-8: no CDN, no remote URL — src/vendor/ files are committed. */
var _pdfJsLoaded = false;

function _loadPdfJs(cb) {
  if (_pdfJsLoaded && typeof pdfjsLib !== "undefined") { cb(null); return; }
  if (typeof document === "undefined") { cb("no DOM"); return; }

  /* Inject pdf.min.js (the API wrapper) */
  var script = document.createElement("script");
  /* Path is relative to index.html which is at root */
  script.src = "src/vendor/pdf.min.js";
  script.onload = function() {
    /* Point worker to the local vendored copy — no CDN */
    if (typeof pdfjsLib !== "undefined") {
      pdfjsLib.GlobalWorkerOptions.workerSrc = "src/vendor/pdf.worker.min.js";
      _pdfJsLoaded = true;
      cb(null);
    } else {
      cb("pdfjsLib not defined after load");
    }
  };
  script.onerror = function() { cb("failed to load src/vendor/pdf.min.js"); };
  document.head.appendChild(script);
}

function _extractPdfText(file, cb) {
  /* Read file as ArrayBuffer, then parse page-by-page via pdf.js */
  var fr = new FileReader();
  fr.onload = function(ev) {
    var typedArr = new Uint8Array(ev.target.result);
    pdfjsLib.getDocument({data: typedArr}).promise.then(function(pdfDoc) {
      var totalPages = pdfDoc.numPages;
      var pageTexts = [];
      var pagesRead = 0;

      function readPage(n) {
        pdfDoc.getPage(n).then(function(page) {
          page.getTextContent().then(function(tc) {
            var pageText = tc.items.map(function(item) {
              return item.str;
            }).join(" ");
            pageTexts[n - 1] = pageText;
            pagesRead++;
            if (pagesRead < totalPages) {
              readPage(n + 1);
            } else {
              cb(pageTexts.join("\n\n"), null);
            }
          }).catch(function(e) { cb(null, String(e)); });
        }).catch(function(e) { cb(null, String(e)); });
      }

      if (totalPages === 0) { cb("", null); } else { readPage(1); }
    }).catch(function(e) { cb(null, String(e)); });
  };
  fr.onerror = function() { cb(null, "FileReader error"); };
  fr.readAsArrayBuffer(file);
}

function _renderDocReader(doc) {

  var sections = (doc.sections && doc.sections.length) ? doc.sections : [{heading: "", body: doc.text}];
  var readTime = Math.max(1, Math.round(doc.wordCount / 200));
  var html =
    "<div class=\"ds-reader-header\">" +
      "<div>" +
        "<h2 class=\"ds-reader-title\">" + _escF(doc.title) + "</h2>" +
        "<span class=\"ds-reader-meta\">" + (doc.wordCount || 0).toLocaleString() + " words &middot; ~" + readTime + " min read &middot; " + sections.length + " section" + (sections.length !== 1 ? "s" : "") + "</span>" +
      "</div>" +
      "<div class=\"ds-reader-actions\">" +
        "<button class=\"btn-ghost btn-sm ds-send-nova\">🤖 Ask Nova</button>" +
        "<button class=\"btn-ghost btn-sm ds-train-btn\">🎓 +XP</button>" +
      "</div>" +
    "</div>" +
    "<div class=\"ds-doc-tip\">💡 <strong>Double-click any word</strong> to look it up. Click &ldquo;Ask Nova&rdquo; to open a doc-aware AI session.</div>" +
    "<div class=\"ds-sections\">";

  for (var si = 0; si < sections.length; si++) {
    var s = sections[si];
    html += "<div class=\"ds-section\">";
    if (s.heading) { html += "<h3 class=\"ds-section-heading\">" + _escF(s.heading) + "</h3>"; }
    var paras = s.body.split(/\n{2,}/).filter(function(p) { return p.trim(); });
    for (var pi = 0; pi < paras.length; pi++) {
      html += "<p class=\"ds-para\">" + _escF(paras[pi].trim()) + "</p>";
    }
    html += "</div>";
  }
  html += "</div>";
  return html;
}

function _splitSections(text) {
  var lines = text.split("\n");
  var sections = [];
  var current = {heading: "", body: ""};
  for (var li = 0; li < lines.length; li++) {
    var line = lines[li];
    var isHeading = /^#{1,3}\s+/.test(line) ||
      (line.trim().length > 0 && line.trim().length < 80 && /^[A-Z0-9]/.test(line.trim()) && !line.trim().endsWith(".") && !line.trim().endsWith(","));
    if (isHeading && current.body.trim()) {
      sections.push(current);
      current = {heading: line.replace(/^#+\s*/, "").trim(), body: ""};
    } else if (isHeading && !current.body.trim()) {
      current.heading = line.replace(/^#+\s*/, "").trim();
    } else {
      current.body += line + "\n";
    }
  }
  if (current.body.trim() || current.heading) { sections.push(current); }
  return sections.length ? sections : [{heading: "", body: text}];
}

function _showWordPopup(sel, word) {
  document.querySelectorAll(".word-popup").forEach(function(p) { if (p.parentNode) p.parentNode.removeChild(p); });
  var found = null;
  if (typeof WORDS !== "undefined") {
    for (var wi = 0; wi < WORDS.length; wi++) {
      if (WORDS[wi].w && WORDS[wi].w.toLowerCase() === word) { found = WORDS[wi]; break; }
    }
  }
  var popup = document.createElement("div");
  popup.className = "word-popup";
  /* FIX-5: WORDS schema only has {w, ipa, lvl} — render only those fields */
  if (found) {
    popup.innerHTML =
      "<strong>" + _escF(found.w) + "</strong>" +
      (found.ipa ? " <span class=\"ipa\">" + _escF(found.ipa) + "</span>" : "") +
      (found.lvl ? " <span class=\"word-lvl\">[" + _escF(found.lvl) + "]</span>" : "") +
      "<div class=\"word-popup-actions\">" +
        "<button class=\"word-popup-say\">🔊 Hear it</button>" +
        "<button class=\"word-popup-close\">&#215; Close</button>" +
      "</div>";
  } else {
    popup.innerHTML =
      "<strong>" + _escF(sel) + "</strong><br>" +
      "<span class=\"word-def muted\">Not in word bank &mdash; ask Nova!</span>" +
      "<div class=\"word-popup-actions\">" +
        "<button class=\"word-popup-say\">🔊 Hear it</button>" +
        "<button class=\"word-popup-close\">&#215; Close</button>" +
      "</div>";
  }
  popup.style.cssText = "position:fixed;bottom:140px;left:50%;transform:translateX(-50%);background:var(--bg3);border:1px solid rgba(124,58,237,0.5);border-radius:14px;padding:16px 20px;z-index:600;font-size:0.9rem;min-width:240px;box-shadow:0 8px 40px rgba(0,0,0,0.5);";
  document.body.appendChild(popup);
  /* FIX-5: addEventListener instead of inline onclick */
  var sayBtn = popup.querySelector(".word-popup-say");
  if (sayBtn) {
    var wordToSay = found ? found.w : sel;
    sayBtn.addEventListener("click", function() { if (typeof SPEECH !== "undefined") { SPEECH.speak(wordToSay); } });
  }
  var closeBtn = popup.querySelector(".word-popup-close");
  if (closeBtn) closeBtn.addEventListener("click", function() { if (popup.parentNode) popup.parentNode.removeChild(popup); });
  setTimeout(function() { if (popup.parentNode) popup.parentNode.removeChild(popup); }, 6000);
}

function _escF(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function _truncate(s, n) {
  return s.length > n ? s.slice(0, n) + "..." : s;
}

/* RESUME ANALYZER */
VIEWS.resume = {
  _report: null,

  render: function(el) {
    var self = this;
    var reports = STORE.get("resumeReports") || [];

    var histHtml = "";
    if (reports.length > 0) {
      histHtml = "<div class=\"resume-history\"><div class=\"section-title\">Past Reports (" + reports.length + ")</div>";
      var recent = reports.slice(-5).reverse();
      for (var ri = 0; ri < recent.length; ri++) {
        var r = recent[ri];
        histHtml += "<div class=\"resume-history-item\">" +
          "<span>" + (r.type || "Text") + "</span>" +
          "<span class=\"muted\">" + new Date(r.ts).toLocaleDateString() + "</span>" +
          "<span class=\"resume-score-pill\">" + r.overall + "/100</span>" +
          "</div>";
      }
      histHtml += "</div>";
    }

    el.innerHTML =
      "<div class=\"view-resume\">" +
        "<h1>📝 Resume &amp; Writing Analyzer</h1>" +
        "<p class=\"sub\">Paste your resume, cover letter, email, or essay &mdash; get grammar fixes, vocabulary upgrades, and a full score.</p>" +
        "<div class=\"resume-layout\">" +
          "<div class=\"resume-input-panel\">" +
            "<div class=\"resume-input-header\">" +
              "<label class=\"section-title\">Your Text</label>" +
              "<label class=\"btn-ghost btn-sm\" for=\"resume-file-input\">📎 Upload .txt</label>" +
              "<input type=\"file\" id=\"resume-file-input\" accept=\".txt,.md\" style=\"display:none\">" +
            "</div>" +
            "<textarea id=\"resume-text\" placeholder=\"Paste your resume, cover letter, email, or essay here…\" rows=\"18\"></textarea>" +
            "<div class=\"resume-actions\">" +
              "<select id=\"resume-type\" class=\"resume-select\">" +
                "<option value=\"resume\">Resume / CV</option>" +
                "<option value=\"cover\">Cover Letter</option>" +
                "<option value=\"email\">Professional Email</option>" +
                "<option value=\"essay\">Essay / Report</option>" +
              "</select>" +
              "<button class=\"btn-primary\" id=\"resume-analyze\">🔍 Analyze</button>" +
            "</div>" +
          "</div>" +
          "<div class=\"resume-report-panel\" id=\"resume-report\">" +
            (self._report ? _renderResumeReport(self._report) : _renderResumeEmpty()) +
          "</div>" +
        "</div>" +
        histHtml +
      "</div>";

    self._bindEvents(el);
  },

  _bindEvents: function(el) {
    var self = this;
    var fileInput = el.querySelector("#resume-file-input");
    if (fileInput) {
      fileInput.addEventListener("change", function(e) {
        var file = e.target.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function(ev) { el.querySelector("#resume-text").value = ev.target.result; fileInput.value = ""; };
        reader.readAsText(file, "UTF-8");
      });
    }
    var analyzeBtn = el.querySelector("#resume-analyze");
    if (analyzeBtn) {
      analyzeBtn.addEventListener("click", function() {
        var text = (el.querySelector("#resume-text").value || "").trim();
        var type = el.querySelector("#resume-type").value;
        if (!text || text.length < 50) { UI.toast("Paste at least a few sentences to analyze", "error"); return; }
        analyzeBtn.textContent = "⏳ Analyzing…";
        analyzeBtn.disabled = true;
        var report = _runAnalysis(text, type);
        self._report = report;
        var reps = STORE.get("resumeReports") || [];
        reps.push(report);
        STORE.set("resumeReports", reps);
        TRAINER.log({skill: "writing", delta: 2, source: "resume/analyze"});
        STORE.addXP(15);
        analyzeBtn.textContent = "🔍 Analyze";
        analyzeBtn.disabled = false;
        var reportEl = el.querySelector("#resume-report");
        if (reportEl) reportEl.innerHTML = _renderResumeReport(report);
        var settings = STORE.get("settings") || {};
        var key = settings.geminiKey || "";
        if (key && key.trim().length > 10) {
          _resumeGeminiCritique(text, type, report, reportEl, key.trim());
        }
      });
    }
  }
};

function _runAnalysis(text, type) {
  var issues = [];
  var grammarScore = 100;
  var vocabScore = 100;
  var structureScore = 100;

  if (typeof COACH_RULES !== "undefined") {
    for (var ri = 0; ri < COACH_RULES.length; ri++) {
      if (COACH_RULES[ri].pat.test(text)) {
        issues.push({cat: "grammar", msg: COACH_RULES[ri].fix, severity: "high"});
        grammarScore = Math.max(0, grammarScore - 12);
      }
    }
  }
  if (typeof COACH_UPGRADES !== "undefined") {
    for (var ui = 0; ui < COACH_UPGRADES.length; ui++) {
      var up = COACH_UPGRADES[ui];
      var pat = new RegExp("\\b" + up.basic.toLowerCase() + "\\b", "i");
      if (pat.test(text)) {
        issues.push({cat: "vocab", msg: "\"" + up.basic + "\" \u2192 try \"" + up.better + "\" (B1) or \"" + up.adv + "\" (C1)", severity: "medium"});
        vocabScore = Math.max(0, vocabScore - 8);
      }
    }
  }
  if (type === "resume") {
    var lower = text.toLowerCase();
    var expected = ["experience", "education", "skills", "summary", "projects", "contact"];
    var missing = [];
    for (var si = 0; si < expected.length; si++) { if (lower.indexOf(expected[si]) === -1) missing.push(expected[si]); }
    if (missing.length > 3) {
      issues.push({cat: "structure", msg: "Missing common resume sections: " + missing.slice(0, 3).join(", "), severity: "medium"});
      structureScore = Math.max(0, structureScore - 20);
    }
    var wc2 = text.split(/\s+/).length;
    if (wc2 < 100) {
      issues.push({cat: "structure", msg: "Resume seems short — aim for 300-600 words", severity: "medium"});
      structureScore = Math.max(0, structureScore - 15);
    }
  }
  var sentences = text.split(/[.!?]+/).filter(function(s) { return s.trim().split(/\s+/).length > 5; });
  var longSents = sentences.filter(function(s) { return s.trim().split(/\s+/).length > 35; });
  if (longSents.length > 0) {
    issues.push({cat: "clarity", msg: longSents.length + " sentence(s) over 35 words — break them up", severity: "low"});
  }
  var passivePat = /\b(is|are|was|were|be|been|being)\s+\w+ed\b/gi;
  var passiveCount = (text.match(passivePat) || []).length;
  if (passiveCount > 4) {
    issues.push({cat: "clarity", msg: passiveCount + " passive voice uses — prefer active voice for impact", severity: "low"});
  }
  var overall = Math.round(grammarScore * 0.35 + vocabScore * 0.30 + structureScore * 0.25 + Math.min(100, 100 - longSents.length * 5) * 0.10);
  return { ts: Date.now(), type: type, grammar: grammarScore, vocab: vocabScore, structure: structureScore, overall: overall, issues: issues, wordCount: text.split(/\s+/).length, geminiCritique: null };
}

function _renderResumeEmpty() {
  return "<div class=\"resume-empty\"><div class=\"resume-empty-icon\">📊</div>" +
    "<h2>Your report will appear here</h2>" +
    "<p>Paste your text on the left and click Analyze to get instant scores and specific improvement tips.</p></div>";
}

function _scoreColor(s) { return s >= 80 ? "var(--green)" : s >= 55 ? "var(--gold)" : "var(--red)"; }
function _scoreLabel(s) { return s >= 80 ? "Good" : s >= 55 ? "Fair" : "Needs work"; }

function _renderResumeReport(r) {
  var catIcons = {grammar: "⚠️", vocab: "💡", structure: "🗂️", clarity: "🔍"};
  var issueHtml = "";
  if (r.issues.length === 0) {
    issueHtml = "<div class=\"resume-no-issues\">✅ No major issues found — excellent work!</div>";
  } else {
    var grouped = {};
    for (var ii = 0; ii < r.issues.length; ii++) {
      var iss = r.issues[ii];
      if (!grouped[iss.cat]) grouped[iss.cat] = [];
      grouped[iss.cat].push(iss);
    }
    var cats = Object.keys(grouped);
    for (var ci = 0; ci < cats.length; ci++) {
      var cat = cats[ci];
      var catLabel = cat.charAt(0).toUpperCase() + cat.slice(1);
      issueHtml += "<div class=\"resume-issue-group\"><div class=\"resume-issue-cat\">" + (catIcons[cat] || "•") + " " + catLabel + "</div>";
      for (var gi = 0; gi < grouped[cat].length; gi++) {
        var giss = grouped[cat][gi];
        issueHtml += "<div class=\"resume-issue-item sev-" + giss.severity + "\">" + _escF(giss.msg) + "</div>";
      }
      issueHtml += "</div>";
    }
  }
  var bars = [{label: "Grammar", val: r.grammar}, {label: "Vocabulary", val: r.vocab}, {label: "Structure", val: r.structure}];
  var barHtml = "";
  for (var bi = 0; bi < bars.length; bi++) {
    var b = bars[bi];
    barHtml += "<div class=\"resume-bar-row\">" +
      "<span class=\"resume-bar-label\">" + b.label + "</span>" +
      "<div class=\"resume-bar-track\"><div class=\"resume-bar-fill\" style=\"width:" + b.val + "%;background:" + _scoreColor(b.val) + "\"></div></div>" +
      "<span class=\"resume-bar-val\" style=\"color:" + _scoreColor(b.val) + "\">" + b.val + " <small>" + _scoreLabel(b.val) + "</small></span>" +
      "</div>";
  }
  var geminiHtml;
  if (r.geminiCritique) {
    geminiHtml = "<div class=\"resume-gemini-block\"><div class=\"section-title\">🤖 Nova's Expert Critique</div>" +
      "<div class=\"resume-gemini-text\">" + _escF(r.geminiCritique) + "</div></div>";
  } else {
    geminiHtml = "<div class=\"resume-gemini-pending\" id=\"resume-gemini-section\"><div class=\"section-title\">🤖 Nova's Expert Critique</div>" +
      "<p class=\"muted\">Add your free Gemini key in <a href=\"#/settings\">Settings</a> to unlock a holistic 200-word critique from Nova.</p></div>";
  }
  return "<div class=\"resume-report\">" +
    "<div class=\"resume-score-header\">" +
      "<div class=\"resume-overall-score\" style=\"color:" + _scoreColor(r.overall) + "\">" + r.overall + "<span class=\"resume-score-max\">/100</span></div>" +
      "<div class=\"resume-score-label\">" + (r.overall >= 80 ? "🌟 Excellent" : r.overall >= 60 ? "👍 Good" : "💪 Needs improvement") + "</div>" +
      "<div class=\"resume-word-count\">" + r.wordCount.toLocaleString() + " words analyzed</div>" +
    "</div>" +
    "<div class=\"resume-score-bars\">" + barHtml + "</div>" +
    "<div class=\"resume-issues-section\"><div class=\"section-title\">Issues Found (" + r.issues.length + ")</div>" + issueHtml + "</div>" +
    geminiHtml +
    "</div>";
}

function _resumeGeminiCritique(text, type, report, reportEl, key) {
  var typeLabel = {resume: "resume", cover: "cover letter", email: "professional email", essay: "essay"}[type] || "document";
  var excerpt = text.slice(0, 2000);
  var honest = (typeof isHonest === "function") ? isHonest() : false;
  var prompt = "";
  if (honest) {
    prompt = "You are Nova in BRUTAL HONESTY mode. The student has shared a " + typeLabel + " for harsh review.\n" +
      "Scores: Grammar " + report.grammar + "/100, Vocabulary " + report.vocab + "/100, Structure " + report.structure + "/100, Overall " + report.overall + "/100.\n" +
      "Text:\n---\n" + excerpt + "\n---\n" +
      "Start with a strict overall score 'N/10'. List EVERY weakness and error one per line with ▸. Zero fluff, direct, uncompromising critique. End with the single most critical rewrite.";
  } else {
    prompt = "You are Nova, an expert English writing coach. The student has shared a " + typeLabel + " for analysis.\n" +
      "Scores: Grammar " + report.grammar + "/100, Vocabulary " + report.vocab + "/100, Structure " + report.structure + "/100, Overall " + report.overall + "/100.\n" +
      "Text:\n---\n" + excerpt + "\n---\n" +
      "Write a warm but honest 3-paragraph critique (~200 words):\n" +
      "1. What they did WELL (quote specific phrases)\n" +
      "2. The 2-3 most important improvements (be actionable)\n" +
      "3. A motivating closing sentence.\n" +
      "Do NOT repeat the scores. Be a real coach.";
  }
  var body = {contents: [{role: "user", parts: [{text: prompt}]}]};
  var url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + key;
  var geminiSection = reportEl ? reportEl.querySelector("#resume-gemini-section") : null;
  if (geminiSection) { geminiSection.innerHTML = "<div class=\"section-title\">🤖 Nova's Expert Critique</div><p class=\"muted\">Nova is reading your text…</p>"; }
  if (typeof fetch === "function") {
    fetch(url, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(body)})
      .then(function(res) { return res.json(); })
      .then(function(resp) {
        var critique = resp.candidates[0].content.parts[0].text;
        report.geminiCritique = critique;
        var reps = STORE.get("resumeReports") || [];
        if (reps.length > 0) { reps[reps.length - 1].geminiCritique = critique; }
        STORE.set("resumeReports", reps);
        if (geminiSection) {
          geminiSection.innerHTML = "<div class=\"section-title\">🤖 Nova's Expert Critique</div><div class=\"resume-gemini-text\">" + _escF(critique) + "</div>";
        }
      }).catch(function() {
        if (geminiSection) { geminiSection.innerHTML = "<div class=\"section-title\">🤖 Nova's Expert Critique</div><p class=\"muted\">Could not connect right now. Try again when online.</p>"; }
      });
  }
}
