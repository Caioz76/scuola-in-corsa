# -*- coding: utf-8 -*-
"""Banca domande estesa di Matematica (120 nuovi quesiti autentici e curricolari)."""

MATEMATICA_EXP = [
    # ── P1 (15 quesiti) ────────────────────────────────────────────────────────
    {
        "years": ["P1"],
        "round": {
            "id": "qb-mat-p1-e1",
            "type": "quiz",
            "prompt": "Quale figura geometrica non ha spigoli né vertici ed è perfettamente rotonda?",
            "options": [
                {"label": "Il cerchio", "correct": True},
                {"label": "Il quadrato", "correct": False},
                {"label": "Il triangolo", "correct": False}
            ],
            "hint": "Pensa alla forma di una pizza o di una ruota.",
            "explanation": "Il cerchio ha una linea curva chiusa, senza angoli né spigoli."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-mat-p1-e2",
            "type": "quiz",
            "prompt": "Nel salvadanaio hai due monete da 2 euro e una da 1 euro. Quanti euro hai in tutto?",
            "options": [
                {"label": "5 euro", "correct": True},
                {"label": "4 euro", "correct": False},
                {"label": "6 euro", "correct": False}
            ],
            "hint": "Conta: 2 + 2 = 4, più un altro euro.",
            "explanation": "2 + 2 + 1 = 5 euro."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-mat-p1-e3",
            "type": "quiz",
            "prompt": "Quale simbolo si usa per dire che un numero è MAGGIORE di un altro?",
            "options": [
                {"label": ">", "correct": True},
                {"label": "<", "correct": False},
                {"label": "=", "correct": False}
            ],
            "hint": "La punta guarda sempre verso il numero più piccolo, l'apertura verso il più grande.",
            "explanation": "Il simbolo '>' significa 'maggiore di', ad esempio 8 > 3."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-mat-p1-e4",
            "type": "quiz",
            "prompt": "Se hai una scatola con 1 decina di matite, quante matite ci sono dentro?",
            "options": [
                {"label": "10", "correct": True},
                {"label": "12", "correct": False},
                {"label": "1", "correct": False}
            ],
            "hint": "La parola decina deriva dal numero 10.",
            "explanation": "Una decina è formata esattamente da 10 unità."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-mat-p1-e5",
            "type": "quiz",
            "prompt": "Quale numero è DISPARI tra questi?",
            "options": [
                {"label": "7", "correct": True},
                {"label": "6", "correct": False},
                {"label": "8", "correct": False},
                {"label": "4", "correct": False}
            ],
            "hint": "I numeri dispari non si possono dividere in due parti uguali di numeri interi.",
            "explanation": "7 è un numero dispari (1, 3, 5, 7, 9...)."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-mat-p1-e6",
            "type": "quiz",
            "prompt": "Luca è il terzo della fila. Quanti bambini ci sono davanti a lui?",
            "options": [
                {"label": "2 bambini", "correct": True},
                {"label": "3 bambini", "correct": False},
                {"label": "1 bambino", "correct": False}
            ],
            "hint": "Ci sono il primo e il secondo.",
            "explanation": "Davanti al terzo ci sono 2 bambini: il primo e il secondo."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-mat-p1-e7",
            "type": "dragdrop",
            "mode": "sort",
            "prompt": "Metti in ordine i numeri dal più piccolo al più grande (ordine crescente).",
            "sortItems": ["2", "7", "11", "19"],
            "hint": "Trova il numero minore e mettilo per primo.",
            "explanation": "2 < 7 < 11 < 19."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-mat-p1-e8",
            "type": "quiz",
            "prompt": "Sul tavolo ci sono 14 caramelle. I bambini ne mangiano 4. Quante ne rimangono?",
            "options": [
                {"label": "10", "correct": True},
                {"label": "8", "correct": False},
                {"label": "12", "correct": False}
            ],
            "hint": "14 meno le 4 caramelle mangiate.",
            "explanation": "14 − 4 = 10 caramelle."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-mat-p1-e9",
            "type": "quiz",
            "prompt": "Quale tra questi oggetti è generalmente il più PESANTE?",
            "options": [
                {"label": "Uno zaino pieno di libri", "correct": True},
                {"label": "Una matita", "correct": False},
                {"label": "Un foglio di carta", "correct": False}
            ],
            "hint": "Pensa a cosa fai più fatica a sollevare.",
            "explanation": "Lo zaino pieno pesa diversi chili, molto più di una matita o di un foglio."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-mat-p1-e10",
            "type": "quiz",
            "prompt": "Quanti lati ha un triangolo?",
            "options": [
                {"label": "3 lati", "correct": True},
                {"label": "4 lati", "correct": False},
                {"label": "5 lati", "correct": False}
            ],
            "hint": "La parola 'tri-angolo' indica il numero 3.",
            "explanation": "Il triangolo ha 3 lati e 3 vertici."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-mat-p1-e11",
            "type": "quiz",
            "prompt": "Qual è il numero che precede (viene prima di) 19?",
            "options": [
                {"label": "18", "correct": True},
                {"label": "20", "correct": False},
                {"label": "17", "correct": False}
            ],
            "hint": "Togli 1 da 19.",
            "explanation": "Prima del 19 c'è il 18."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-mat-p1-e12",
            "type": "dragdrop",
            "mode": "match",
            "prompt": "Abbina ogni numero al suo 'amico del 10' (coppia che somma 10).",
            "leftItems": ["3", "6", "8"],
            "rightItems": ["7", "4", "2"],
            "pairs": [[0, 0], [1, 1], [2, 2]],
            "hint": "Quanto manca a ciascun numero per arrivare a 10?",
            "explanation": "3+7=10, 6+4=10, 8+2=10."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-mat-p1-e13",
            "type": "quiz",
            "prompt": "Hai 6 mele rosse e 6 mele verdi. Quante mele hai in totale?",
            "options": [
                {"label": "12 mele", "correct": True},
                {"label": "10 mele", "correct": False},
                {"label": "14 mele", "correct": False}
            ],
            "hint": "Il doppio di 6.",
            "explanation": "6 + 6 = 12 mele (una dozzina)."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-mat-p1-e14",
            "type": "quiz",
            "prompt": "Quale tra queste linee è una linea CURVA aperta?",
            "options": [
                {"label": "Un filo ondulato appoggiato sul tavolo", "correct": True},
                {"label": "Il bordo di un cerchio chiuso", "correct": False},
                {"label": "Il bordo dritto di un righello", "correct": False}
            ],
            "hint": "È una linea con curve che non si richiude su se stessa.",
            "explanation": "Un filo ondulato aperto è una linea curva aperta."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-mat-p1-e15",
            "type": "quiz",
            "prompt": "Se conti all'indietro partendo da 10: 10, 9, 8... quale numero viene dopo?",
            "options": [
                {"label": "7", "correct": True},
                {"label": "6", "correct": False},
                {"label": "5", "correct": False}
            ],
            "hint": "Togli 1 da 8.",
            "explanation": "Contando all'indietro: 10, 9, 8, 7, 6..."
        }
    },

    # ── P2 (15 quesiti) ────────────────────────────────────────────────────────
    {
        "years": ["P2"],
        "round": {
            "id": "qb-mat-p2-e1",
            "type": "quiz",
            "prompt": "Un orologio a lancette ha la lancetta corta sul 4 e quella lunga sul 12. Che ora è?",
            "options": [
                {"label": "Le 4 in punto", "correct": True},
                {"label": "Le 12 e 20", "correct": False},
                {"label": "Le 4 e mezza", "correct": False}
            ],
            "hint": "La lancetta corta segna le ore, quella lunga i minuti.",
            "explanation": "Quando la lancetta lunga è sul 12 e la corta sul 4 sono le 4:00 in punto."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-mat-p2-e2",
            "type": "quiz",
            "prompt": "Quanto fa 4 × 5?",
            "options": [
                {"label": "20", "correct": True},
                {"label": "25", "correct": False},
                {"label": "16", "correct": False}
            ],
            "hint": "Conta di 5 in 5 per 4 volte: 5, 10, 15...",
            "explanation": "4 × 5 = 20."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-mat-p2-e3",
            "type": "quiz",
            "prompt": "Quale numero è formato da 5 decine e 0 unità?",
            "options": [
                {"label": "50", "correct": True},
                {"label": "5", "correct": False},
                {"label": "500", "correct": False}
            ],
            "hint": "5 decine valgono 5 volte 10.",
            "explanation": "5 decine e 0 unità formano il numero 50."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-mat-p2-e4",
            "type": "quiz",
            "prompt": "Per misurare la lunghezza di una gomma per cancellare, quale unità di misura usi?",
            "options": [
                {"label": "Centimetri (cm)", "correct": True},
                {"label": "Chilometri (km)", "correct": False},
                {"label": "Litri (l)", "correct": False}
            ],
            "hint": "I chilometri servono per le distanze tra città, i litri per i liquidi.",
            "explanation": "I piccoli oggetti si misurano con il righello in centimetri (cm)."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-mat-p2-e5",
            "type": "quiz",
            "prompt": "Quanto fa 60 − 25?",
            "options": [
                {"label": "35", "correct": True},
                {"label": "45", "correct": False},
                {"label": "30", "correct": False}
            ],
            "hint": "Fai 60 − 20 = 40, poi 40 − 5.",
            "explanation": "60 − 25 = 35."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-mat-p2-e6",
            "type": "quiz",
            "prompt": "Una confezione contiene 6 uova. Quante uova ci sono in 3 confezioni uguali?",
            "options": [
                {"label": "18 uova", "correct": True},
                {"label": "12 uova", "correct": False},
                {"label": "24 uova", "correct": False}
            ],
            "hint": "Moltiplica 6 uova per 3 confezioni.",
            "explanation": "6 × 3 = 18 uova."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-mat-p2-e7",
            "type": "dragdrop",
            "mode": "match",
            "prompt": "Abbina ogni solido alla figura piana della sua faccia.",
            "leftItems": ["Cubo", "Piramide a base quadrata", "Cilindro (la base)"],
            "rightItems": ["Quadrato", "Triangolo", "Cerchio"],
            "pairs": [[0, 0], [1, 1], [2, 2]],
            "hint": "Guarda le facce esterne di ogni solido.",
            "explanation": "Il cubo ha facce quadrate, la piramide facce triangolari, il cilindro basi circolari."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-mat-p2-e8",
            "type": "quiz",
            "prompt": "Qual è il triplo di 7?",
            "options": [
                {"label": "21", "correct": True},
                {"label": "14", "correct": False},
                {"label": "24", "correct": False}
            ],
            "hint": "Triplo significa moltiplicare per 3.",
            "explanation": "7 × 3 = 21."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-mat-p2-e9",
            "type": "quiz",
            "prompt": "Hai 12 caramelle e vuoi dividerle in parti uguali tra 4 amici. Quante caramelle riceve ciascuno?",
            "options": [
                {"label": "3 caramelle", "correct": True},
                {"label": "4 caramelle", "correct": False},
                {"label": "2 caramelle", "correct": False}
            ],
            "hint": "Esegui una divisione: 12 diviso 4.",
            "explanation": "12 ÷ 4 = 3 caramelle ciascuno."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-mat-p2-e10",
            "type": "quiz",
            "prompt": "Quanti vertici (angoli a punta) ha un rettangolo?",
            "options": [
                {"label": "4", "correct": True},
                {"label": "3", "correct": False},
                {"label": "6", "correct": False}
            ],
            "hint": "Conta gli angoli retti del rettangolo.",
            "explanation": "Il rettangolo ha 4 lati e 4 vertici."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-mat-p2-e11",
            "type": "quiz",
            "prompt": "Se pieghi a metà un foglio e le due parti combaciano alla perfezione, la linea di piega si chiama...",
            "options": [
                {"label": "Asse di simmetria", "correct": True},
                {"label": "Diagonale", "correct": False},
                {"label": "Spigolo", "correct": False}
            ],
            "hint": "Rende le due metà perfettamente speculari.",
            "explanation": "La linea che divide una figura in due parti perfettamente speculari è l'asse di simmetria."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-mat-p2-e12",
            "type": "quiz",
            "prompt": "Quanto fa 100 − 30?",
            "options": [
                {"label": "70", "correct": True},
                {"label": "60", "correct": False},
                {"label": "80", "correct": False}
            ],
            "hint": "10 decine meno 3 decine.",
            "explanation": "100 − 30 = 70."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-mat-p2-e13",
            "type": "dragdrop",
            "mode": "sort",
            "prompt": "Ordina i risultati delle moltiplicazioni dal più piccolo al più grande.",
            "sortItems": ["2 × 3 (6)", "3 × 4 (12)", "5 × 4 (20)", "6 × 5 (30)"],
            "hint": "Calcola il valore di ciascuna operazione.",
            "explanation": "6 < 12 < 20 < 30."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-mat-p2-e14",
            "type": "quiz",
            "prompt": "Se compri un quaderno da 3 euro e paghi con una banconota da 10 euro, quanto ti danno di resto?",
            "options": [
                {"label": "7 euro", "correct": True},
                {"label": "8 euro", "correct": False},
                {"label": "6 euro", "correct": False}
            ],
            "hint": "10 − 3.",
            "explanation": "10 − 3 = 7 euro di resto."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-mat-p2-e15",
            "type": "quiz",
            "prompt": "Quale numero viene subito dopo il 99?",
            "options": [
                {"label": "100", "correct": True},
                {"label": "101", "correct": False},
                {"label": "90", "correct": False}
            ],
            "hint": "È il primo numero a tre cifre.",
            "explanation": "99 + 1 = 100 (un centinaio)."
        }
    },

    # ── P3 (15 quesiti) ────────────────────────────────────────────────────────
    {
        "years": ["P3"],
        "round": {
            "id": "qb-mat-p3-e1",
            "type": "quiz",
            "prompt": "Un triangolo ha tutti e tre i lati uguali tra loro. Come si chiama?",
            "options": [
                {"label": "Triangolo equilatero", "correct": True},
                {"label": "Triangolo isoscele", "correct": False},
                {"label": "Triangolo scaleno", "correct": False}
            ],
            "hint": "'Equi' significa uguale: tutti i lati hanno la stessa lunghezza.",
            "explanation": "Un triangolo con 3 lati congruenti è detto equilatero."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-mat-p3-e2",
            "type": "quiz",
            "prompt": "Quanto fa 8 × 9?",
            "options": [
                {"label": "72", "correct": True},
                {"label": "64", "correct": False},
                {"label": "81", "correct": False}
            ],
            "hint": "Pensa alla tabellina dell'8 o del 9.",
            "explanation": "8 × 9 = 72."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-mat-p3-e3",
            "type": "quiz",
            "prompt": "Quanti grammi ci sono in 1 chilogrammo (kg)?",
            "options": [
                {"label": "1.000 grammi", "correct": True},
                {"label": "100 grammi", "correct": False},
                {"label": "10 grammi", "correct": False}
            ],
            "hint": "Il prefisso 'chilo-' indica mille.",
            "explanation": "1 kg = 1.000 g."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-mat-p3-e4",
            "type": "quiz",
            "prompt": "In una pizza divisa in 4 fette uguali, mangi 1 fetta. Quale frazione di pizza hai mangiato?",
            "options": [
                {"label": "1/4", "correct": True},
                {"label": "1/2", "correct": False},
                {"label": "3/4", "correct": False}
            ],
            "hint": "1 parte considerata su 4 parti totali.",
            "explanation": "Hai mangiato un quarto (1/4) della pizza."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-mat-p3-e5",
            "type": "quiz",
            "prompt": "Quanto fa 48 ÷ 6?",
            "options": [
                {"label": "8", "correct": True},
                {"label": "7", "correct": False},
                {"label": "9", "correct": False}
            ],
            "hint": "Quale numero moltiplicato per 6 dà 48?",
            "explanation": "6 × 8 = 48, quindi 48 ÷ 6 = 8."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-mat-p3-e6",
            "type": "quiz",
            "prompt": "Un quadrato ha il lato di 6 cm. Quanto misura il suo perimetro?",
            "options": [
                {"label": "24 cm", "correct": True},
                {"label": "36 cm", "correct": False},
                {"label": "18 cm", "correct": False}
            ],
            "hint": "Il perimetro è la somma di tutti e 4 i lati: 6 × 4.",
            "explanation": "Il perimetro del quadrato si calcola lato × 4: 6 × 4 = 24 cm."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-mat-p3-e7",
            "type": "dragdrop",
            "mode": "match",
            "prompt": "Abbina ogni tipo di angolo alla sua corretta ampiezza.",
            "leftItems": ["Angolo retto", "Angolo acuto", "Angolo ottuso"],
            "rightItems": ["Misura esattamente 90°", "È più piccolo di 90°", "È più grande di 90°"],
            "pairs": [[0, 0], [1, 1], [2, 2]],
            "hint": "L'angolo retto è quello formato dalle pareti e dal pavimento.",
            "explanation": "Retto = 90°, acuto < 90°, ottuso > 90°."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-mat-p3-e8",
            "type": "quiz",
            "prompt": "Quale proprietà della moltiplicazione dice che cambiando l'ordine dei fattori il prodotto non cambia (es. 4 × 5 = 5 × 4)?",
            "options": [
                {"label": "Proprietà commutativa", "correct": True},
                {"label": "Proprietà associativa", "correct": False},
                {"label": "Proprietà distributiva", "correct": False}
            ],
            "hint": "'Commutare' significa scambiare di posto.",
            "explanation": "La proprietà commutativa permette di scambiare l'ordine dei fattori senza cambiare il risultato."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-mat-p3-e9",
            "type": "quiz",
            "prompt": "Quanti minuti ci sono in 2 ore intere?",
            "options": [
                {"label": "120 minuti", "correct": True},
                {"label": "100 minuti", "correct": False},
                {"label": "60 minuti", "correct": False}
            ],
            "hint": "Un'ora ha 60 minuti. Fai 60 + 60.",
            "explanation": "In 1 ora ci sono 60 minuti, quindi in 2 ore ci sono 60 × 2 = 120 minuti."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-mat-p3-e10",
            "type": "quiz",
            "prompt": "Quanto fa 250 + 350?",
            "options": [
                {"label": "600", "correct": True},
                {"label": "500", "correct": False},
                {"label": "550", "correct": False}
            ],
            "hint": "200 + 300 = 500, poi aggiungi 50 + 50.",
            "explanation": "250 + 350 = 600."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-mat-p3-e11",
            "type": "quiz",
            "prompt": "Se dividi 23 per 5, qual è il resto?",
            "options": [
                {"label": "Resto 3", "correct": True},
                {"label": "Resto 2", "correct": False},
                {"label": "Resto 1", "correct": False}
            ],
            "hint": "5 × 4 fa 20. Quanto manca per arrivare a 23?",
            "explanation": "23 = (5 × 4) + 3. Il quoziente è 4 con resto 3."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-mat-p3-e12",
            "type": "dragdrop",
            "mode": "sort",
            "prompt": "Metti in ordine crescente queste misure di capacità (dal volume minore al maggiore).",
            "sortItems": ["10 millilitri (ml)", "50 centilitri (cl)", "1 litro (l)", "10 litri (l)"],
            "hint": "Il millilitro è una goccia, il litro è una bottiglia intera.",
            "explanation": "10 ml < 50 cl (mezzo litro) < 1 l < 10 l."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-mat-p3-e13",
            "type": "quiz",
            "prompt": "Che numero rappresenta 1 centinaio, 4 decine e 7 unità?",
            "options": [
                {"label": "147", "correct": True},
                {"label": "174", "correct": False},
                {"label": "417", "correct": False}
            ],
            "hint": "100 + 40 + 7.",
            "explanation": "1 h, 4 da, 7 u formano il numero 147."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-mat-p3-e14",
            "type": "quiz",
            "prompt": "Qual è il doppio di 45?",
            "options": [
                {"label": "90", "correct": True},
                {"label": "80", "correct": False},
                {"label": "85", "correct": False}
            ],
            "hint": "45 + 45.",
            "explanation": "45 × 2 = 90."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-mat-p3-e15",
            "type": "quiz",
            "prompt": "In una frazione come 3/5, come si chiama il numero che sta in basso (il 5)?",
            "options": [
                {"label": "Denominatore", "correct": True},
                {"label": "Numeratore", "correct": False},
                {"label": "Quoziente", "correct": False}
            ],
            "hint": "Indica in quante parti è diviso l'intero. Il numeratore sta sopra.",
            "explanation": "Il numero in basso è il denominatore, quello in alto è il numeratore."
        }
    },

    # ── P4 (15 quesiti) ────────────────────────────────────────────────────────
    {
        "years": ["P4"],
        "round": {
            "id": "qb-mat-p4-e1",
            "type": "quiz",
            "prompt": "Un triangolo ha due lati uguali e uno diverso. Come si chiama?",
            "options": [
                {"label": "Triangolo isoscele", "correct": True},
                {"label": "Triangolo scaleno", "correct": False},
                {"label": "Triangolo rettangolo", "correct": False}
            ],
            "hint": "Ha due lati (e due angoli alla base) congruenti.",
            "explanation": "Il triangolo con due lati uguali si chiama isoscele."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-mat-p4-e2",
            "type": "quiz",
            "prompt": "Quanto fa 1,4 + 2,8?",
            "options": [
                {"label": "4,2", "correct": True},
                {"label": "3,2", "correct": False},
                {"label": "4,0", "correct": False}
            ],
            "hint": "Somma prima i decimi (4 + 8 = 12 decimi = 1 unità e 2 decimi).",
            "explanation": "1,4 + 2,8 = 4,2."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-mat-p4-e3",
            "type": "quiz",
            "prompt": "Qual è l'area di un rettangolo con base di 9 cm e altezza di 4 cm?",
            "options": [
                {"label": "36 cm²", "correct": True},
                {"label": "26 cm²", "correct": False},
                {"label": "13 cm²", "correct": False}
            ],
            "hint": "L'area del rettangolo si calcola: base × altezza.",
            "explanation": "Area = 9 cm × 4 cm = 36 cm²."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-mat-p4-e4",
            "type": "quiz",
            "prompt": "Quanti decilitri (dl) ci sono in 1 litro (l)?",
            "options": [
                {"label": "10 dl", "correct": True},
                {"label": "100 dl", "correct": False},
                {"label": "1.000 dl", "correct": False}
            ],
            "hint": "Il prefisso 'deci-' indica la decima parte.",
            "explanation": "1 litro contiene 10 decilitri."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-mat-p4-e5",
            "type": "quiz",
            "prompt": "Quale tra queste frazioni è una frazione APPARENTE (corrisponde a un numero intero)?",
            "options": [
                {"label": "8/4", "correct": True},
                {"label": "3/4", "correct": False},
                {"label": "5/4", "correct": False}
            ],
            "hint": "Il numeratore deve essere un multiplo del denominatore (8 diviso 4 fa 2 intero).",
            "explanation": "8/4 = 2: è una frazione apparente perché rappresenta un numero intero."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-mat-p4-e6",
            "type": "quiz",
            "prompt": "Un negoziante compra una maglietta a 15 euro (spesa) e la rivende a 25 euro (ricavo). Qual è il suo guadagno?",
            "options": [
                {"label": "10 euro", "correct": True},
                {"label": "40 euro", "correct": False},
                {"label": "15 euro", "correct": False}
            ],
            "hint": "Guadagno = Ricavo − Spesa.",
            "explanation": "25 − 15 = 10 euro di guadagno."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-mat-p4-e7",
            "type": "dragdrop",
            "mode": "match",
            "prompt": "Abbina ogni frazione al rispettivo valore decimale.",
            "leftItems": ["1/2", "1/4", "3/4"],
            "rightItems": ["0,5", "0,25", "0,75"],
            "pairs": [[0, 0], [1, 1], [2, 2]],
            "hint": "Dividi il numeratore per il denominatore.",
            "explanation": "1÷2 = 0,5; 1÷4 = 0,25; 3÷4 = 0,75."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-mat-p4-e8",
            "type": "quiz",
            "prompt": "Quanto misura la somma di tutti gli angoli interni di un QUALSIASI triangolo?",
            "options": [
                {"label": "180°", "correct": True},
                {"label": "360°", "correct": False},
                {"label": "90°", "correct": False}
            ],
            "hint": "È pari a un angolo piatto.",
            "explanation": "La somma degli angoli interni di qualunque triangolo è sempre 180°."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-mat-p4-e9",
            "type": "quiz",
            "prompt": "Quanto fa 35 × 100?",
            "options": [
                {"label": "3.500", "correct": True},
                {"label": "350", "correct": False},
                {"label": "35.000", "correct": False}
            ],
            "hint": "Aggiungi due zeri alla fine del numero.",
            "explanation": "Per moltiplicare per 100 si aggiungono due zeri: 35 × 100 = 3.500."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-mat-p4-e10",
            "type": "quiz",
            "prompt": "A quanti metri corrispondono 3,5 chilometri (km)?",
            "options": [
                {"label": "3.500 metri", "correct": True},
                {"label": "350 metri", "correct": False},
                {"label": "35.000 metri", "correct": False}
            ],
            "hint": "1 km = 1.000 m. Moltiplica 3,5 per 1.000.",
            "explanation": "3,5 × 1.000 = 3.500 metri."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-mat-p4-e11",
            "type": "quiz",
            "prompt": "Un parallelogramma ha la base di 10 cm e l'altezza relativa di 6 cm. Qual è la sua area?",
            "options": [
                {"label": "60 cm²", "correct": True},
                {"label": "32 cm²", "correct": False},
                {"label": "30 cm²", "correct": False}
            ],
            "hint": "L'area del parallelogramma si calcola come quella del rettangolo: base × altezza.",
            "explanation": "Area = base × altezza = 10 × 6 = 60 cm²."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-mat-p4-e12",
            "type": "dragdrop",
            "mode": "sort",
            "prompt": "Ordina questi numeri decimali dal più piccolo al più grande.",
            "sortItems": ["0,08", "0,2", "0,45", "1,1"],
            "hint": "Guarda prima la parte intera, poi i decimi e i centesimi.",
            "explanation": "0,08 < 0,20 < 0,45 < 1,10."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-mat-p4-e13",
            "type": "quiz",
            "prompt": "Calcola il valore di 2/3 di 18 figurine.",
            "options": [
                {"label": "12 figurine", "correct": True},
                {"label": "6 figurine", "correct": False},
                {"label": "9 figurine", "correct": False}
            ],
            "hint": "Dividi 18 per il denominatore 3, poi moltiplica per 2.",
            "explanation": "18 ÷ 3 = 6; 6 × 2 = 12."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-mat-p4-e14",
            "type": "quiz",
            "prompt": "Come si chiama un poligono che ha 5 lati e 5 angoli?",
            "options": [
                {"label": "Pentagono", "correct": True},
                {"label": "Esagono", "correct": False},
                {"label": "Ottagono", "correct": False}
            ],
            "hint": "'Penta' in greco significa cinque.",
            "explanation": "Un poligono con 5 lati è un pentagono."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-mat-p4-e15",
            "type": "quiz",
            "prompt": "Quanto fa 7,5 ÷ 10?",
            "options": [
                {"label": "0,75", "correct": True},
                {"label": "75", "correct": False},
                {"label": "0,075", "correct": False}
            ],
            "hint": "Sposta la virgola a sinistra di una posizione.",
            "explanation": "Dividendo per 10 la virgola scala a sinistra: 7,5 ÷ 10 = 0,75."
        }
    },

    # ── P5 (15 quesiti) ────────────────────────────────────────────────────────
    {
        "years": ["P5"],
        "round": {
            "id": "qb-mat-p5-e1",
            "type": "quiz",
            "prompt": "Un triangolo ha la base di 12 cm e l'altezza di 8 cm. Qual è la sua area?",
            "options": [
                {"label": "48 cm²", "correct": True},
                {"label": "96 cm²", "correct": False},
                {"label": "20 cm²", "correct": False}
            ],
            "hint": "Formula dell'area del triangolo: (base × altezza) diviso 2.",
            "explanation": "Area = (12 × 8) ÷ 2 = 96 ÷ 2 = 48 cm²."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-mat-p5-e2",
            "type": "quiz",
            "prompt": "Quanto vale il 20% di 150 euro?",
            "options": [
                {"label": "30 euro", "correct": True},
                {"label": "20 euro", "correct": False},
                {"label": "25 euro", "correct": False}
            ],
            "hint": "Calcola il 10% (15 euro) e raddoppialo.",
            "explanation": "150 × 20 / 100 = 30 euro."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-mat-p5-e3",
            "type": "quiz",
            "prompt": "Qual è il segmento che unisce il centro del cerchio con un qualsiasi punto della circonferenza?",
            "options": [
                {"label": "Raggio", "correct": True},
                {"label": "Diametro", "correct": False},
                {"label": "Corda", "correct": False}
            ],
            "hint": "Il diametro è il doppio di questo segmento.",
            "explanation": "Il raggio è la distanza dal centro a qualsiasi punto della circonferenza."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-mat-p5-e4",
            "type": "quiz",
            "prompt": "In un rombo, le diagonali misurano 10 cm e 6 cm. Qual è la sua area?",
            "options": [
                {"label": "30 cm²", "correct": True},
                {"label": "60 cm²", "correct": False},
                {"label": "16 cm²", "correct": False}
            ],
            "hint": "Formula: (Diagonale maggiore × diagonale minore) diviso 2.",
            "explanation": "Area rombo = (D × d) ÷ 2 = (10 × 6) ÷ 2 = 30 cm²."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-mat-p5-e5",
            "type": "quiz",
            "prompt": "Qual è la media aritmetica tra i voti: 7, 8 e 9?",
            "options": [
                {"label": "8", "correct": True},
                {"label": "7,5", "correct": False},
                {"label": "8,5", "correct": False}
            ],
            "hint": "Somma i tre numeri (7 + 8 + 9 = 24) e dividi per 3.",
            "explanation": "(7 + 8 + 9) ÷ 3 = 24 ÷ 3 = 8."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-mat-p5-e6",
            "type": "quiz",
            "prompt": "Lanciamo un comune dado a 6 facce. Qual è la probabilità di ottenere un numero pari (2, 4, 6)?",
            "options": [
                {"label": "3 su 6 (pari al 50% o 1/2)", "correct": True},
                {"label": "1 su 6", "correct": False},
                {"label": "4 su 6", "correct": False}
            ],
            "hint": "Ci sono 3 casi favorevoli su 6 casi possibili.",
            "explanation": "3 facce pari su 6 facce totali: 3/6 = 1/2 = 50%."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-mat-p5-e7",
            "type": "dragdrop",
            "mode": "match",
            "prompt": "Abbina ogni solido alla formula del suo volume.",
            "leftItems": ["Cubo (lato l)", "Parallelepipedo rettangolo", "Prisma retto"],
            "rightItems": ["l × l × l (l³)", "Area base × altezza", "Area base × altezza"],
            "pairs": [[0, 0], [1, 1], [2, 2]],
            "hint": "Il volume si misura in unità cubiche (cm³, m³).",
            "explanation": "Volume del cubo = l³, volume del parallelepipedo e del prisma = Area base × altezza."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-mat-p5-e8",
            "type": "quiz",
            "prompt": "A quanto corrisponde la potenza 10³?",
            "options": [
                {"label": "1.000", "correct": True},
                {"label": "100", "correct": False},
                {"label": "30", "correct": False}
            ],
            "hint": "10 moltiplicato per se stesso 3 volte: 10 × 10 × 10.",
            "explanation": "10³ = 10 × 10 × 10 = 1.000 (il numero di zeri è pari all'esponente 3)."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-mat-p5-e9",
            "type": "quiz",
            "prompt": "Un trapezio ha base maggiore di 10 cm, base minore di 6 cm e altezza di 4 cm. Qual è la sua area?",
            "options": [
                {"label": "32 cm²", "correct": True},
                {"label": "64 cm²", "correct": False},
                {"label": "16 cm²", "correct": False}
            ],
            "hint": "Formula: [(Base maggiore + base minore) × altezza] ÷ 2.",
            "explanation": "Area = [(10 + 6) × 4] ÷ 2 = (16 × 4) ÷ 2 = 64 ÷ 2 = 32 cm²."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-mat-p5-e10",
            "type": "quiz",
            "prompt": "Nel piano cartesiano, quali sono le coordinate dell'origine degli assi O?",
            "options": [
                {"label": "(0; 0)", "correct": True},
                {"label": "(1; 1)", "correct": False},
                {"label": "(0; 1)", "correct": False}
            ],
            "hint": "È il punto d'intersezione dell'asse orizzontale x e di quello verticale y.",
            "explanation": "L'origine degli assi cartesiani ha coordinate x=0 e y=0: (0; 0)."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-mat-p5-e11",
            "type": "quiz",
            "prompt": "Quanto fa l'addizione tra frazioni: 2/7 + 3/7?",
            "options": [
                {"label": "5/7", "correct": True},
                {"label": "5/14", "correct": False},
                {"label": "6/7", "correct": False}
            ],
            "hint": "Quando il denominatore è uguale, si sommano semplicemente i numeratori.",
            "explanation": "Poiché il denominatore è uguale a 7: (2 + 3)/7 = 5/7."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-mat-p5-e12",
            "type": "dragdrop",
            "mode": "sort",
            "prompt": "Ordina le percentuali dalla minore alla maggiore.",
            "sortItems": ["10%", "25% (un quarto)", "50% (la metà)", "75% (tre quarti)"],
            "hint": "Pensa alla frazione dell'intero che rappresentano.",
            "explanation": "10% < 25% < 50% < 75%."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-mat-p5-e13",
            "type": "quiz",
            "prompt": "Il diametro di un cerchio misura 14 cm. Quanto misura il suo raggio?",
            "options": [
                {"label": "7 cm", "correct": True},
                {"label": "28 cm", "correct": False},
                {"label": "14 cm", "correct": False}
            ],
            "hint": "Il raggio è la metà esatta del diametro.",
            "explanation": "Raggio = Diametro ÷ 2 = 14 ÷ 2 = 7 cm."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-mat-p5-e14",
            "type": "quiz",
            "prompt": "Se a mezzanotte la temperatura era di −2 °C e a mezzogiorno è salita di 6 °C, qual è la temperatura a mezzogiorno?",
            "options": [
                {"label": "+4 °C", "correct": True},
                {"label": "+8 °C", "correct": False},
                {"label": "−8 °C", "correct": False}
            ],
            "hint": "Parti da −2 sulla retta dei numeri e sali di 6 verso destra.",
            "explanation": "−2 + 6 = +4 °C."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-mat-p5-e15",
            "type": "quiz",
            "prompt": "Qual è il valore approssimato di Pi Greco (π)?",
            "options": [
                {"label": "3,14", "correct": True},
                {"label": "2,71", "correct": False},
                {"label": "1,41", "correct": False}
            ],
            "hint": "È il rapporto costante tra la circonferenza e il suo diametro.",
            "explanation": "Pi Greco vale circa 3,14159... arrotondato abitualmente a 3,14."
        }
    },

    # ── S1 (15 quesiti) ────────────────────────────────────────────────────────
    {
        "years": ["S1"],
        "round": {
            "id": "qb-mat-s1-e1",
            "type": "quiz",
            "prompt": "Quale tra questi numeri è un numero PRIMO (divisibile solo per 1 e per se stesso)?",
            "options": [
                {"label": "17", "correct": True},
                {"label": "15", "correct": False},
                {"label": "21", "correct": False},
                {"label": "9", "correct": False}
            ],
            "hint": "15 è divisibile per 3 e 5, 21 per 3 e 7, 9 per 3.",
            "explanation": "17 ha come unici divisori 1 e 17: è un numero primo."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-mat-s1-e2",
            "type": "quiz",
            "prompt": "Qual è il criterio di divisibilità per 3?",
            "options": [
                {"label": "La somma delle cifre del numero deve essere un multiplo di 3", "correct": True},
                {"label": "L'ultima cifra deve essere 3", "correct": False},
                {"label": "Il numero deve essere dispari", "correct": False}
            ],
            "hint": "Ad esempio in 123: 1 + 2 + 3 = 6, che è divisibile per 3.",
            "explanation": "Un numero è divisibile per 3 se e solo se la somma delle sue cifre è un multiplo di 3."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-mat-s1-e3",
            "type": "quiz",
            "prompt": "Quanto vale la moltiplicazione tra potenze con la stessa base: 2³ × 2²?",
            "options": [
                {"label": "2⁵ (cioè 32)", "correct": True},
                {"label": "2⁶", "correct": False},
                {"label": "4⁵", "correct": False}
            ],
            "hint": "Per il prodotto di potenze con stessa base, si sommano gli esponenti (3 + 2).",
            "explanation": "2³ × 2² = 2^(3+2) = 2⁵ = 32."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-mat-s1-e4",
            "type": "quiz",
            "prompt": "Due rette che non si incontrano mai e mantengono sempre la stessa distanza tra loro si dicono...",
            "options": [
                {"label": "Rette parallele", "correct": True},
                {"label": "Rette perpendicolari", "correct": False},
                {"label": "Rette incidenti", "correct": False}
            ],
            "hint": "Pensa ai binari del treno.",
            "explanation": "Le rette parallele appartengono allo stesso piano e non hanno punti in comune."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-mat-s1-e5",
            "type": "quiz",
            "prompt": "Riduci ai minimi termini la frazione 12/18.",
            "options": [
                {"label": "2/3", "correct": True},
                {"label": "3/4", "correct": False},
                {"label": "4/6", "correct": False}
            ],
            "hint": "Dividi sia il numeratore che il denominatore per il loro MCD, che è 6.",
            "explanation": "12 ÷ 6 = 2; 18 ÷ 6 = 3, quindi la frazione ridotta è 2/3."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-mat-s1-e6",
            "type": "quiz",
            "prompt": "Quanto misura ciascun angolo interno di un triangolo equilatero?",
            "options": [
                {"label": "60°", "correct": True},
                {"label": "90°", "correct": False},
                {"label": "45°", "correct": False}
            ],
            "hint": "La somma degli angoli è 180°. Dividi 180° per 3 angoli uguali.",
            "explanation": "180° ÷ 3 = 60°."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-mat-s1-e7",
            "type": "dragdrop",
            "mode": "match",
            "prompt": "Abbina ogni proprietà delle potenze alla sua regola.",
            "leftItems": ["aⁿ × aᵐ", "aⁿ ÷ aᵐ", "(aⁿ)ᵐ"],
            "rightItems": ["aⁿ⁺ᵐ (somma esponenti)", "aⁿ⁻ᵐ (differenza esponenti)", "aⁿ·ᵐ (prodotto esponenti)"],
            "pairs": [[0, 0], [1, 1], [2, 2]],
            "hint": "Nel prodotto si sommano, nel quoziente si sottraggono, nella potenza di potenza si moltiplicano.",
            "explanation": "Regole fondamentali dell'algebra delle potenze con stessa base."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-mat-s1-e8",
            "type": "quiz",
            "prompt": "Qual è il minimo comune multiplo (mcm) tra 6 e 8?",
            "options": [
                {"label": "24", "correct": True},
                {"label": "48", "correct": False},
                {"label": "12", "correct": False}
            ],
            "hint": "Multipli di 6: 6, 12, 18, 24... Multipli di 8: 8, 16, 24...",
            "explanation": "24 è il più piccolo multiplo comune a 6 e 8."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-mat-s1-e9",
            "type": "quiz",
            "prompt": "Due rette incidenti che intersecandosi formano 4 angoli retti di 90° si dicono...",
            "options": [
                {"label": "Rette perpendicolari", "correct": True},
                {"label": "Rette parallele", "correct": False},
                {"label": "Rette coincidenti", "correct": False}
            ],
            "hint": "Formano una croce perfetta con angoli retti.",
            "explanation": "Le rette perpendicolari si intersecano formando angoli di 90°."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-mat-s1-e10",
            "type": "quiz",
            "prompt": "Qual è il Massimo Comune Divisore (MCD) tra 12 e 18?",
            "options": [
                {"label": "6", "correct": True},
                {"label": "3", "correct": False},
                {"label": "2", "correct": False}
            ],
            "hint": "Divisori di 12: 1, 2, 3, 4, 6, 12. Divisori di 18: 1, 2, 3, 6, 9, 18.",
            "explanation": "Il più grande divisore comune è 6."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-mat-s1-e11",
            "type": "quiz",
            "prompt": "Quanto fa l'espressione con precedenze: 5 + 3 × 4?",
            "options": [
                {"label": "17", "correct": True},
                {"label": "32", "correct": False},
                {"label": "23", "correct": False}
            ],
            "hint": "Le moltiplicazioni e divisioni hanno la precedenza sulle addizioni.",
            "explanation": "Prima si esegue la moltiplicazione: 3 × 4 = 12. Poi l'addizione: 5 + 12 = 17."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-mat-s1-e12",
            "type": "dragdrop",
            "mode": "sort",
            "prompt": "Ordina queste frazioni dalla più piccola alla più grande.",
            "sortItems": ["1/6", "1/4", "1/2", "3/4"],
            "hint": "A parità di numeratore, è più grande la frazione col denominatore più piccolo.",
            "explanation": "1/6 (0,166) < 1/4 (0,25) < 1/2 (0,5) < 3/4 (0,75)."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-mat-s1-e13",
            "type": "quiz",
            "prompt": "La somma degli angoli interni di un quadrilatero (es. rettangolo, trapezio, rombo) è sempre pari a...",
            "options": [
                {"label": "360°", "correct": True},
                {"label": "180°", "correct": False},
                {"label": "270°", "correct": False}
            ],
            "hint": "Un quadrilatero si può dividere in 2 triangoli: 180° × 2.",
            "explanation": "La somma degli angoli interni di un quadrilatero è (4 − 2) × 180° = 360°."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-mat-s1-e14",
            "type": "quiz",
            "prompt": "Quanto vale la potenza con esponente zero: 7⁰?",
            "options": [
                {"label": "1", "correct": True},
                {"label": "0", "correct": False},
                {"label": "7", "correct": False}
            ],
            "hint": "Ogni numero diverso da zero elevato a zero è uguale a...",
            "explanation": "Qualsiasi numero (diverso da 0) elevato a zero dà sempre 1 per convenzione algebrica."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-mat-s1-e15",
            "type": "quiz",
            "prompt": "Quanto fa la moltiplicazione tra frazioni: 2/3 × 3/5?",
            "options": [
                {"label": "2/5", "correct": True},
                {"label": "6/15", "correct": False},
                {"label": "5/8", "correct": False}
            ],
            "hint": "Puoi semplificare a croce il 3 al numeratore col 3 al denominatore.",
            "explanation": "Semplificando il 3: (2 × 1) / (1 × 5) = 2/5."
        }
    },

    # ── S2 (15 quesiti) ────────────────────────────────────────────────────────
    {
        "years": ["S2"],
        "round": {
            "id": "qb-mat-s2-e1",
            "type": "quiz",
            "prompt": "In un triangolo rettangolo, come si chiama il lato opposto all'angolo retto, che è anche il più lungo?",
            "options": [
                {"label": "Ipotenusa", "correct": True},
                {"label": "Cateto maggiore", "correct": False},
                {"label": "Cateto minore", "correct": False}
            ],
            "hint": "Il Teorema di Pitagora la lega ai due cateti.",
            "explanation": "L'ipotenusa è il lato più lungo del triangolo rettangolo ed è opposta all'angolo di 90°."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-mat-s2-e2",
            "type": "quiz",
            "prompt": "Nella proporzione 4 : 8 = 5 : x, quanto vale l'incognito x?",
            "options": [
                {"label": "10", "correct": True},
                {"label": "12", "correct": False},
                {"label": "9", "correct": False}
            ],
            "hint": "In una proporzione il prodotto dei medi è uguale al prodotto degli estremi: 4 × x = 8 × 5.",
            "explanation": "x = (8 × 5) ÷ 4 = 40 ÷ 4 = 10."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-mat-s2-e3",
            "type": "quiz",
            "prompt": "Quanto vale la radice quadrata di 144 (√144)?",
            "options": [
                {"label": "12", "correct": True},
                {"label": "14", "correct": False},
                {"label": "11", "correct": False}
            ],
            "hint": "Quale numero moltiplicato per se stesso dà 144?",
            "explanation": "12 × 12 = 144, quindi √144 = 12."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-mat-s2-e4",
            "type": "quiz",
            "prompt": "Un paio di scarpe costa 80 euro. Durante i saldi c'è uno sconto del 30%. Quanto risparmi?",
            "options": [
                {"label": "24 euro", "correct": True},
                {"label": "30 euro", "correct": False},
                {"label": "20 euro", "correct": False}
            ],
            "hint": "Calcola il 30% di 80: (80 × 30) ÷ 100.",
            "explanation": "Sconto = 80 × 0,30 = 24 euro."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-mat-s2-e5",
            "type": "quiz",
            "prompt": "Secondo il Teorema di Pitagora, se i cateti di un triangolo rettangolo misurano a=6 cm e b=8 cm, quanto misura l'ipotenusa c?",
            "options": [
                {"label": "10 cm", "correct": True},
                {"label": "14 cm", "correct": False},
                {"label": "12 cm", "correct": False}
            ],
            "hint": "c² = a² + b² = 6² + 8² = 36 + 64 = 100.",
            "explanation": "c = √100 = 10 cm."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-mat-s2-e6",
            "type": "quiz",
            "prompt": "Qual è il rapporto ridotto ai minimi termini tra 15 minuti e 1 ora (60 minuti)?",
            "options": [
                {"label": "1/4", "correct": True},
                {"label": "1/3", "correct": False},
                {"label": "1/5", "correct": False}
            ],
            "hint": "15/60: dividi numeratore e denominatore per 15.",
            "explanation": "15/60 = 1/4 (un quarto d'ora)."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-mat-s2-e7",
            "type": "dragdrop",
            "mode": "match",
            "prompt": "Abbina ogni terna pitagorica ai rispettivi cateti e ipotenusa [cateto, cateto, ipotenusa].",
            "leftItems": ["Terna fondamentale (3, 4)", "Terna (5, 12)", "Terna (8, 15)"],
            "rightItems": ["Ipotenusa 5 (3² + 4² = 25)", "Ipotenusa 13 (5² + 12² = 169)", "Ipotenusa 17 (8² + 15² = 289)"],
            "pairs": [[0, 0], [1, 1], [2, 2]],
            "hint": "Verifica che la somma dei quadrati dei cateti dia il quadrato dell'ipotenusa.",
            "explanation": "Terne pitagoriche canoniche: (3,4,5), (5,12,13), (8,15,17)."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-mat-s2-e8",
            "type": "quiz",
            "prompt": "Se due grandezze x e y sono DIRETTAMENTE proporzionali, quale delle seguenti relazioni è vera?",
            "options": [
                {"label": "Il loro rapporto y / x è costante", "correct": True},
                {"label": "Il loro prodotto x × y è costante", "correct": False},
                {"label": "La loro somma x + y è costante", "correct": False}
            ],
            "hint": "Se una raddoppia, anche l'altra raddoppia: y = k × x.",
            "explanation": "Nella proporzionalità diretta il rapporto tra le grandezze è costante (y/x = k)."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-mat-s2-e9",
            "type": "quiz",
            "prompt": "Qual è la formula per calcolare l'area del cerchio di raggio r?",
            "options": [
                {"label": "Area = π × r²", "correct": True},
                {"label": "Area = 2 × π × r", "correct": False},
                {"label": "Area = π × d", "correct": False}
            ],
            "hint": "2 × π × r è la lunghezza della circonferenza. L'area usa il raggio al quadrato.",
            "explanation": "L'area del cerchio è data da π moltiplicato per il quadrato del raggio (πr²)."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-mat-s2-e10",
            "type": "quiz",
            "prompt": "Quanto vale la frazione generatrice del numero decimale periodico semplice 0,(3)?",
            "options": [
                {"label": "1/3", "correct": True},
                {"label": "3/10", "correct": False},
                {"label": "3/100", "correct": False}
            ],
            "hint": "3/9 si semplifica dividendo per 3.",
            "explanation": "0,333... = 3/9 = 1/3."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-mat-s2-e11",
            "type": "quiz",
            "prompt": "Un poligono regolare ha l'apotema di 4 cm e il perimetro di 30 cm. Qual è la sua area?",
            "options": [
                {"label": "60 cm²", "correct": True},
                {"label": "120 cm²", "correct": False},
                {"label": "34 cm²", "correct": False}
            ],
            "hint": "Area = (Perimetro × apotema) diviso 2.",
            "explanation": "Area = (30 × 4) ÷ 2 = 120 ÷ 2 = 60 cm²."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-mat-s2-e12",
            "type": "dragdrop",
            "mode": "sort",
            "prompt": "Ordina i quadrati perfetti in ordine crescente.",
            "sortItems": ["7² (49)", "8² (64)", "9² (81)", "10² (100)"],
            "hint": "Calcola il quadrato di ciascun numero.",
            "explanation": "49 < 64 < 81 < 100."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-mat-s2-e13",
            "type": "quiz",
            "prompt": "Due triangoli che hanno gli angoli corrispondenti uguali e i lati corrispondenti in proporzione si dicono...",
            "options": [
                {"label": "Triangoli simili", "correct": True},
                {"label": "Triangoli congruenti", "correct": False},
                {"label": "Triangoli equivalenti", "correct": False}
            ],
            "hint": "Hanno la stessa forma ma dimensioni diverse.",
            "explanation": "I poligoni simili hanno angoli ordinatamente congruenti e lati omologhi in proporzione."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-mat-s2-e14",
            "type": "quiz",
            "prompt": "In una cartina geografica la scala è 1 : 100.000. Se due città distano 3 cm sulla mappa, qual è la distanza reale?",
            "options": [
                {"label": "3 km (300.000 cm)", "correct": True},
                {"label": "30 km", "correct": False},
                {"label": "300 metri", "correct": False}
            ],
            "hint": "3 × 100.000 = 300.000 cm. Trasforma i centimetri in chilometri.",
            "explanation": "300.000 cm = 3.000 m = 3 km."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-mat-s2-e15",
            "type": "quiz",
            "prompt": "Se una stampante stampa 20 pagine in 2 minuti, quante pagine stamperà in 5 minuti alla stessa velocità?",
            "options": [
                {"label": "50 pagine", "correct": True},
                {"label": "40 pagine", "correct": False},
                {"label": "60 pagine", "correct": False}
            ],
            "hint": "Calcola la velocità al minuto: 20 ÷ 2 = 10 pagine al minuto. Poi moltiplica per 5.",
            "explanation": "Proporzione 20 : 2 = x : 5 -> x = (20 × 5) ÷ 2 = 50 pagine."
        }
    },

    # ── S3 (15 quesiti) ────────────────────────────────────────────────────────
    {
        "years": ["S3"],
        "round": {
            "id": "qb-mat-s3-e1",
            "type": "quiz",
            "prompt": "Risolvi l'equazione di primo grado: 3x − 7 = 14. Quanto vale l'incognita x?",
            "options": [
                {"label": "x = 7", "correct": True},
                {"label": "x = 6", "correct": False},
                {"label": "x = 8", "correct": False}
            ],
            "hint": "Sposta il −7 a destra cambiandolo di segno (+7), poi dividi per 3.",
            "explanation": "3x = 14 + 7 -> 3x = 21 -> x = 21 ÷ 3 = 7."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-mat-s3-e2",
            "type": "quiz",
            "prompt": "Quanto fa il prodotto dei monomi: (2x²y) × (−3xy³)?",
            "options": [
                {"label": "−6x³y⁴", "correct": True},
                {"label": "−6x²y³", "correct": False},
                {"label": "6x³y⁴", "correct": False}
            ],
            "hint": "Moltiplica i coefficienti (2 × −3 = −6) e somma gli esponenti delle lettere uguali.",
            "explanation": "(2 × −3) · x^(2+1) · y^(1+3) = −6x³y⁴."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-mat-s3-e3",
            "type": "quiz",
            "prompt": "Qual è il volume di un cilindro che ha raggio di base r=3 cm e altezza h=10 cm?",
            "options": [
                {"label": "90π cm³", "correct": True},
                {"label": "60π cm³", "correct": False},
                {"label": "30π cm³", "correct": False}
            ],
            "hint": "Volume cilindro = Area base × altezza = (π × r²) × h.",
            "explanation": "Area base = π × 3² = 9π. Volume = 9π × 10 = 90π cm³ (circa 282,6 cm³)."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-mat-s3-e4",
            "type": "quiz",
            "prompt": "Qual è la formula del quadrato di binomio: (a + b)²?",
            "options": [
                {"label": "a² + 2ab + b²", "correct": True},
                {"label": "a² + b²", "correct": False},
                {"label": "a² − 2ab + b²", "correct": False}
            ],
            "hint": "Include il quadrato del primo, il doppio prodotto e il quadrato del secondo.",
            "explanation": "(a + b)² = a² + 2ab + b²."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-mat-s3-e5",
            "type": "quiz",
            "prompt": "Nell'equazione di una retta y = mx + q, cosa rappresenta il coefficiente m?",
            "options": [
                {"label": "Il coefficiente angolare (la pendenza della retta)", "correct": True},
                {"label": "Il punto di intersezione con l'asse x", "correct": False},
                {"label": "La lunghezza della retta", "correct": False}
            ],
            "hint": "Se m è positivo la retta sale verso destra, se m è negativo scende.",
            "explanation": "m indica la pendenza (inclinazione) della retta rispetto all'asse delle ascisse x."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-mat-s3-e6",
            "type": "quiz",
            "prompt": "In statistica, in una serie di dati ordinati, come si chiama il valore centrale che divide la distribuzione a metà?",
            "options": [
                {"label": "Mediana", "correct": True},
                {"label": "Moda", "correct": False},
                {"label": "Media", "correct": False}
            ],
            "hint": "La moda è il valore più frequente, la media è la somma diviso il numero di elementi.",
            "explanation": "La mediana è il valore centrale che bipartisce la serie dei dati ordinati."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-mat-s3-e7",
            "type": "dragdrop",
            "mode": "match",
            "prompt": "Abbina ogni solido di rotazione alla figura piana che ruota attorno a un asse per generarlo.",
            "leftItems": ["Cilindro", "Cono", "Sfera"],
            "rightItems": ["Rettangolo che ruota attorno a un lato", "Triangolo rettangolo attorno a un cateto", "Semicerchio che ruota attorno al diametro"],
            "pairs": [[0, 0], [1, 1], [2, 2]],
            "hint": "Pensa alla rotazione completa di 360° nello spazio.",
            "explanation": "Definizione dei tre principali solidi di rotazione studiati in terza media."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-mat-s3-e8",
            "type": "quiz",
            "prompt": "Risolvi: (−4) × (−5) + (−12) ÷ (+3). Quanto fa?",
            "options": [
                {"label": "+16", "correct": True},
                {"label": "+24", "correct": False},
                {"label": "−16", "correct": False}
            ],
            "hint": "Meno per meno fa più (+20). Meno diviso più fa meno (−4). Fai 20 − 4.",
            "explanation": "(−4) × (−5) = +20; (−12) ÷ (+3) = −4. Risultato: 20 − 4 = 16."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-mat-s3-e9",
            "type": "quiz",
            "prompt": "Qual è il volume di un cubo con spigolo lungo s = 5 cm?",
            "options": [
                {"label": "125 cm³", "correct": True},
                {"label": "150 cm³", "correct": False},
                {"label": "25 cm³", "correct": False}
            ],
            "hint": "Volume = s³ = 5 × 5 × 5.",
            "explanation": "Volume cubo = 5³ = 125 cm³."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-mat-s3-e10",
            "type": "quiz",
            "prompt": "Come si chiama un'equazione che è verificata per QUALSIASI valore assegnato all'incognita (es. 2x + 4 = 2(x + 2))?",
            "options": [
                {"label": "Identità", "correct": True},
                {"label": "Equazione impossibile", "correct": False},
                {"label": "Equazione determinata", "correct": False}
            ],
            "hint": "Entrambi i membri sono identici per ogni valore di x.",
            "explanation": "Un'uguaglianza vera per qualsiasi valore dell'incognita è un'identità."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-mat-s3-e11",
            "type": "quiz",
            "prompt": "In un sacchetto ci sono 5 palline rosse, 3 blu e 2 verdi (10 totali). Qual è la probabilità di estrarre una pallina blu?",
            "options": [
                {"label": "3/10 (30%)", "correct": True},
                {"label": "1/3", "correct": False},
                {"label": "2/10 (20%)", "correct": False}
            ],
            "hint": "Casi favorevoli (3 blu) su casi totali (10 palline).",
            "explanation": "P = 3 / 10 = 0,3 = 30%."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-mat-s3-e12",
            "type": "dragdrop",
            "mode": "sort",
            "prompt": "Ordina i numeri razionali e irrazionali dal più piccolo al più grande.",
            "sortItems": ["−3", "0", "√4 (pari a 2)", "π (circa 3,14)"],
            "hint": "I numeri negativi sono sempre minori di zero e dei positivi.",
            "explanation": "−3 < 0 < 2 < 3,14."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-mat-s3-e13",
            "type": "quiz",
            "prompt": "Qual è il prodotto notevole somma per differenza: (x + 3)(x − 3)?",
            "options": [
                {"label": "x² − 9", "correct": True},
                {"label": "x² + 9", "correct": False},
                {"label": "x² − 6x + 9", "correct": False}
            ],
            "hint": "(A + B)(A − B) = A² − B².",
            "explanation": "(x + 3)(x − 3) = x² − 3² = x² − 9."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-mat-s3-e14",
            "type": "quiz",
            "prompt": "Qual è la distanza tra i punti A(1; 2) e B(4; 6) nel piano cartesiano?",
            "options": [
                {"label": "5 unità", "correct": True},
                {"label": "7 unità", "correct": False},
                {"label": "4 unità", "correct": False}
            ],
            "hint": "Applica Pitagora: √[(4−1)² + (6−2)²] = √[3² + 4²].",
            "explanation": "d = √[3² + 4²] = √[9 + 16] = √25 = 5."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-mat-s3-e15",
            "type": "quiz",
            "prompt": "Qual è il grado complessivo del monomio 5x³y²z?",
            "options": [
                {"label": "6° grado", "correct": True},
                {"label": "5° grado", "correct": False},
                {"label": "3° grado", "correct": False}
            ],
            "hint": "Somma gli esponenti di tutte le lettere: 3 + 2 + 1.",
            "explanation": "Esponente di x è 3, di y è 2, di z è 1. Grado = 3 + 2 + 1 = 6."
        }
    }
]
