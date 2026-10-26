# -*- coding: utf-8 -*-
"""
Script per fondere le 480 nuove domande in src/content/question-bank.ts
"""
import json
import re
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent))

from matematica_questions import MATEMATICA_EXP
from italiano_questions import ITALIANO_EXP
from scienze_questions import SCIENZE_EXP
from storia_questions import STORIA_EXP

YEAR_MAP = {
    'P1': ['P1', 'P2'],
    'P2': ['P2', 'P3'],
    'P3': ['P3', 'P4'],
    'P4': ['P4', 'P5'],
    'P5': ['P5', 'S1'],
    'S1': ['S1', 'S2'],
    'S2': ['S2', 'S3'],
    'S3': ['S3'],
}

HINTS = {
    'matematica': 'Fai attenzione ai dati del problema e procedi con calma.',
    'italiano': 'Rifletti sulle regole della grammatica e sul significato dei termini.',
    'scienze': 'Pensa ai principi scientifici e alle caratteristiche del fenomeno.',
    'storia': 'Colloca l\'evento nel suo contesto storico e cronologico.'
}

def to_tagged_round(item, subject, idx):
    if 'years' in item and 'round' in item:
        return item
    
    anno = item['anno']
    years = YEAR_MAP.get(anno, [anno])
    qid = f"qb-{subject[:3]}-exp-{anno.lower()}-{idx:02d}"
    prompt = item['domanda']
    explanation = item.get('spiegazione', '')
    hint = item.get('hint', HINTS.get(subject, ''))
    
    raw_options = item['opzioni']
    correct_val = raw_options[0]
    wrong_vals = raw_options[1:]
    
    target_pos = idx % len(raw_options)
    options = []
    w_idx = 0
    for p in range(len(raw_options)):
        if p == target_pos:
            options.append({'label': correct_val, 'correct': True})
        else:
            options.append({'label': wrong_vals[w_idx], 'correct': False})
            w_idx += 1
            
    round_obj = {
        'id': qid,
        'type': 'quiz',
        'prompt': prompt,
        'options': options,
        'hint': hint,
        'explanation': explanation
    }
    return {'years': years, 'round': round_obj}

def format_ts_round(tr):
    years_json = json.dumps(tr['years'])
    r = tr['round']
    
    lines = []
    lines.append("    {")
    lines.append(f"      years: {years_json},")
    lines.append("      round: {")
    lines.append(f"        id: {json.dumps(r['id'])},")
    lines.append(f"        type: {json.dumps(r['type'])},")
    
    if 'mode' in r:
        lines.append(f"        mode: {json.dumps(r['mode'])},")
    if 'direction' in r:
        lines.append(f"        direction: {json.dumps(r['direction'])},")
    if 'icon' in r:
        lines.append(f"        icon: {json.dumps(r['icon'])},")
        
    lines.append(f"        prompt: {json.dumps(r['prompt'], ensure_ascii=False)},")
    
    if 'options' in r:
        lines.append("        options: [")
        for opt in r['options']:
            corr = 'true' if opt['correct'] else 'false'
            lbl = json.dumps(opt['label'], ensure_ascii=False)
            lines.append(f"          {{ label: {lbl}, correct: {corr} }},")
        lines[-1] = lines[-1].rstrip(',')
        lines.append("        ],")
    if 'sortItems' in r:
        lines.append(f"        sortItems: {json.dumps(r['sortItems'], ensure_ascii=False)},")
    if 'leftItems' in r:
        lines.append(f"        leftItems: {json.dumps(r['leftItems'], ensure_ascii=False)},")
    if 'rightItems' in r:
        lines.append(f"        rightItems: {json.dumps(r['rightItems'], ensure_ascii=False)},")
    if 'pairs' in r:
        lines.append(f"        pairs: {json.dumps(r['pairs'])},")
    if 'items' in r:
        lines.append(f"        items: {json.dumps(r['items'], ensure_ascii=False)},")
    if 'support' in r:
        lines.append(f"        support: {json.dumps(r['support'])},")
        
    if 'hint' in r and r['hint']:
        lines.append(f"        hint: {json.dumps(r['hint'], ensure_ascii=False)},")
    if 'explanation' in r and r['explanation']:
        lines.append(f"        explanation: {json.dumps(r['explanation'], ensure_ascii=False)}")
    else:
        lines[-1] = lines[-1].rstrip(',')
        
    lines.append("      }")
    lines.append("    }")
    return "\n".join(lines)

def generate_subject_ts(items, subject):
    parts = []
    for i, it in enumerate(items, 1):
        tr = to_tagged_round(it, subject, i)
        parts.append(format_ts_round(tr))
    return "\n" + ",\n\n".join(parts) + ",\n"

def main():
    qb_path = Path('/Users/caioz/scuola-in-corsa/src/content/question-bank.ts')
    content = qb_path.read_text(encoding='utf-8')

    ts_mat = generate_subject_ts(MATEMATICA_EXP, 'matematica')
    ts_ita = generate_subject_ts(ITALIANO_EXP, 'italiano')
    ts_sci = generate_subject_ts(SCIENZE_EXP, 'scienze')
    ts_sto = generate_subject_ts(STORIA_EXP, 'storia')

    # Sezione 1: prima di '  ],\n\n  italiano: ['
    p_mat = content.find('  ],\n\n  italiano: [')
    if p_mat == -1:
        raise ValueError("Marker italiano non trovato!")
    content = content[:p_mat] + ts_mat + content[p_mat:]

    # Sezione 2: prima di '  ],\n\n  scienze: ['
    p_ita = content.find('  ],\n\n  scienze: [')
    if p_ita == -1:
        raise ValueError("Marker scienze non trovato!")
    content = content[:p_ita] + ts_ita + content[p_ita:]

    # Sezione 3: prima di '  ],\n\n  storia: ['
    p_sci = content.find('  ],\n\n  storia: [')
    if p_sci == -1:
        raise ValueError("Marker storia non trovato!")
    content = content[:p_sci] + ts_sci + content[p_sci:]

    # Sezione 4: prima di '  ]\n};' alla fine di storia
    p_sto = content.rfind('  ]\n};')
    if p_sto == -1:
        p_sto = content.rfind(']\n};')
    if p_sto == -1:
        raise ValueError("Marker fine storia non trovato!")
    content = content[:p_sto] + ts_sto + content[p_sto:]

    qb_path.write_text(content, encoding='utf-8')
    print(f"Aggiornato {qb_path} con successo!")

if __name__ == '__main__':
    main()
