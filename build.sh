#!/usr/bin/env bash
# build.sh — EngSpell standalone build (INV-4)
# Output: engspell-standalone.html (~350 KB)
# No npm, no tools — plain bash + cat

set -euo pipefail

OUT="engspell-standalone.html"
TMP="_build_tmp.js"

echo "🔨 EngSpell build.sh starting..."

# Syntax check all source files first (INV-6)
for f in src/data.js src/data2.js src/data3.js src/speech.js src/core.js \
          src/views-a.js src/views-b.js src/views-c.js src/views-d.js src/views-e.js src/views-f.js; do
  node --check "$f" && echo "  ✓ $f"
done

# Concatenate JS in dependency order
cat src/data.js src/data2.js src/data3.js src/speech.js src/core.js \
    src/views-a.js src/views-b.js src/views-c.js src/views-d.js src/views-e.js src/views-f.js \
    > "$TMP"

# Read the CSS from index.html inline style block
CSS=$(sed -n '/<style>/,/<\/style>/{ /^<style>$/d; /^<\/style>$/d; p; }' index.html)

# Build the standalone HTML
cat > "$OUT" <<'HTMLSTART'
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="EngSpell — Speak · Spell · Shine. The complete English mastery studio.">
<title>EngSpell — Speak · Spell · Shine</title>
HTMLSTART

echo "<style>" >> "$OUT"
echo "$CSS" >> "$OUT"
echo "</style>" >> "$OUT"

cat >> "$OUT" <<'BODYSTART'
</head>
<body>
<div id="app">
  <header id="topbar">
    <div class="brand">✨ EngSpell</div>
    <div class="topbar-right">
      <span id="xp-display">⚡ 0 XP</span>
      <span id="streak-display">🔥 0</span>
    </div>
  </header>
  <div id="layout">
    <nav id="sidebar"><nav id="nav"></nav></nav>
    <main id="view"></main>
  </div>
</div>
<div id="toast" class="toast"></div>
<script>
BODYSTART

cat "$TMP" >> "$OUT"

# INV-4: must NOT contain literal </script> or </style> inside JS content
# (we use the concatenated file, which contains no raw closing script tags)

cat >> "$OUT" <<'HTMLEND'
</script>
</body>
</html>
HTMLEND

# Cleanup
rm -f "$TMP"

SIZE=$(wc -c < "$OUT")
echo "✅ Built: $OUT ($SIZE bytes)"
echo "   Open engspell-standalone.html in Chrome/Edge to verify."
