#!/usr/bin/env python3
"""Applica le patch nella sandbox con sostituzioni esatte e verifica."""
import sys, pathlib

SB = pathlib.Path("/private/var/folders/kk/l985t8ws0pd_r6cr0_9nr0340000gn/T/opencode/sandbox-patch")
fails = []

def sub(rel, old, new, count=1):
    p = SB / rel
    src = p.read_text()
    n = src.count(old)
    if n != count:
        fails.append(f"{rel}: atteso {count} match, trovati {n} per: {old[:70]!r}")
        return
    p.write_text(src.replace(old, new))
    print(f"  ok  {rel}: {old.splitlines()[0][:66]}")

# ── 1. palette.ts: helper di conversione colore ──────────────────
pal = SB / "src/art/palette.ts"
if "hexNum" not in pal.read_text():
    pal.write_text(pal.read_text() + "\n/** Converte un colore CSS ('#rrggbb') nel numero atteso da Phaser Graphics. */\nexport const hexNum = (h: string): number => parseInt(h.slice(1), 16);\n")
    print("  ok  palette.ts: aggiunto hexNum")

# ── 2. choice.ts: 7 colori stringa → numero ──────────────────────
sub("src/challenges/choice.ts",
    "import { C } from '../art/palette';",
    "import { C, hexNum } from '../art/palette';")
sub("src/challenges/choice.ts", "g.lineStyle(2, C.ink, 0.4);",  "g.lineStyle(2, hexNum(C.ink), 0.4);")
sub("src/challenges/choice.ts", "g.lineStyle(3, C.ink, 0.9);",  "g.lineStyle(3, hexNum(C.ink), 0.9);")
sub("src/challenges/choice.ts", "g.lineStyle(2, C.ink, 0.8);",  "g.lineStyle(2, hexNum(C.ink), 0.8);")
sub("src/challenges/choice.ts", "g.fillStyle(C.ink, 0.9);",     "g.fillStyle(hexNum(C.ink), 0.9);")
sub("src/challenges/choice.ts", "g.fillStyle(C.blueDeep, 0.95);", "g.fillStyle(hexNum(C.blueDeep), 0.95);")
sub("src/challenges/choice.ts", "g.fillStyle(C.green, 0.95);",  "g.fillStyle(hexNum(C.green), 0.95);")
sub("src/challenges/choice.ts", "g.lineStyle(1, C.ink, 0.5);",  "g.lineStyle(1, hexNum(C.ink), 0.5);")

# ── 3. order.ts: onDragStart opzionale + eventi sul pointer ──────
sub("src/challenges/order.ts",
    "chip.onDragStart((p: Phaser.Input.Pointer) => {",
    "chip.onDragStart?.((p: Phaser.Input.Pointer) => {")
sub("src/challenges/order.ts",
    "        p.off('move', onMove);\n        p.off('up', onUp);\n        p.off('upoutside', onUp);",
    "        this.scene.input.off('pointermove', onMove);\n        this.scene.input.off('pointerup', onUp);\n        this.scene.input.off('pointerupoutside', onUp);")
sub("src/challenges/order.ts",
    "      p.on('move', onMove);\n      p.once('up', onUp);\n      p.once('upoutside', onUp);",
    "      this.scene.input.on('pointermove', onMove);\n      this.scene.input.once('pointerup', onUp);\n      this.scene.input.once('pointerupoutside', onUp);")

# ── 4. match.ts: lineStyle vuole 2-3 argomenti ───────────────────
sub("src/challenges/match.ts",
    "this.lines.lineStyle(0);",
    "this.lines.lineStyle(0, 0x000000, 0);")

# ── 5. validate.ts: r è 'never' nel ramo irraggiungibile ─────────
sub("src/content/validate.ts",
    "String(r.mode)",
    "String((r as { mode?: unknown }).mode)")

# ── 6. ui.ts: Phaser serve come valore (new Phaser.Geom.Rectangle) ─
sub("src/challenges/ui.ts",
    "import type Phaser from 'phaser';",
    "import Phaser from 'phaser';")

print()
if fails:
    print("❌ PATCH FALLITE:")
    for f in fails:
        print("   ", f)
    sys.exit(1)
print("✅ tutte le patch applicate")
