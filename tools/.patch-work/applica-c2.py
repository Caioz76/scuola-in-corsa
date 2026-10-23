#!/usr/bin/env python3
"""Applica PATCH-C1 + PATCH-C2 a una copia di src/ e lascia il tsc a 0.

Uso:  python3 applica-c2.py /percorso/della/copia/src
(default: /tmp/final-src)

Non tocca la sandbox temporanea di macOS: prende la cartella come argomento,
così lo stesso script verifica la patch prima di darla a B.
"""
import sys, pathlib

SB = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "/tmp/final-src")
fails = []


def sub(rel, old, new, count=1):
    p = SB / rel
    src = p.read_text()
    n = src.count(old)
    if n != count:
        fails.append(f"{rel}: atteso {count} match, trovati {n} per: {old[:70]!r}")
        return
    p.write_text(src.replace(old, new))
    print(f"  ok  {rel}: {old.splitlines()[0][:62]}")


# ═══ PATCH-C1 — 17 errori ════════════════════════════════════════

# 1. palette.ts: helper di conversione colore
pal = SB / "src/art/palette.ts"
if "hexNum" not in pal.read_text():
    pal.write_text(pal.read_text() + "\n/** Converte un colore CSS ('#rrggbb') nel numero atteso da Phaser Graphics. */\nexport const hexNum = (h: string): number => parseInt(h.slice(1), 16);\n")
    print("  ok  palette.ts: aggiunto hexNum")

# 2. choice.ts: 7 colori stringa → numero
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

# 3. order.ts: onDragStart opzionale + eventi sul pointer
sub("src/challenges/order.ts",
    "chip.onDragStart((p: Phaser.Input.Pointer) => {",
    "chip.onDragStart?.((p: Phaser.Input.Pointer) => {")
sub("src/challenges/order.ts",
    "        p.off('move', onMove);\n        p.off('up', onUp);\n        p.off('upoutside', onUp);",
    "        this.scene.input.off('pointermove', onMove);\n        this.scene.input.off('pointerup', onUp);\n        this.scene.input.off('pointerupoutside', onUp);")
sub("src/challenges/order.ts",
    "      p.on('move', onMove);\n      p.once('up', onUp);\n      p.once('upoutside', onUp);",
    "      this.scene.input.on('pointermove', onMove);\n      this.scene.input.once('pointerup', onUp);\n      this.scene.input.once('pointerupoutside', onUp);")

# 4. match.ts: lineStyle vuole 2-3 argomenti
sub("src/challenges/match.ts",
    "this.lines.lineStyle(0);",
    "this.lines.lineStyle(0, 0x000000, 0);")

# 5. validate.ts: r è 'never' nel ramo irraggiungibile
sub("src/content/validate.ts",
    "String(r.mode)",
    "String((r as { mode?: unknown }).mode)")

# 6. ui.ts: Phaser serve come valore (new Phaser.Geom.Rectangle)
sub("src/challenges/ui.ts",
    "import type Phaser from 'phaser';",
    "import Phaser from 'phaser';")

# ═══ PATCH-C2 — ultimi 3 errori (ui.ts) ══════════════════════════

# 7. Btn.root: Sprite → Container
sub("src/challenges/ui.ts",
    "export interface Btn {\n  root: Phaser.GameObjects.Sprite;",
    "export interface Btn {\n  root: Phaser.GameObjects.Container;")

# 8. makeButton: sprite figlio a (0,0), root = Container
sub("src/challenges/ui.ts",
    "  const sprite = scene.add.sprite(x, y, 'btn-blue').setScale(s);",
    "  const sprite = scene.add.sprite(0, 0, 'btn-blue').setScale(s);")
sub("src/challenges/ui.ts",
    "  sprite.add(text);\n  sprite.setDepth(o.depth ?? 10);",
    "  const root = scene.add.container(x, y, [sprite, text]);\n  root.setDepth(o.depth ?? 10);")

# 9. Chip.root: Sprite → Container
sub("src/challenges/ui.ts",
    "export interface Chip {\n  root: Phaser.GameObjects.Sprite;",
    "export interface Chip {\n  root: Phaser.GameObjects.Container;")

# 10. makeChip: stesso schema
sub("src/challenges/ui.ts",
    "  const sprite = scene.add.sprite(x, y, 'card').setScale(s);",
    "  const sprite = scene.add.sprite(0, 0, 'card').setScale(s);")
sub("src/challenges/ui.ts",
    "  sprite.add(text);\n  sprite.setDepth(o.depth ?? 20);",
    "  const root = scene.add.container(x, y, [sprite, text]);\n  root.setDepth(o.depth ?? 20);")

# 11. makeSlot: stesso schema
sub("src/challenges/ui.ts",
    "  const sprite = scene.add.sprite(x, y, 'slot').setScale(s);",
    "  const sprite = scene.add.sprite(0, 0, 'slot').setScale(s);")
sub("src/challenges/ui.ts",
    "  sprite.add(num);\n  sprite.setDepth(5);",
    "  const root = scene.add.container(x, y, [sprite, num]);\n  root.setDepth(5);")
sub("src/challenges/ui.ts",
    "): { root: Phaser.GameObjects.Sprite; dispose(): void } {",
    "): { root: Phaser.GameObjects.Container; dispose(): void } {")

# 12. i tre `root: sprite,` diventano `root,`
sub("src/challenges/ui.ts", "    root: sprite,", "    root,", count=3)

# 13. dispose: distruggere il container (distrugge i figli)
sub("src/challenges/ui.ts",
    "    dispose(): void {\n      sprite.removeAllListeners();\n      text.destroy();\n      sprite.destroy();\n    }",
    "    dispose(): void {\n      sprite.removeAllListeners();\n      root.destroy();\n    }",
    count=2)

sub("src/challenges/ui.ts",
    "    dispose(): void {\n      num.destroy();\n      sprite.destroy();\n    }",
    "    dispose(): void {\n      root.destroy();\n    }")

# 14. order.ts: tipo di slotRoots
sub("src/challenges/order.ts",
    "  private slotRoots: { root: Phaser.GameObjects.Sprite; dispose(): void }[] = [];",
    "  private slotRoots: { root: Phaser.GameObjects.Container; dispose(): void }[] = [];")

print()
if fails:
    print("❌ PATCH FALLITE:")
    for f in fails:
        print("   ", f)
    sys.exit(1)
print("✅ tutte le patch applicate")
