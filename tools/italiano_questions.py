# -*- coding: utf-8 -*-
"""Banca domande estesa di Italiano (120 nuovi quesiti autentici e curricolari)."""

ITALIANO_EXP = [
    # ── P1 (15 quesiti) ────────────────────────────────────────────────────────
    {
        "years": ["P1"],
        "round": {
            "id": "qb-ita-p1-e1",
            "type": "quiz",
            "prompt": "Quale parola è scritta con la DOPPIA corretta?",
            "options": [
                {"label": "Gatto", "correct": True},
                {"label": "Gato", "correct": False},
                {"label": "Gattto", "correct": False}
            ],
            "hint": "Ascolta il suono forte della 't'.",
            "explanation": "La parola 'gatto' si scrive con due 't'."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-ita-p1-e2",
            "type": "quiz",
            "prompt": "Quale parola contiene il suono dolce 'CI' come in 'ciliegia'?",
            "options": [
                {"label": "Cinema", "correct": True},
                {"label": "Casa", "correct": False},
                {"label": "Cane", "correct": False}
            ],
            "hint": "Davanti a 'i' la lettera 'c' ha un suono dolce.",
            "explanation": "In 'cinema' la 'c' si pronuncia dolce (ci-ne-ma)."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-ita-p1-e3",
            "type": "quiz",
            "prompt": "Quale parola fa rima con 'FIORE'?",
            "options": [
                {"label": "Cuore", "correct": True},
                {"label": "Foglia", "correct": False},
                {"label": "Albero", "correct": False}
            ],
            "hint": "Ascolta il suono finale: '-ore'.",
            "explanation": "Fiore e Cuore finiscono con lo stesso suono (-ore)."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-ita-p1-e4",
            "type": "quiz",
            "prompt": "Quale parola della 'famiglia acqua' si scrive con 'CQU'?",
            "options": [
                {"label": "Acquario", "correct": True},
                {"label": "Aquario", "correct": False},
                {"label": "Accuario", "correct": False}
            ],
            "hint": "Tutte le parole derivate da 'acqua' vogliono CQU.",
            "explanation": "La parola 'acquario' si scrive con 'cqu'."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-ita-p1-e5",
            "type": "quiz",
            "prompt": "Quale lettera ci vuole all'inizio di una frase dopo il punto?",
            "options": [
                {"label": "La lettera maiuscola", "correct": True},
                {"label": "La lettera minuscola", "correct": False},
                {"label": "Un numero", "correct": False}
            ],
            "hint": "La prima lettera deve essere sempre grande.",
            "explanation": "All'inizio di una frase e dopo il punto fermo si usa la lettera maiuscola."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-ita-p1-e6",
            "type": "quiz",
            "prompt": "Quale parola è divisa correttamente in sillabe?",
            "options": [
                {"label": "CA - SA", "correct": True},
                {"label": "CAS - A", "correct": False},
                {"label": "C - ASA", "correct": False}
            ],
            "hint": "Batti le mani: CA... SA...",
            "explanation": "'Casa' è formata da due sillabe: CA-SA."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-ita-p1-e7",
            "type": "dragdrop",
            "mode": "match",
            "prompt": "Abbina ogni parola con il disegno o suono corrispondente.",
            "leftItems": ["Ragno", "Bottiglia", "Sciarpa"],
            "rightItems": ["Suono GN", "Suono GLI", "Suono SCI"],
            "pairs": [[0, 0], [1, 1], [2, 2]],
            "hint": "Ascolta il gruppo consonantico presente in ciascuna parola.",
            "explanation": "Ra-gno ha GN, bot-ti-glia ha GLI, sciar-pa ha SCI."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-ita-p1-e8",
            "type": "quiz",
            "prompt": "Quale parola è scritta nel modo corretto?",
            "options": [
                {"label": "Foglia", "correct": True},
                {"label": "Folia", "correct": False},
                {"label": "Follia", "correct": False}
            ],
            "hint": "Vuole il trigramma 'gli'.",
            "explanation": "La foglia dell'albero si scrive con 'gli'."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-ita-p1-e9",
            "type": "quiz",
            "prompt": "Quale tra queste è una parola che indica una COSA?",
            "options": [
                {"label": "Tavolo", "correct": True},
                {"label": "Maestra", "correct": False},
                {"label": "Cane", "correct": False}
            ],
            "hint": "Maestra è una persona, cane è un animale.",
            "explanation": "'Tavolo' è un nome comune di cosa inanimata."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-ita-p1-e10",
            "type": "quiz",
            "prompt": "Quale parola serve per completare la frase: 'Il gatto beve il ...'?",
            "options": [
                {"label": "latte", "correct": True},
                {"label": "sasso", "correct": False},
                {"label": "libro", "correct": False}
            ],
            "hint": "È una bevanda bianca che piace ai gatti.",
            "explanation": "Il gatto beve il latte."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-ita-p1-e11",
            "type": "quiz",
            "prompt": "Quale segno di punteggiatura si mette alla fine di una frase normale?",
            "options": [
                {"label": "Il punto fermo (.)", "correct": True},
                {"label": "La virgola (,)", "correct": False},
                {"label": "I due punti (:)", "correct": False}
            ],
            "hint": "Chiude il pensiero e ferma la frase.",
            "explanation": "La frase si conclude sempre con il punto fermo (.)."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-ita-p1-e12",
            "type": "dragdrop",
            "mode": "sort",
            "prompt": "Metti in ordine le parole per formare una frase corretta.",
            "sortItems": ["Il", "sole", "brilla", "nel cielo."],
            "hint": "Inizia con la parola con la lettera maiuscola.",
            "explanation": "La frase corretta è: 'Il sole brilla nel cielo.'"
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-ita-p1-e13",
            "type": "quiz",
            "prompt": "Quale parola contiene il suono 'GN' come in 'lavagna'?",
            "options": [
                {"label": "Pigna", "correct": True},
                {"label": "Pena", "correct": False},
                {"label": "Palla", "correct": False}
            ],
            "hint": "Il frutto del pino.",
            "explanation": "'Pigna' contiene il digramma 'gn'."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-ita-p1-e14",
            "type": "quiz",
            "prompt": "Come si dice al plurale (tanti) se al singolare c'è 'LA MELA'?",
            "options": [
                {"label": "Le mele", "correct": True},
                {"label": "I meli", "correct": False},
                {"label": "La mele", "correct": False}
            ],
            "hint": "L'articolo 'la' diventa 'le', 'mela' diventa...",
            "explanation": "Il plurale di 'la mela' è 'le mele'."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-ita-p1-e15",
            "type": "quiz",
            "prompt": "Quale parola è scritta nel modo corretto con la lettera 'Q'?",
            "options": [
                {"label": "Quadro", "correct": True},
                {"label": "Cuadro", "correct": False},
                {"label": "Cquadro", "correct": False}
            ],
            "hint": "La regola dice: prima la Q, poi la U, poi la vocale che vuoi tu.",
            "explanation": "La parola 'quadro' si scrive con 'qu' seguita dalla vocale 'a'."
        }
    },

    # ── P2 (15 quesiti) ────────────────────────────────────────────────────────
    {
        "years": ["P2"],
        "round": {
            "id": "qb-ita-p2-e1",
            "type": "quiz",
            "prompt": "Quale frase richiede l'apostrofo corretto?",
            "options": [
                {"label": "L'albero è fiorito.", "correct": True},
                {"label": "La albero è fiorito.", "correct": False},
                {"label": "L albero è fiorito.", "correct": False}
            ],
            "hint": "Davanti a una vocale l'articolo perde la vocale e prende la gocciolina (apostrofo).",
            "explanation": "L'albero: la vocale 'a' di 'la' cade e viene sostituita dall'apostrofo."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-ita-p2-e2",
            "type": "quiz",
            "prompt": "Quale parola richiede l'accento sulla vocale finale?",
            "options": [
                {"label": "Caffè", "correct": True},
                {"label": "Tavolo", "correct": False},
                {"label": "Scuola", "correct": False}
            ],
            "hint": "La voce sale forte sull'ultima sillaba.",
            "explanation": "La parola 'caffè' è tronca e vuole l'accento sulla 'e' finale."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-ita-p2-e3",
            "type": "quiz",
            "prompt": "Quale parola è un NOME PROPRIO e si deve scrivere con la lettera maiuscola?",
            "options": [
                {"label": "Marco", "correct": True},
                {"label": "Bambino", "correct": False},
                {"label": "Amico", "correct": False}
            ],
            "hint": "È il nome di battesimo di una persona specifica.",
            "explanation": "I nomi propri di persona (come Marco, Sofia, Luca) si scrivono sempre con l'iniziale maiuscola."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-ita-p2-e4",
            "type": "quiz",
            "prompt": "Quale segno di punteggiatura serve per fare una DOMANDA?",
            "options": [
                {"label": "Il punto interrogativo (?)", "correct": True},
                {"label": "Il punto esclamativo (!)", "correct": False},
                {"label": "La virgola (,)", "correct": False}
            ],
            "hint": "Si mette alla fine di una richiesta: 'Come ti chiami?'",
            "explanation": "Le domande si concludono sempre con il punto interrogativo (?)."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-ita-p2-e5",
            "type": "quiz",
            "prompt": "Quale tra queste parole è un NOME FEMMINILE PLURALE?",
            "options": [
                {"label": "Farfalle", "correct": True},
                {"label": "Farfalla", "correct": False},
                {"label": "Uccelli", "correct": False}
            ],
            "hint": "Tante femmine: 'Le...'",
            "explanation": "'Farfalle' è femminile plurale (singolare: farfalla)."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-ita-p2-e6",
            "type": "quiz",
            "prompt": "Quale parola è il CONTRARIO di 'ALTO'?",
            "options": [
                {"label": "Basso", "correct": True},
                {"label": "Grande", "correct": False},
                {"label": "Lungo", "correct": False}
            ],
            "hint": "Il contrario esatto di chi ha una statura elevata.",
            "explanation": "Il contrario di alto è basso."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-ita-p2-e7",
            "type": "dragdrop",
            "mode": "sort",
            "prompt": "Metti queste parole in ORDINE ALFABETICO (dalla A alla Z).",
            "sortItems": ["Barca", "Cane", "Gatto", "Mela"],
            "hint": "Guarda la prima lettera di ciascuna parola: B, C, G, M.",
            "explanation": "B viene prima di C, che viene prima di G, che viene prima di M."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-ita-p2-e8",
            "type": "quiz",
            "prompt": "Quale forma è corretta nella frase: 'Oggi ... una bella giornata'?",
            "options": [
                {"label": "è (con l'accento, voce del verbo essere)", "correct": True},
                {"label": "e (senza accento, congiunzione che unisce)", "correct": False}
            ],
            "hint": "Spiega 'come è' la giornata, quindi è verbo essere.",
            "explanation": "'È' con l'accento è voce del verbo essere; 'e' senza accento serve per unire."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-ita-p2-e9",
            "type": "quiz",
            "prompt": "Quale parola è scritta nel modo corretto con l'apostrofo?",
            "options": [
                {"label": "C'era una volta", "correct": True},
                {"label": "Ci era una volta", "correct": False},
                {"label": "Cera una volta", "correct": False}
            ],
            "hint": "Significa 'ci era'. 'Cera' senza apostrofo è quella delle candele.",
            "explanation": "La forma corretta è 'c'era' (ci era)."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-ita-p2-e10",
            "type": "quiz",
            "prompt": "Come si chiama una persona che aggiusta le automobili?",
            "options": [
                {"label": "Il meccanico", "correct": True},
                {"label": "Il falegname", "correct": False},
                {"label": "Il panettiere", "correct": False}
            ],
            "hint": "Lavora in officina.",
            "explanation": "Il meccanico ripara le auto e i motori."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-ita-p2-e11",
            "type": "quiz",
            "prompt": "Quale tra queste parole è un'ESCLAMAZIONE di sorpresa o gioia?",
            "options": [
                {"label": "Evviva!", "correct": True},
                {"label": "Forse", "correct": False},
                {"label": "Perché", "correct": False}
            ],
            "hint": "Si usa per festeggiare con il punto esclamativo.",
            "explanation": "'Evviva!' è un'esclamazione di gioia."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-ita-p2-e12",
            "type": "dragdrop",
            "mode": "match",
            "prompt": "Abbina ogni animale al verso caratteristico che fa.",
            "leftItems": ["Il cane", "Il gatto", "La rana"],
            "rightItems": ["Abbaia", "Miagola", "Gracida"],
            "pairs": [[0, 0], [1, 1], [2, 2]],
            "hint": "Pensa ai suoni che emettono questi animali.",
            "explanation": "Il cane abbaia, il gatto miagola, la rana gracida."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-ita-p2-e13",
            "type": "quiz",
            "prompt": "Nella frase 'Il gattino BIANCO gioca', la parola BIANCO è...",
            "options": [
                {"label": "Un aggettivo (spiega com'è il gatto)", "correct": True},
                {"label": "Un'azione (verbo)", "correct": False},
                {"label": "Un nome di persona", "correct": False}
            ],
            "hint": "Risponde alla domanda: 'Com'è il gattino?'",
            "explanation": "'Bianco' è un aggettivo qualificativo che descrive una qualità del gatto."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-ita-p2-e14",
            "type": "quiz",
            "prompt": "Quale parola è scritta CORRETTAMENTE senza errori?",
            "options": [
                {"label": "Ombrello", "correct": True},
                {"label": "Onbrello", "correct": False},
                {"label": "Ombrelo", "correct": False}
            ],
            "hint": "Davanti alle lettere 'B' e 'P' si usa sempre la 'M' e mai la 'N'.",
            "explanation": "Regola ortografica: prima di B e P ci vuole sempre la M ('ombrello', 'pompa')."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-ita-p2-e15",
            "type": "quiz",
            "prompt": "Qual è il SINONIMO (parola con significato simile) di 'FELICE'?",
            "options": [
                {"label": "Contento", "correct": True},
                {"label": "Triste", "correct": False},
                {"label": "Arrabbiato", "correct": False}
            ],
            "hint": "Significa che prova gioia.",
            "explanation": "'Contento' è sinonimo di 'felice'."
        }
    },

    # ── P3 (15 quesiti) ────────────────────────────────────────────────────────
    {
        "years": ["P3"],
        "round": {
            "id": "qb-ita-p3-e1",
            "type": "quiz",
            "prompt": "Quale forma verbale completa correttamente la frase: 'Ieri i bambini ... al parco'?",
            "options": [
                {"label": "hanno giocato (passato)", "correct": True},
                {"label": "giocano (presente)", "correct": False},
                {"label": "giocheranno (futuro)", "correct": False}
            ],
            "hint": "La parola 'ieri' indica un'azione già avvenuta nel passato.",
            "explanation": "L'azione è passata (ieri), quindi si usa il passato prossimo 'hanno giocato'."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-ita-p3-e2",
            "type": "quiz",
            "prompt": "Quale frase richiede l'uso della lettera 'H' nel verbo avere?",
            "options": [
                {"label": "Luca ha fame.", "correct": True},
                {"label": "Vado a casa.", "correct": False},
                {"label": "Ti do una caramella a testa.", "correct": False}
            ],
            "hint": "Significa 'egli possiede / prova fame', voce del verbo avere.",
            "explanation": "Quando significa possedere o provare una sensazione si usa 'ha' con l'H."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-ita-p3-e3",
            "type": "quiz",
            "prompt": "Quale tra questi è un ARTICOLO DETERMINATIVO maschile plurale?",
            "options": [
                {"label": "Gli", "correct": True},
                {"label": "Dei", "correct": False},
                {"label": "Un", "correct": False}
            ],
            "hint": "Gli articoli determinativi sono: il, lo, la, i, gli, le.",
            "explanation": "'Gli' è un articolo determinativo maschile plurale (es. 'gli alberi')."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-ita-p3-e4",
            "type": "quiz",
            "prompt": "Nella frase 'Noi CORRIAMO veloce', qual è la persona del verbo 'corriamo'?",
            "options": [
                {"label": "1ª persona plurale (noi)", "correct": True},
                {"label": "2ª persona plurale (voi)", "correct": False},
                {"label": "3ª persona plurale (essi)", "correct": False}
            ],
            "hint": "Il pronome soggetto è 'noi'.",
            "explanation": "Noi corrisponde alla 1ª persona plurale."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-ita-p3-e5",
            "type": "quiz",
            "prompt": "Quale parola è un NOME COLLETTIVO (singolare nella forma, ma indica un insieme di elementi)?",
            "options": [
                {"label": "Gregge (insieme di pecore)", "correct": True},
                {"label": "Pecora", "correct": False},
                {"label": "Pecore", "correct": False}
            ],
            "hint": "Indica un gruppo intero pur essendo una parola singolare.",
            "explanation": "'Gregge', 'mandria', 'flotta' sono nomi collettivi."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-ita-p3-e6",
            "type": "quiz",
            "prompt": "Quale frase usa correttamente 'HANNO' (verbo avere) e 'ANNO' (12 mesi)?",
            "options": [
                {"label": "Quest'anno i ragazzi hanno una nuova maestra.", "correct": True},
                {"label": "Quest'hanno i ragazzi anno una nuova maestra.", "correct": False},
                {"label": "Quest'anno i ragazzi anno una nuova maestra.", "correct": False}
            ],
            "hint": "'Anno' del calendario non ha la H; 'hanno' verbo avere ha la H.",
            "explanation": "L'anno solare è senza H; 'hanno' voce del verbo avere richiede l'H."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-ita-p3-e7",
            "type": "dragdrop",
            "mode": "match",
            "prompt": "Abbina ogni nome primitivo al suo nome derivato.",
            "leftItems": ["Carta", "Pane", "Libro"],
            "rightItems": ["Cartolaio", "Panettiere", "Libreria"],
            "pairs": [[0, 0], [1, 1], [2, 2]],
            "hint": "Cerca la parola che deriva dalla radice del nome base.",
            "explanation": "Cartolaio deriva da carta, panettiere da pane, libreria da libro."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-ita-p3-e8",
            "type": "quiz",
            "prompt": "Nel verbo 'SALIRE', a quale coniugazione appartiene (-are, -ere, -ire)?",
            "options": [
                {"label": "3ª coniugazione (-ire)", "correct": True},
                {"label": "2ª coniugazione (-ere)", "correct": False},
                {"label": "1ª coniugazione (-are)", "correct": False}
            ],
            "hint": "Guarda la desinenza all'infinito: finisce in -ire.",
            "explanation": "I verbi in -are sono della 1ª, in -ere della 2ª, in -ire della 3ª coniugazione."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-ita-p3-e9",
            "type": "quiz",
            "prompt": "Quale parola è un NOME ASTRATTO (qualcosa che non si può toccare con mano ma si prova con la mente o il cuore)?",
            "options": [
                {"label": "Coraggio", "correct": True},
                {"label": "Libro", "correct": False},
                {"label": "Bicicletta", "correct": False}
            ],
            "hint": "Libro e bicicletta sono concreti (si possono toccare).",
            "explanation": "'Coraggio', 'amicizia', 'paura' sono nomi astratti."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-ita-p3-e10",
            "type": "quiz",
            "prompt": "Qual è il CONTRARIO dell'aggettivo 'GENEROSO'?",
            "options": [
                {"label": "Avaro", "correct": True},
                {"label": "Gentile", "correct": False},
                {"label": "Simpatico", "correct": False}
            ],
            "hint": "Chi non vuole condividere nulla.",
            "explanation": "L'opposto di generoso è avaro (o egoista)."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-ita-p3-e11",
            "type": "quiz",
            "prompt": "Quale tra questi è un ARTICOLO INDETERMINATIVO femminile?",
            "options": [
                {"label": "Una", "correct": True},
                {"label": "Un", "correct": False},
                {"label": "Uno", "correct": False}
            ],
            "hint": "Si usa davanti a nomi femminili come 'una mela'.",
            "explanation": "'Una' (o 'un'' davanti a vocale) è articolo indeterminativo femminile."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-ita-p3-e12",
            "type": "dragdrop",
            "mode": "sort",
            "prompt": "Ordina le forme verbali di 'CANTARE' dal passato al futuro.",
            "sortItems": ["Ieri cantai", "Ieri ho cantato", "Oggi canto", "Domani canterò"],
            "hint": "Passato remoto, passato prossimo, presente e poi futuro semplice.",
            "explanation": "Cantai (passato remoto) -> ho cantato -> canto (presente) -> canterò (futuro)."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-ita-p3-e13",
            "type": "quiz",
            "prompt": "Quale parola è un NOME ALTERATO DIMINUTIVO?",
            "options": [
                {"label": "Casetta", "correct": True},
                {"label": "Casone", "correct": False},
                {"label": "Casaccia", "correct": False}
            ],
            "hint": "Indica una casa piccola e graziosa (-etta).",
            "explanation": "'Casetta' è diminutivo, 'casone' accrescitivo, 'casaccia' dispregiativo."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-ita-p3-e14",
            "type": "quiz",
            "prompt": "In quale frase si usa correttamente 'A' preposizione senza H?",
            "options": [
                {"label": "Vado a scuola con lo zaino.", "correct": True},
                {"label": "Vado ha scuola con lo zaino.", "correct": False}
            ],
            "hint": "Risponde alla domanda 'Dove vado?', non è il verbo avere.",
            "explanation": "'A scuola' indica il moto a luogo: è una preposizione semplice e non vuole l'H."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-ita-p3-e15",
            "type": "quiz",
            "prompt": "Come si chiama la parte finale invariabile della frase che dà un ritmo poetico uguale tra due versi?",
            "options": [
                {"label": "Rima", "correct": True},
                {"label": "Capoverso", "correct": False},
                {"label": "Titolo", "correct": False}
            ],
            "hint": "Come 'stella' e 'bella'.",
            "explanation": "L'uguaglianza di suono tra due parole a partire dall'accento tonico si chiama rima."
        }
    },

    # ── P4 (15 quesiti) ────────────────────────────────────────────────────────
    {
        "years": ["P4"],
        "round": {
            "id": "qb-ita-p4-e1",
            "type": "quiz",
            "prompt": "Nell'analisi grammaticale, che cos'è la parola 'MOLTO' nella frase 'Il gelato è MOLTO buono'?",
            "options": [
                {"label": "Un avverbio (modifica l'aggettivo 'buono')", "correct": True},
                {"label": "Un nome comune", "correct": False},
                {"label": "Un articolo determinativo", "correct": False}
            ],
            "hint": "È una parola invariabile che indica la quantità o intensità.",
            "explanation": "'Molto' che precisa l'intensità di un aggettivo è un avverbio di quantità."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-ita-p4-e2",
            "type": "quiz",
            "prompt": "Qual è il grado dell'aggettivo nella frase: 'La giraffa è PIÙ ALTA del cavallo'?",
            "options": [
                {"label": "Comparativo di maggioranza", "correct": True},
                {"label": "Superlativo assoluto", "correct": False},
                {"label": "Comparativo di minoranza", "correct": False}
            ],
            "hint": "Confronta due elementi con la parola 'più... di'.",
            "explanation": "'Più alta di' è un comparativo di maggioranza tra due termini di paragone."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-ita-p4-e3",
            "type": "quiz",
            "prompt": "Quale forma verbale è al MODO GERUNDIO?",
            "options": [
                {"label": "Correndo", "correct": True},
                {"label": "Corso", "correct": False},
                {"label": "Correre", "correct": False}
            ],
            "hint": "I gerundi finiscono in -ando o -endo.",
            "explanation": "'Correndo' è il gerundio presente del verbo correre."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-ita-p4-e4",
            "type": "quiz",
            "prompt": "Quale tra queste è una PREPOSIZIONE ARTICOLATA (preposizione semplice + articolo determinativo)?",
            "options": [
                {"label": "Sullo (su + lo)", "correct": True},
                {"label": "Su", "correct": False},
                {"label": "Lo", "correct": False}
            ],
            "hint": "Nasce dalla fusione della preposizione 'su' con l'articolo 'lo'.",
            "explanation": "'Sullo' è una preposizione articolata (formata da su + lo)."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-ita-p4-e5",
            "type": "quiz",
            "prompt": "Quale parola è un PRONOME POSSESSIVO nella frase: 'Questo è il mio libro, dov'è il TUO?'?",
            "options": [
                {"label": "Tuo (sostituisce la parola 'libro')", "correct": True},
                {"label": "Mio (accompagna la parola 'libro')", "correct": False},
                {"label": "Libro", "correct": False}
            ],
            "hint": "Il pronome sta al posto del nome e non è seguito dal sostantivo.",
            "explanation": "'Tuo' sta da solo al posto di 'tuo libro', quindi è un pronome possessivo."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-ita-p4-e6",
            "type": "quiz",
            "prompt": "A quale tempo del modo indicativo appartiene il verbo 'EGLI AVEVA PARLATO'?",
            "options": [
                {"label": "Trapassato prossimo", "correct": True},
                {"label": "Passato prossimo", "correct": False},
                {"label": "Imperfetto", "correct": False}
            ],
            "hint": "È formato dall'imperfetto dell'ausiliare (aveva) + participio passato (parlato).",
            "explanation": "Imperfetto ausiliare + participio = Trapassato prossimo."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-ita-p4-e7",
            "type": "dragdrop",
            "mode": "match",
            "prompt": "Abbina ogni modo verbale indefinito al suo esempio.",
            "leftItems": ["Infinito", "Participio passato", "Gerundio"],
            "rightItems": ["Studiare", "Studiato", "Studiando"],
            "pairs": [[0, 0], [1, 1], [2, 2]],
            "hint": "I modi indefiniti non specificano la persona (io, tu...).",
            "explanation": "Studiare (infinito), studiato (participio), studiando (gerundio)."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-ita-p4-e8",
            "type": "quiz",
            "prompt": "Qual è il SUPERLATIVO ASSOLUTO dell'aggettivo 'RICCO'?",
            "options": [
                {"label": "Ricchissimo", "correct": True},
                {"label": "Più ricco", "correct": False},
                {"label": "Il più ricco di tutti", "correct": False}
            ],
            "hint": "Usa il suffisso '-issimo' per esprimere il grado massimo senza confronto.",
            "explanation": "'Ricchissimo' è il superlativo assoluto."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-ita-p4-e9",
            "type": "quiz",
            "prompt": "Come si chiama un testo che racconta una storia inventata o reale con personaggi, tempo e luogo?",
            "options": [
                {"label": "Testo narrativo", "correct": True},
                {"label": "Testo descrittivo", "correct": False},
                {"label": "Testo regolativo", "correct": False}
            ],
            "hint": "Narrare significa raccontare una sequenza di eventi.",
            "explanation": "Il testo narrativo racconta vicende di personaggi collocate nel tempo e nello spazio."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-ita-p4-e10",
            "type": "quiz",
            "prompt": "Quale tra queste congiunzioni indica una CAUSA o spiegazione?",
            "options": [
                {"label": "Perché", "correct": True},
                {"label": "Ma", "correct": False},
                {"label": "O", "correct": False}
            ],
            "hint": "Risponde alla domanda: 'Per quale motivo?'",
            "explanation": "'Perché' introduce una spiegazione causale."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-ita-p4-e11",
            "type": "quiz",
            "prompt": "Nella frase 'Mio fratello ha letto UN libro INTERESSANTE', la parola INTERESSANTE è...",
            "options": [
                {"label": "Un aggettivo qualificativo", "correct": True},
                {"label": "Un nome proprio", "correct": False},
                {"label": "Un verbo all'infinito", "correct": False}
            ],
            "hint": "Descrive una qualità del libro.",
            "explanation": "'Interessante' è un aggettivo qualificativo a due uscite (maschile e femminile)."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-ita-p4-e12",
            "type": "dragdrop",
            "mode": "sort",
            "prompt": "Ordina i gradi dell'aggettivo 'bello' dal grado base al superlativo.",
            "sortItems": ["Bello (positivo)", "Più bello (comparativo)", "Il più bello (superlativo relativo)", "Bellissimo (superlativo assoluto)"],
            "hint": "Grado positivo, comparativo, superlativo relativo e infine assoluto.",
            "explanation": "Scala dei gradi dell'aggettivo qualificativo."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-ita-p4-e13",
            "type": "quiz",
            "prompt": "Quale tra questi è un NOME COMPOSTO (formato da due parole unite)?",
            "options": [
                {"label": "Portapenne (porta + penne)", "correct": True},
                {"label": "Pennarello", "correct": False},
                {"label": "Astuccio", "correct": False}
            ],
            "hint": "Nasce dall'unione di due parole distinte che formano un unico oggetto.",
            "explanation": "I nomi composti sono formati da due parole unite (es. portapenne, capotreno, aspirapolvere)."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-ita-p4-e14",
            "type": "quiz",
            "prompt": "Quale figura retorica mette a confronto due cose usando la parola 'COME' (es. 'Agile come una gazzella')?",
            "options": [
                {"label": "Similitudine", "correct": True},
                {"label": "Metafora", "correct": False},
                {"label": "Personificazione", "correct": False}
            ],
            "hint": "Stabilisce un paragone esplicito con 'come', 'sembra', 'assomiglia'.",
            "explanation": "La similitudine è un confronto introdotto da connettivi come 'come' o 'simile a'."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-ita-p4-e15",
            "type": "quiz",
            "prompt": "Quale dei seguenti verbi è espresso al tempo PASSATO REMOTO?",
            "options": [
                {"label": "Egli scrisse", "correct": True},
                {"label": "Egli scriveva", "correct": False},
                {"label": "Egli ha scritto", "correct": False}
            ],
            "hint": "Indica un'azione conclusa in un passato lontano.",
            "explanation": "'Scrisse' è la 3ª persona singolare del passato remoto di scrivere."
        }
    },

    # ── P5 (15 quesiti) ────────────────────────────────────────────────────────
    {
        "years": ["P5"],
        "round": {
            "id": "qb-ita-p5-e1",
            "type": "quiz",
            "prompt": "Quale modo verbale si usa per esprimere un dubbio, un desiderio o una possibilità (es. 'Credo che tu ...')?",
            "options": [
                {"label": "Modo Congiuntivo", "correct": True},
                {"label": "Modo Indicativo", "correct": False},
                {"label": "Modo Imperativo", "correct": False}
            ],
            "hint": "Spesso è introdotto dalla parolina 'che' ('che io sia, che tu abbia...').",
            "explanation": "Il congiuntivo è il modo della possibilità, del dubbio e del desiderio."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-ita-p5-e2",
            "type": "quiz",
            "prompt": "Quale forma verbale completa correttamente la frase: 'Se avessi le ali, ... in cielo'?",
            "options": [
                {"label": "volerei (condizionale)", "correct": True},
                {"label": "volavo (imperfetto)", "correct": False},
                {"label": "volerò (futuro)", "correct": False}
            ],
            "hint": "Dopo 'se avessi' (congiuntivo trapassato) ci vuole il condizionale presente.",
            "explanation": "Periodo ipotetico della possibilità: Se + congiuntivo trapassato -> condizionale presente ('volerei')."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-ita-p5-e3",
            "type": "quiz",
            "prompt": "Nella frase 'Il libro CHE leggo è avvincente', la parola 'CHE' è...",
            "options": [
                {"label": "Un pronome relativo (significa 'il quale')", "correct": True},
                {"label": "Una congiunzione", "correct": False},
                {"label": "Un articolo", "correct": False}
            ],
            "hint": "Sostituisce il nome 'libro' collegando le due frasi.",
            "explanation": "'Che' pronome relativo sta al posto di 'il quale libro'."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-ita-p5-e4",
            "type": "quiz",
            "prompt": "Che cos'è una METAFORA in poesia?",
            "options": [
                {"label": "Una similitudine abbreviata senza la parola 'come' (es. 'Sei un leone')", "correct": True},
                {"label": "Una parola con molte lettere doppie", "correct": False},
                {"label": "Un racconto in versi senza punteggiatura", "correct": False}
            ],
            "hint": "Trasferisce direttamente il significato di una parola a un'altra.",
            "explanation": "La metafora sostituisce un termine con un altro con cui ha un rapporto di analogia senza usare 'come'."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-ita-p5-e5",
            "type": "quiz",
            "prompt": "Nella frase 'Marco mangia UNA MELA', che ruolo sintattico svolge 'UNA MELA' nell'analisi logica?",
            "options": [
                {"label": "Complemento oggetto (risponde a: chi? che cosa?)", "correct": True},
                {"label": "Soggetto", "correct": False},
                {"label": "Complemento di termine", "correct": False}
            ],
            "hint": "Riceve direttamente l'azione del verbo 'mangia'.",
            "explanation": "Il complemento oggetto risponde alla domanda 'che cosa?' ed è collegato direttamente al verbo transitivo."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-ita-p5-e6",
            "type": "quiz",
            "prompt": "Quale figura retorica consiste nell'attribuire azioni o sentimenti umani a cose inanimate o animali (es. 'Il vento sussurra')?",
            "options": [
                {"label": "Personificazione", "correct": True},
                {"label": "Iperbole", "correct": False},
                {"label": "Allitterazione", "correct": False}
            ],
            "hint": "Fa agire una cosa come se fosse una 'persona'.",
            "explanation": "La personificazione dà voce e comportamenti umani a concetti astratti, oggetti o elementi naturali."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-ita-p5-e7",
            "type": "dragdrop",
            "mode": "match",
            "prompt": "Abbina ogni modo verbale finito al suo uso prevalente.",
            "leftItems": ["Indicativo", "Congiuntivo", "Condizionale"],
            "rightItems": ["Certezza e realtà", "Dubbio e possibilità", "Condizione o cortesia"],
            "pairs": [[0, 0], [1, 1], [2, 2]],
            "hint": "L'indicativo esprime fatti reali, il congiuntivo desideri, il condizionale ciò che accadrebbe a certe condizioni.",
            "explanation": "Valore semantico dei tre grandi modi verbali della lingua italiana."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-ita-p5-e8",
            "type": "quiz",
            "prompt": "Qual è il predicato verbale nella frase: 'La rondine vola alta nel cielo'?",
            "options": [
                {"label": "Vola", "correct": True},
                {"label": "La rondine", "correct": False},
                {"label": "Nel cielo", "correct": False}
            ],
            "hint": "È il verbo che indica l'azione compiuta dal soggetto.",
            "explanation": "Il predicato verbale è l'azione: 'vola'."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-ita-p5-e9",
            "type": "quiz",
            "prompt": "Che cos'è un TESTO ARGOMENTATIVO?",
            "options": [
                {"label": "Un testo in cui l'autore esprime una tesi e porta prove e ragionamenti per sostenerla", "correct": True},
                {"label": "Una ricetta di cucina con gli ingredienti", "correct": False},
                {"label": "Una poesia d'amore in rima alternata", "correct": False}
            ],
            "hint": "Cerca di convincere il lettore della propria opinione (tesi).",
            "explanation": "Il testo argomentativo espone una tesi sostenuta da argomenti logici e dati per convincere chi legge."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-ita-p5-e10",
            "type": "quiz",
            "prompt": "Quale tra queste parole è un AGGETTIVO DIMOSTRATIVO?",
            "options": [
                {"label": "Questo", "correct": True},
                {"label": "Mio", "correct": False},
                {"label": "Qualche", "correct": False}
            ],
            "hint": "Indica la posizione nello spazio o nel tempo rispetto a chi parla (questo, quello).",
            "explanation": "'Questo', 'codesto', 'quello' sono aggettivi dimostrativi."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-ita-p5-e11",
            "type": "quiz",
            "prompt": "Come si chiama il predicato formato dal verbo ESSERE seguito da un aggettivo o un nome (es. 'Il mare È CALMO')?",
            "options": [
                {"label": "Predicato nominale", "correct": True},
                {"label": "Predicato verbale", "correct": False},
                {"label": "Attributo", "correct": False}
            ],
            "hint": "Copula (è) + parte nominale (calmo).",
            "explanation": "Verbo essere (copula) + nome/aggettivo costituiscono il predicato nominale."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-ita-p5-e12",
            "type": "dragdrop",
            "mode": "sort",
            "prompt": "Ordina le fasi tipiche della struttura di un racconto narrativo.",
            "sortItems": ["Situazione iniziale", "Sviluppo ed eventi", "Climax (momento di massima tensione)", "Conclusione e finale"],
            "hint": "Dall'inizio alla risoluzione finale.",
            "explanation": "Schema narrativo classico: esordio -> peripezie -> culmine -> scioglimento."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-ita-p5-e13",
            "type": "quiz",
            "prompt": "Quale frase contiene un errore nell'accordo tra soggetto e verbo?",
            "options": [
                {"label": "Il gruppo di studenti sono partiti.", "correct": True},
                {"label": "Il gruppo di studenti è partito.", "correct": False},
                {"label": "Gli studenti sono partiti.", "correct": False}
            ],
            "hint": "Il soggetto grammaticale è 'il gruppo' (singolare).",
            "explanation": "'Il gruppo' è singolare, quindi il verbo deve concordare al singolare: 'è partito'."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-ita-p5-e14",
            "type": "quiz",
            "prompt": "Che cosa indica il modo IMPERATIVO?",
            "options": [
                {"label": "Un comando, un ordine o un'istruzione (es. 'Ascolta!')", "correct": True},
                {"label": "Un desiderio nel passato", "correct": False},
                {"label": "Un'azione ipotetica", "correct": False}
            ],
            "hint": "Si usa per dare ordini o consigli energici.",
            "explanation": "Il modo imperativo serve per esprimere ordini, divieti, preghiere o esortazioni."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-ita-p5-e15",
            "type": "quiz",
            "prompt": "Quale coppia di parole presenta una relazione di OMONIMIA (si scrivono e pronunciano uguali ma hanno significati diversi)?",
            "options": [
                {"label": "Riso (cereale) e Riso (ridere)", "correct": True},
                {"label": "Alto e Basso", "correct": False},
                {"label": "Casa e Abitazione", "correct": False}
            ],
            "hint": "La stessa identica parola indica sia il cibo che la risata.",
            "explanation": "Gli omonimi sono parole con identica grafia e pronuncia ma significato diverso."
        }
    },

    # ── S1 (15 quesiti) ────────────────────────────────────────────────────────
    {
        "years": ["S1"],
        "round": {
            "id": "qb-ita-s1-e1",
            "type": "quiz",
            "prompt": "Nell'analisi logica, a quale domanda risponde il COMPLEMENTO DI SPECIFICAZIONE?",
            "options": [
                {"label": "Di chi? Di che cosa?", "correct": True},
                {"label": "A chi? A che cosa?", "correct": False},
                {"label": "Dove? In quale luogo?", "correct": False}
            ],
            "hint": "È introdotto dalla preposizione 'di' (es. 'Il libro DI PAOLO').",
            "explanation": "Il complemento di specificazione specifica e chiarisce il significato del termine a cui si riferisce."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-ita-s1-e2",
            "type": "quiz",
            "prompt": "Qual è il grande poema epico attribuito a Omero che narra il lungo viaggio di ritorno di Ulisse a Itaca?",
            "options": [
                {"label": "Odissea", "correct": True},
                {"label": "Iliade", "correct": False},
                {"label": "Eneide", "correct": False}
            ],
            "hint": "Ulisse in greco si chiama Odisseo.",
            "explanation": "L'Odissea narra le avventure e le peregrinazioni di Odisseo (Ulisse) nel Mar Mediterraneo."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-ita-s1-e3",
            "type": "quiz",
            "prompt": "Nell'analisi logica, come si chiama il complemento che indica verso quale persona o cosa è diretta l'azione, introdotto da 'A' (es. 'Ho telefonato A MARCO')?",
            "options": [
                {"label": "Complemento di termine", "correct": True},
                {"label": "Complemento di specificazione", "correct": False},
                {"label": "Complemento di causa", "correct": False}
            ],
            "hint": "Risponde alla domanda: 'A chi? A che cosa?'.",
            "explanation": "Il complemento di termine individua l'elemento su cui termina l'azione del predicato."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-ita-s1-e4",
            "type": "quiz",
            "prompt": "Qual è la differenza fondamentale tra MITO e FAVOLA?",
            "options": [
                {"label": "Il mito spiega l'origine del mondo o degli dei, la favola ha protagonisti animali e una morale educativa", "correct": True},
                {"label": "Il mito è scritto solo in versi, la favola solo in latino", "correct": False},
                {"label": "Non c'è alcuna differenza", "correct": False}
            ],
            "hint": "Pensa alle favole di Esopo con la volpe e l'uva e ai miti greci dell'Olimpo.",
            "explanation": "Il mito è un racconto sacro sulle origini; la favola ha intento morale con animali parlanti."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-ita-s1-e5",
            "type": "quiz",
            "prompt": "Quale complemento logico è presente nella parte evidenziata: 'Pico corre IN GIARDINO'?",
            "options": [
                {"label": "Complemento di stato in luogo", "correct": True},
                {"label": "Complemento di specificazione", "correct": False},
                {"label": "Complemento di modo", "correct": False}
            ],
            "hint": "Indica il luogo in cui si svolge l'azione: 'Dove?'.",
            "explanation": "'In giardino' indica il luogo fermo o lo spazio in cui avviene l'azione (stato in luogo)."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-ita-s1-e6",
            "type": "quiz",
            "prompt": "Chi è l'autore latino dell'ENEIDE, il poema sulle origini di Roma fondate dall'eroe Enea?",
            "options": [
                {"label": "Virgilio", "correct": True},
                {"label": "Omero", "correct": False},
                {"label": "Dante Alighieri", "correct": False}
            ],
            "hint": "Poeta romano dell'età augustea.",
            "explanation": "L'Eneide fu composta da Publio Virgilio Marone per celebrare la grandezza di Roma e Augusto."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-ita-s1-e7",
            "type": "dragdrop",
            "mode": "match",
            "prompt": "Abbina ogni grande eroe epico al poema in cui è protagonista.",
            "leftItems": ["Achille", "Ulisse", "Enea"],
            "rightItems": ["Iliade", "Odissea", "Eneide"],
            "pairs": [[0, 0], [1, 1], [2, 2]],
            "hint": "Achille combatte a Troia nell'Iliade, Ulisse torna a Itaca, Enea fugge da Troia verso l'Italia.",
            "explanation": "I tre grandi protagonisti dei capolavori dell'epica classica studiati in 1ª media."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-ita-s1-e8",
            "type": "quiz",
            "prompt": "Nella frase 'Sofia studia CON ATTENZIONE', che complemento logico è 'CON ATTENZIONE'?",
            "options": [
                {"label": "Complemento di modo (risponde a: come? in che modo?)", "correct": True},
                {"label": "Complemento di mezzo", "correct": False},
                {"label": "Complemento di tempo", "correct": False}
            ],
            "hint": "Spiega la modalità con cui Sofia sta studiando.",
            "explanation": "Il complemento di modo risponde alla domanda 'come? in quale maniera?'."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-ita-s1-e9",
            "type": "quiz",
            "prompt": "Quale delle seguenti è una frase con SOGGETTO SOTTINTESO?",
            "options": [
                {"label": "Siamo partiti all'alba. (Soggetto sottinteso: Noi)", "correct": True},
                {"label": "I ragazzi giocano nel parco.", "correct": False},
                {"label": "Il vento soffiava forte.", "correct": False}
            ],
            "hint": "Il pronome soggetto non è scritto apertamente ma si capisce dalla desinenza del verbo.",
            "explanation": "In 'Siamo partiti' il soggetto non compare espressamente: è sottinteso 'noi'."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-ita-s1-e10",
            "type": "quiz",
            "prompt": "Che cos'è l'EPITETO nell'epica classica (es. 'Achille pié veloce', 'Atena occhi azzurri')?",
            "options": [
                {"label": "Un aggettivo o formula fissa che caratterizza costantemente un personaggio", "correct": True},
                {"label": "Un insulto rivolto al nemico prima del duello", "correct": False},
                {"label": "Il nome della nave degli achei", "correct": False}
            ],
            "hint": "Formula ricorrente tipica dei canti orali omerici.",
            "explanation": "L'epiteto è una formula formulare fissa che accompagnava i personaggi nell'epica classica."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-ita-s1-e11",
            "type": "quiz",
            "prompt": "Quale complemento logico risponde alla domanda 'Da quando? Per quanto tempo? Quando?'?",
            "options": [
                {"label": "Complemento di tempo (determinato o continuato)", "correct": True},
                {"label": "Complemento di causa", "correct": False},
                {"label": "Complemento di luogo", "correct": False}
            ],
            "hint": "Colloca l'azione sulla linea temporale.",
            "explanation": "Il complemento di tempo determinato precisa il momento, quello continuato la durata."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-ita-s1-e12",
            "type": "dragdrop",
            "mode": "sort",
            "prompt": "Ordina i complementi logici in base alla domanda a cui rispondono: [Chi/Che cosa?], [Di chi?], [A chi?], [Dove?].",
            "sortItems": ["Complemento oggetto", "Complemento di specificazione", "Complemento di termine", "Complemento di luogo"],
            "hint": "Oggetto diretto -> specificazione -> termine -> luogo.",
            "explanation": "Corrispondenza tra domande canoniche e complementi principali dell'analisi logica."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-ita-s1-e13",
            "type": "quiz",
            "prompt": "Quale tra queste figure retoriche consiste nella ripetizione degli stessi suoni o lettere all'inizio o all'interno di parole vicine (es. 'Caddi come corpo morto cade')?",
            "options": [
                {"label": "Allitterazione", "correct": True},
                {"label": "Onomatopea", "correct": False},
                {"label": "Ossimoro", "correct": False}
            ],
            "hint": "Ripetizione della stessa consonante o sillaba per creare musicalità.",
            "explanation": "L'allitterazione è la ripetizione di lettere o suoni simili in parole contigue."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-ita-s1-e14",
            "type": "quiz",
            "prompt": "Come si chiama una parola che imita direttamente un rumore naturale o suono (es. 'tic-tac', 'miao', 'fruscio', 'tintinnio')?",
            "options": [
                {"label": "Onomatopea", "correct": True},
                {"label": "Metafora", "correct": False},
                {"label": "Sinestesia", "correct": False}
            ],
            "hint": "Copia acusticamente il suono che descrive.",
            "explanation": "L'onomatopea è una parola o espressione che evoca o riproduce il suono reale."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-ita-s1-e15",
            "type": "quiz",
            "prompt": "Nella frase passiva 'La mela è stata mangiata DA MARCO', 'DA MARCO' è...",
            "options": [
                {"label": "Complemento d'agente (indica chi compie l'azione nella frase passiva)", "correct": True},
                {"label": "Soggetto", "correct": False},
                {"label": "Complemento di causa", "correct": False}
            ],
            "hint": "Risponde alla domanda: 'Da parte di chi?'. Se fosse una cosa sarebbe 'causa efficiente'.",
            "explanation": "Il complemento d'agente indica l'essere animato da cui è compiuta l'azione retta da un verbo passivo."
        }
    },

    # ── S2 (15 quesiti) ────────────────────────────────────────────────────────
    {
        "years": ["S2"],
        "round": {
            "id": "qb-ita-s2-e1",
            "type": "quiz",
            "prompt": "In narratologia, come si chiama il salto all'indietro nel tempo in cui il narratore racconta fatti accaduti prima (flashback)?",
            "options": [
                {"label": "Analessi (o flashback)", "correct": True},
                {"label": "Prolessi (o flashforward)", "correct": False},
                {"label": "Ellissi", "correct": False}
            ],
            "hint": "La prolessi anticipa il futuro, l'analessi rievoca il passato.",
            "explanation": "L'analessi consiste nell'evocazione a ritroso di eventi anteriori al punto della storia."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-ita-s2-e2",
            "type": "quiz",
            "prompt": "Nell'analisi logica, a quale domanda risponde il COMPLEMENTO DI CAUSA?",
            "options": [
                {"label": "Per quale motivo? A causa di che cosa?", "correct": True},
                {"label": "A quale scopo? Con quale fine?", "correct": False},
                {"label": "Per mezzo di che cosa?", "correct": False}
            ],
            "hint": "Es. 'Tremava PER LA PAURA'.",
            "explanation": "Il complemento di causa esprime il motivo o la circostanza che genera l'azione del predicato."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-ita-s2-e3",
            "type": "quiz",
            "prompt": "Qual è il genere letterario caratterizzato da un enigma, un delitto da risolvere, indizi, sospettati e un investigatore?",
            "options": [
                {"label": "Romanzo giallo (o poliziesco)", "correct": True},
                {"label": "Romanzo fantasy", "correct": False},
                {"label": "Romanzo storico", "correct": False}
            ],
            "hint": "Pensa a Sherlock Holmes o Hercule Poirot.",
            "explanation": "Il giallo ruota attorno all'indagine logica su un delitto o mistero da chiarire."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-ita-s2-e4",
            "type": "quiz",
            "prompt": "Nella frase 'Ho aperto la scatola CON LE FORBICI', 'CON LE FORBICI' è...",
            "options": [
                {"label": "Complemento di mezzo (o strumento)", "correct": True},
                {"label": "Complemento di modo", "correct": False},
                {"label": "Complemento di compagnia", "correct": False}
            ],
            "hint": "Risponde a: 'Per mezzo di quale strumento?'.",
            "explanation": "Il complemento di mezzo indica l'oggetto inanimato o lo strumento usato per compiere l'azione."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-ita-s2-e5",
            "type": "quiz",
            "prompt": "Qual è la differenza in narratologia tra FABULA e INTRECCIO?",
            "options": [
                {"label": "La fabula segue l'ordine cronologico naturale degli eventi; l'intreccio è l'ordine in cui l'autore sceglie di raccontarli", "correct": True},
                {"label": "La fabula è la traduzione francese dell'intreccio", "correct": False},
                {"label": "La fabula riguarda solo i personaggi negativi", "correct": False}
            ],
            "hint": "L'autore può usare flashback e anticipazioni per cambiare l'ordine cronologico (intreccio).",
            "explanation": "Fabula = sequenza cronologica reale; intreccio = montaggio narrativo degli eventi."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-ita-s2-e6",
            "type": "quiz",
            "prompt": "Nella frase 'Vado al cinema CON CHIARA', 'CON CHIARA' è...",
            "options": [
                {"label": "Complemento di compagnia", "correct": True},
                {"label": "Complemento di unione", "correct": False},
                {"label": "Complemento di mezzo", "correct": False}
            ],
            "hint": "È una persona (essere vivente): se fosse una cosa sarebbe 'unione' (es. 'con l'ombrello').",
            "explanation": "Con un essere animato si ha il complemento di compagnia; con un oggetto inanimato il complemento di unione."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-ita-s2-e7",
            "type": "dragdrop",
            "mode": "match",
            "prompt": "Abbina ogni tipo di narratore alla sua caratteristica.",
            "leftItems": ["Narratore interno", "Narratore esterno onnisciente", "Narratore esterno nascosto"],
            "rightItems": ["Racconta in prima persona (io) ed è un personaggio", "Sa tutto dei personaggi, anche pensieri intimi", "Registra i fatti in modo oggettivo come una telecamera"],
            "pairs": [[0, 0], [1, 1], [2, 2]],
            "hint": "Distingui punto di vista in prima e terza persona.",
            "explanation": "Tipologie del patto narrativo e focalizzazione studiate in 2ª media."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-ita-s2-e8",
            "type": "quiz",
            "prompt": "Nell'analisi logica, a quale domanda risponde il COMPLEMENTO DI FINE (o scopo)?",
            "options": [
                {"label": "Per quale fine? Con quale obiettivo?", "correct": True},
                {"label": "A causa di chi?", "correct": False},
                {"label": "In che modo?", "correct": False}
            ],
            "hint": "Es. 'Si allena PER LA GARA'.",
            "explanation": "Il complemento di fine indica lo scopo o l'obiettivo verso cui è tesa l'azione."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-ita-s2-e9",
            "type": "quiz",
            "prompt": "Chi è l'autore del capolavoro della letteratura italiana 'I PROMESSI SPOSI'?",
            "options": [
                {"label": "Alessandro Manzoni", "correct": True},
                {"label": "Giacomo Leopardi", "correct": False},
                {"label": "Giovanni Boccaccio", "correct": False}
            ],
            "hint": "Scrittore milanese del Romanticismo ottocentesco.",
            "explanation": "Alessandro Manzoni pubblicò la versione definitiva de 'I Promessi Sposi' nel 1840."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-ita-s2-e10",
            "type": "quiz",
            "prompt": "Nella frase 'La finestra è stata rotta DAL VENTO', 'DAL VENTO' è...",
            "options": [
                {"label": "Complemento di causa efficiente (cosa inanimata che compie l'azione nella frase passiva)", "correct": True},
                {"label": "Complemento d'agente", "correct": False},
                {"label": "Complemento di modo", "correct": False}
            ],
            "hint": "Il vento non è una persona: è una forza inanimata della natura.",
            "explanation": "In una frase passiva, l'essere inanimato o forza naturale che compie l'azione è complemento di causa efficiente."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-ita-s2-e11",
            "type": "quiz",
            "prompt": "Come si chiama un'esagerazione voluta per dare risalto a un concetto (es. 'Ti ho aspettato un milione di anni!')?",
            "options": [
                {"label": "Iperbole", "correct": True},
                {"label": "Litote", "correct": False},
                {"label": "Antitesi", "correct": False}
            ],
            "hint": "Figura retorica che esagera la realtà per enfasi.",
            "explanation": "L'iperbole consiste nell'esagerare per eccesso o per difetto un concetto per renderlo incisivo."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-ita-s2-e12",
            "type": "dragdrop",
            "mode": "sort",
            "prompt": "Ordina i complementi logici in base alle preposizioni che solitamente li introducono.",
            "sortItems": ["Specif.: 'di'", "Termine: 'a'", "Luogo: 'in / a / da'", "Causa: 'per / a causa di'"],
            "hint": "Segui l'ordine: specificazione, termine, luogo, causa.",
            "explanation": "Corrispondenza tra segnali preposizionali e complementi indiretti."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-ita-s2-e13",
            "type": "quiz",
            "prompt": "Che cos'è l'OSSIMORO in una poesia (es. 'silenzio assordante', 'ghiaccio bollente')?",
            "options": [
                {"label": "L'accostamento di due parole di significato opposto e apparentemente inconciliabile", "correct": True},
                {"label": "Una rima imperfetta tra due vocali", "correct": False},
                {"label": "La ripetizione del nome proprio dell'autore", "correct": False}
            ],
            "hint": "Unisce due concetti che sembrano contraddirsi.",
            "explanation": "L'ossimoro unisce nella stessa locuzione due termini semanticamente contraddittori."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-ita-s2-e14",
            "type": "quiz",
            "prompt": "In un romanzo, come si chiama il personaggio principale che si oppone all'eroe (protagonista)?",
            "options": [
                {"label": "Antagonista", "correct": True},
                {"label": "Aiutante", "correct": False},
                {"label": "Comparsa", "correct": False}
            ],
            "hint": "Crea ostacoli e si scontra con il protagonista.",
            "explanation": "L'antagonista è il personaggio che persegue scopi opposti a quelli del protagonista."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-ita-s2-e15",
            "type": "quiz",
            "prompt": "Quale complemento logico compare in: 'È famoso PER LA SUA ONESTÀ'?",
            "options": [
                {"label": "Complemento di causa", "correct": True},
                {"label": "Complemento di fine", "correct": False},
                {"label": "Complemento di modo", "correct": False}
            ],
            "hint": "A causa di che cosa è famoso? Per il motivo della sua onestà.",
            "explanation": "'Per la sua onestà' indica il motivo (causa) della notorietà."
        }
    },

    # ── S3 (15 quesiti) ────────────────────────────────────────────────────────
    {
        "years": ["S3"],
        "round": {
            "id": "qb-ita-s3-e1",
            "type": "quiz",
            "prompt": "Nell'analisi del periodo, come si chiama la proposizione principale che può reggersi da sola e ha senso compiuto autonomo?",
            "options": [
                {"label": "Proposizione principale (o indipendente)", "correct": True},
                {"label": "Proposizione subordinata", "correct": False},
                {"label": "Proposizione incidentale", "correct": False}
            ],
            "hint": "È il cuore del periodo e non dipende da nessun'altra frase.",
            "explanation": "La proposizione principale regge il periodo e gode di autonomia semantica e sintattica."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-ita-s3-e2",
            "type": "quiz",
            "prompt": "Nella frase 'Esco PERCHÉ DEVO COMPRARE IL PANE', che tipo di proposizione subordinata è 'perché devo comprare il pane'?",
            "options": [
                {"label": "Subordinata causale", "correct": True},
                {"label": "Subordinata finale", "correct": False},
                {"label": "Subordinata temporale", "correct": False}
            ],
            "hint": "Indica il motivo (la causa) per cui esco.",
            "explanation": "La proposizione causale esprime la causa o la ragione di quanto affermato nella reggente."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-ita-s3-e3",
            "type": "quiz",
            "prompt": "Chi è l'autore della celebre poesia 'L'INFINITO' ('Sempre caro mi fu quest'ermo colle...')?",
            "options": [
                {"label": "Giacomo Leopardi", "correct": True},
                {"label": "Giovanni Pascoli", "correct": False},
                {"label": "Giosuè Carducci", "correct": False}
            ],
            "hint": "Poeta di Recanati, tra i massimi del Romanticismo europeo.",
            "explanation": "Giacomo Leopardi compose 'L'Infinito' a Recanati nel 1819."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-ita-s3-e4",
            "type": "quiz",
            "prompt": "Nella frase 'Studio AFFINCHÉ POSSA SUPERARE L'ESAME', la subordinata introdotta da 'affinché' è...",
            "options": [
                {"label": "Subordinata finale (indica lo scopo o fine)", "correct": True},
                {"label": "Subordinata causale", "correct": False},
                {"label": "Subordinata consecutiva", "correct": False}
            ],
            "hint": "Risponde a: 'Con quale obiettivo/fine?'. Vuole il congiuntivo.",
            "explanation": "La subordinata finale esprime il fine verso cui è diretta l'azione della reggente."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-ita-s3-e5",
            "type": "quiz",
            "prompt": "Quale grande scrittore siciliano fu il capofila del VERISMO italiano e scrisse 'I Malavoglia' e 'Rosso Malpelo'?",
            "options": [
                {"label": "Giovanni Verga", "correct": True},
                {"label": "Luigi Pirandello", "correct": False},
                {"label": "Italo Calvino", "correct": False}
            ],
            "hint": "Autore della poetica dell'impersonalità.",
            "explanation": "Giovanni Verga fu il massimo esponente del Verismo ottocentesco in Italia."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-ita-s3-e6",
            "type": "quiz",
            "prompt": "Nella frase 'Ti prometto CHE VERRÒ ALLA TUA FESTA', la subordinata 'che verrò alla tua festa' è...",
            "options": [
                {"label": "Subordinata oggettiva (fa da complemento oggetto alla reggente)", "correct": True},
                {"label": "Subordinata soggettiva", "correct": False},
                {"label": "Subordinata temporale", "correct": False}
            ],
            "hint": "Prometto che cosa? Funge da complemento oggetto per il verbo 'prometto'.",
            "explanation": "La subordinata oggettiva svolge nel periodo il ruolo che il complemento oggetto svolge nella frase."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-ita-s3-e7",
            "type": "dragdrop",
            "mode": "match",
            "prompt": "Abbina ogni subordinata alla congiunzione tipica che la introduce.",
            "leftItems": ["Causale", "Finale", "Temporale"],
            "rightItems": ["Poiché / Perché", "Affinché / Perché (congiuntivo)", "Quando / Mentre"],
            "pairs": [[0, 0], [1, 1], [2, 2]],
            "hint": "Causale esprime il motivo, finale lo scopo, temporale il momento.",
            "explanation": "Connettivi subordinanti fondamentali per l'analisi del periodo di 3ª media."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-ita-s3-e8",
            "type": "quiz",
            "prompt": "Che cosa si intende per SINESTESIA in poesia (es. 'voce calda', 'urlo nero')?",
            "options": [
                {"label": "L'accostamento di due parole appartenenti a sfere sensoriali diverse (es. udito + vista o tatto)", "correct": True},
                {"label": "La ripetizione dell'ultima parola di un verso nel verso successivo", "correct": False},
                {"label": "Una poesia di quattordici versi endecasillabi", "correct": False}
            ],
            "hint": "Mescola due sensi differenti, come suono e colore, o tatto e vista.",
            "explanation": "La sinestesia associa termini appartenenti a campi percettivi e sensoriali distinti."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-ita-s3-e9",
            "type": "quiz",
            "prompt": "Quale poeta del Decadentismo elaborò la poetica del 'FANCIULLINO' e scrisse 'Myricae'?",
            "options": [
                {"label": "Giovanni Pascoli", "correct": True},
                {"label": "Gabriele D'Annunzio", "correct": False},
                {"label": "Ugo Foscolo", "correct": False}
            ],
            "hint": "Sosteneva che dentro ognuno di noi continua a vivere un fanciullino che guarda il mondo con stupore.",
            "explanation": "Giovanni Pascoli formulò nel 1897 la celebre poetica del Fanciullino."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-ita-s3-e10",
            "type": "quiz",
            "prompt": "Nella frase 'Sembra CHE OGGI PIOVA', che tipo di subordinata è 'che oggi piova'?",
            "options": [
                {"label": "Subordinata soggettiva (fa da soggetto al verbo impersonale 'sembra')", "correct": True},
                {"label": "Subordinata oggettiva", "correct": False},
                {"label": "Subordinata relativa", "correct": False}
            ],
            "hint": "Il verbo 'sembra' non ha un soggetto espresso: la frase intera funge da soggetto.",
            "explanation": "La subordinata soggettiva fa da soggetto a verbi o locuzioni impersonali."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-ita-s3-e11",
            "type": "quiz",
            "prompt": "Qual è la forma metrica di un SONETTO tradizionale della poesia italiana?",
            "options": [
                {"label": "14 versi endecasillabi divisi in 2 quartine e 2 terzine", "correct": True},
                {"label": "3 terzine a rima incatenata", "correct": False},
                {"label": "Un unico blocco di 20 versi liberi", "correct": False}
            ],
            "hint": "Inventato da Jacopo da Lentini e reso celebre da Petrarca e Dante.",
            "explanation": "Il sonetto è composto da 14 endecasillabi articolati in due quartine e due terzine."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-ita-s3-e12",
            "type": "dragdrop",
            "mode": "sort",
            "prompt": "Ordina i gradi di subordinazione dal livello principale al terzo grado.",
            "sortItems": ["Proposizione principale", "Subordinata di 1° grado", "Subordinata di 2° grado", "Subordinata di 3° grado"],
            "hint": "Gerarchia dell'albero del periodo.",
            "explanation": "La reggente principale sostiene il 1° grado, che sostiene il 2°, che a sua volta regge il 3°."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-ita-s3-e13",
            "type": "quiz",
            "prompt": "Quale autore del Novecento vinse il Premio Nobel per la Letteratura e scrisse 'Il fu Mattia Pascal' e 'Uno, nessuno e centomila'?",
            "options": [
                {"label": "Luigi Pirandello", "correct": True},
                {"label": "Italo Svevo", "correct": False},
                {"label": "Giuseppe Ungaretti", "correct": False}
            ],
            "hint": "Teorico dell'umorismo e delle 'maschere' sociali.",
            "explanation": "Luigi Pirandello esplorò la crisi dell'identità individuale e vinse il Nobel nel 1934."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-ita-s3-e14",
            "type": "quiz",
            "prompt": "Nella frase 'MANGIANDO LA MELA, Luca si macchiò la maglietta', la proposizione implicita al gerundio ha valore...",
            "options": [
                {"label": "Temporale (Mentre mangiava la mela)", "correct": True},
                {"label": "Finale", "correct": False},
                {"label": "Concessivo", "correct": False}
            ],
            "hint": "Puoi trasformarla con: 'Nel momento in cui mangiava...'.",
            "explanation": "Il gerundio 'mangiando' esprime la contemporaneità temporale dell'azione."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-ita-s3-e15",
            "type": "quiz",
            "prompt": "Quale poeta ermetico scrisse durante la Prima Guerra Mondiale poesie essenziali e folgoranti come 'Mattina' ('M'illumino d'immenso')?",
            "options": [
                {"label": "Giuseppe Ungaretti", "correct": True},
                {"label": "Eugenio Montale", "correct": False},
                {"label": "Salvatore Quasimodo", "correct": False}
            ],
            "hint": "Autore della raccolta 'L'Allegria' scritta al fronte sul Carso.",
            "explanation": "Giuseppe Ungaretti rivoluzionò la poesia italiana del Novecento con versi brevi e scarni."
        }
    }
]
