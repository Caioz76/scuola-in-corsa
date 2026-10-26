# -*- coding: utf-8 -*-
"""Banca domande estesa di Scienze (120 nuovi quesiti autentici e curricolari)."""

SCIENZE_EXP = [
    # ── P1 (15 quesiti) ────────────────────────────────────────────────────────
    {
        "years": ["P1"],
        "round": {
            "id": "qb-sci-p1-e1",
            "type": "quiz",
            "prompt": "Quale organo di senso usiamo per ascoltare i suoni e la musica?",
            "options": [
                {"label": "Le orecchie (udito)", "correct": True},
                {"label": "Gli occhi (vista)", "correct": False},
                {"label": "La lingua (gusto)", "correct": False}
            ],
            "hint": "Ci permettono di sentire la voce degli amici.",
            "explanation": "Le orecchie sono gli organi dell'udito."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-sci-p1-e2",
            "type": "quiz",
            "prompt": "Quale tra questi è un ESSERE VIVENTE (nasce, cresce, si nutre, si riproduce e muore)?",
            "options": [
                {"label": "Una piantina di fragole", "correct": True},
                {"label": "Un sasso di fiume", "correct": False},
                {"label": "Una matita di legno", "correct": False}
            ],
            "hint": "Ha bisogno di acqua, terra e luce per crescere.",
            "explanation": "Le piante sono esseri viventi perché compiono il ciclo vitale."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-sci-p1-e3",
            "type": "quiz",
            "prompt": "Quale parte della pianta si trova sotto terra per assorbire acqua e nutrimento?",
            "options": [
                {"label": "Le radici", "correct": True},
                {"label": "Le foglie", "correct": False},
                {"label": "I fiori", "correct": False}
            ],
            "hint": "Tengono l'albero saldo al terreno.",
            "explanation": "Le radici ancorano la pianta al suolo e assorbono acqua e sali minerali."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-sci-p1-e4",
            "type": "quiz",
            "prompt": "Quale organo di senso ci permette di sentire se un oggetto è liscio, ruvido, caldo o freddo?",
            "options": [
                {"label": "La pelle (tatto)", "correct": True},
                {"label": "Il naso (olfatto)", "correct": False},
                {"label": "Gli occhi (vista)", "correct": False}
            ],
            "hint": "Lo sentiamo toccando con le dita e con le mani.",
            "explanation": "Il tatto ha come organo diffuso la pelle di tutto il corpo."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-sci-p1-e5",
            "type": "quiz",
            "prompt": "Cosa appare nel cielo durante il giorno e dona luce e calore alla Terra?",
            "options": [
                {"label": "Il Sole", "correct": True},
                {"label": "La Luna", "correct": False},
                {"label": "Le stelle cadenti", "correct": False}
            ],
            "hint": "È una stella luminosissima e gialla.",
            "explanation": "Il Sole è la stella che illumina e riscalda il nostro pianeta di giorno."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-sci-p1-e6",
            "type": "quiz",
            "prompt": "Quale animale si muove nell'acqua usando le pinne e respira con le branchie?",
            "options": [
                {"label": "Il pesce", "correct": True},
                {"label": "Il gatto", "correct": False},
                {"label": "Il cane", "correct": False}
            ],
            "hint": "Vive nei mari, nei fiumi e nei laghi.",
            "explanation": "I pesci sono animali acquatici dotati di pinne per nuotare e branchie per respirare sott'acqua."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-sci-p1-e7",
            "type": "dragdrop",
            "mode": "match",
            "prompt": "Abbina ogni senso al rispettivo organo del corpo umano.",
            "leftItems": ["Vista", "Olfatto", "Gusto"],
            "rightItems": ["Occhi", "Naso", "Lingua"],
            "pairs": [[0, 0], [1, 1], [2, 2]],
            "hint": "Collega la funzione all'organo che la compie.",
            "explanation": "Gli occhi vedono, il naso annusa gli odori, la lingua sente i sapori."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-sci-p1-e8",
            "type": "quiz",
            "prompt": "Quale tra queste è una caratteristica degli esseri NON VIVENTI?",
            "options": [
                {"label": "Non respirano e non hanno bisogno di cibo", "correct": True},
                {"label": "Crescono se mangiano molto", "correct": False},
                {"label": "Hanno cuccioli", "correct": False}
            ],
            "hint": "Pensa a un mattone o a un sasso.",
            "explanation": "I non viventi non hanno cellule, non respirano e non si nutrono."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-sci-p1-e9",
            "type": "quiz",
            "prompt": "Quale parte della pianta cattura la luce del sole e fa respirare la pianta?",
            "options": [
                {"label": "Le foglie", "correct": True},
                {"label": "Il tronco", "correct": False},
                {"label": "Le radici", "correct": False}
            ],
            "hint": "Di solito sono verdi e cadono in autunno.",
            "explanation": "Le foglie sono i laboratori verdi della pianta per assorbire luce solare e anidride carbonica."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-sci-p1-e10",
            "type": "quiz",
            "prompt": "Cosa accade all'acqua se la metti nel congelatore per alcune ore?",
            "options": [
                {"label": "Diventa ghiaccio solido", "correct": True},
                {"label": "Evapora e scompare", "correct": False},
                {"label": "Diventa bollente", "correct": False}
            ],
            "hint": "Con il freddo intenso l'acqua liquida gela.",
            "explanation": "Sotto gli 0 °C l'acqua liquida solidifica diventando ghiaccio."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-sci-p1-e11",
            "type": "quiz",
            "prompt": "Come si muove l'uccello nel cielo?",
            "options": [
                {"label": "Vola usando le ali", "correct": True},
                {"label": "Striscia sulla terra", "correct": False},
                {"label": "Nuota con le pinne", "correct": False}
            ],
            "hint": "Ha piume e ali leggere per volare.",
            "explanation": "Gli uccelli hanno scheletro leggero e ali per il volo."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-sci-p1-e12",
            "type": "dragdrop",
            "mode": "sort",
            "prompt": "Ordina i momenti della giornata dal mattino alla notte.",
            "sortItems": ["Alba (sorge il sole)", "Mezzogiorno (pranzo)", "Tramonto (il sole cala)", "Notte (buio con la luna)"],
            "hint": "Dall'inizio del giorno fino al sonno.",
            "explanation": "Ciclo giornaliero di luce e buio: alba -> mezzogiorno -> tramonto -> notte."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-sci-p1-e13",
            "type": "quiz",
            "prompt": "Quale sapore sentiamo quando mangiamo una caramella o beviamo una bibita zuccherata?",
            "options": [
                {"label": "Dolce", "correct": True},
                {"label": "Salato", "correct": False},
                {"label": "Amaro", "correct": False}
            ],
            "hint": "È il sapore del miele e dello zucchero.",
            "explanation": "Le papille gustative della lingua riconoscono il sapore dolce dello zucchero."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-sci-p1-e14",
            "type": "quiz",
            "prompt": "In quale stagione dell'anno fa più caldo e si va in vacanza al mare?",
            "options": [
                {"label": "Estate", "correct": True},
                {"label": "Inverno", "correct": False},
                {"label": "Autunno", "correct": False}
            ],
            "hint": "C'è tanto sole e le giornate sono lunghissime.",
            "explanation": "L'estate è la stagione più calda dell'anno."
        }
    },
    {
        "years": ["P1"],
        "round": {
            "id": "qb-sci-p1-e15",
            "type": "quiz",
            "prompt": "Cosa serve a una pianta per vivere e crescere sana?",
            "options": [
                {"label": "Luce del sole, acqua e terra", "correct": True},
                {"label": "Solo buio e freddo", "correct": False},
                {"label": "Caramelle e succhi", "correct": False}
            ],
            "hint": "Se la metti al buio e senza bagnarla, la pianta muore.",
            "explanation": "Le piante hanno bisogno di luce solare, acqua, sali minerali e aria per sopravvivere."
        }
    },

    # ── P2 (15 quesiti) ────────────────────────────────────────────────────────
    {
        "years": ["P2"],
        "round": {
            "id": "qb-sci-p2-e1",
            "type": "quiz",
            "prompt": "Come si chiama un animale che si nutre SOLO di erba, foglie, frutti e piante?",
            "options": [
                {"label": "Erbivoro", "correct": True},
                {"label": "Carnivoro", "correct": False},
                {"label": "Onnivoro", "correct": False}
            ],
            "hint": "Come la mucca, il cavallo o la pecora.",
            "explanation": "Gli erbivori si nutrono esclusivamente di sostanze vegetali."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-sci-p2-e2",
            "type": "quiz",
            "prompt": "Come nascono i cuccioli degli animali OVIPARI (come la gallina o la lucertola)?",
            "options": [
                {"label": "Dalle uova deposte dalla madre", "correct": True},
                {"label": "Direttamente dalla pancia della mamma già formati", "correct": False},
                {"label": "Spuntano dal terreno come i funghi", "correct": False}
            ],
            "hint": "'Ovo' in latino significa uovo.",
            "explanation": "Gli ovipari si riproducono deponendo uova che poi si schiudono."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-sci-p2-e3",
            "type": "quiz",
            "prompt": "Quali sono i TRE stati in cui può trovarsi l'acqua in natura?",
            "options": [
                {"label": "Solido (ghiaccio), Liquido (acqua), Gassoso (vapore)", "correct": True},
                {"label": "Caldo, Freddo, Tiepido", "correct": False},
                {"label": "Fiume, Mare, Lago", "correct": False}
            ],
            "hint": "Pensa a un cubetto di ghiaccio, all'acqua del rubinetto e al vapore della pentola.",
            "explanation": "I tre stati fisici della materia per l'acqua sono solido, liquido e gassoso."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-sci-p2-e4",
            "type": "quiz",
            "prompt": "Come si chiama la trasformazione straordinaria del bruco che diventa crisalide e poi farfalla?",
            "options": [
                {"label": "Metamorfosi", "correct": True},
                {"label": "Fotosintesi", "correct": False},
                {"label": "Letargo", "correct": False}
            ],
            "hint": "Parola di origine greca che significa 'cambiamento di forma'.",
            "explanation": "La metamorfosi è la trasformazione biologica radicale di insetti e anfibi."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-sci-p2-e5",
            "type": "quiz",
            "prompt": "Cosa fanno alcuni animali (come l'orso o il ghiro) per superare il freddo e la mancanza di cibo in inverno?",
            "options": [
                {"label": "Vanno in letargo (un lungo sonno invernale)", "correct": True},
                {"label": "Accendono il camino", "correct": False},
                {"label": "Fanno una grande festa nella tana", "correct": False}
            ],
            "hint": "Riducono il battito cardiaco e dormono per mesi nella tana.",
            "explanation": "Il letargo è un adattamento fisiologico per sopravvivere alla stagione rigida."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-sci-p2-e6",
            "type": "quiz",
            "prompt": "Quale insetto laborioso vola di fiore in fiore trasportando il polline e producendo miele?",
            "options": [
                {"label": "L'ape", "correct": True},
                {"label": "La zanzara", "correct": False},
                {"label": "La mosca", "correct": False}
            ],
            "hint": "Vive nell'alveare ed è un prezioso impollinatore.",
            "explanation": "L'ape raccoglie nettare e polline, favorendo la fecondazione delle piante (impollinazione)."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-sci-p2-e7",
            "type": "dragdrop",
            "mode": "match",
            "prompt": "Abbina ogni tipo di alimentazione all'animale corrispondente.",
            "leftItems": ["Erbivoro (erba e foglie)", "Carnivoro (carne)", "Onnivoro (carne e vegetali)"],
            "rightItems": ["Mucca", "Leone", "Orso (e l'uomo)"],
            "pairs": [[0, 0], [1, 1], [2, 2]],
            "hint": "Guarda la dieta abituale di questi animali.",
            "explanation": "La mucca mangia erba, il leone caccia prede, l'orso mangia pesci, bacche e radici."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-sci-p2-e8",
            "type": "quiz",
            "prompt": "Come si chiama il passaggio dell'acqua da LIQUIDA a VAPORE quando bolle sul fuoco?",
            "options": [
                {"label": "Evaporazione (o ebollizione)", "correct": True},
                {"label": "Solidificazione", "correct": False},
                {"label": "Fusione", "correct": False}
            ],
            "hint": "L'acqua sale verso l'alto sotto forma di vapore trasparente.",
            "explanation": "Con il calore l'acqua evapora passando dallo stato liquido a quello gassoso."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-sci-p2-e9",
            "type": "quiz",
            "prompt": "Quale parte colorata del fiore attira gli insetti impollinatori?",
            "options": [
                {"label": "I petali (corolla)", "correct": True},
                {"label": "Le radici", "correct": False},
                {"label": "I rami", "correct": False}
            ],
            "hint": "Sono vivacemente colorati e profumati.",
            "explanation": "I petali formano la corolla del fiore per attrarre api, farfalle e bombi."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-sci-p2-e10",
            "type": "quiz",
            "prompt": "Da cosa nascono i pulcini?",
            "options": [
                {"label": "Dalle uova covate dalla chioccia", "correct": True},
                {"label": "Dalla pancia del gallo", "correct": False},
                {"label": "Dalla terra bagnata", "correct": False}
            ],
            "hint": "La gallina cova l'uovo per circa 21 giorni.",
            "explanation": "Gli uccelli sono ovipari: il pulcino si sviluppa dentro l'uovo e poi rompe il guscio."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-sci-p2-e11",
            "type": "quiz",
            "prompt": "In quale stagione gli alberi a foglie caduche perdono le foglie ingiallite?",
            "options": [
                {"label": "Autunno", "correct": True},
                {"label": "Primavera", "correct": False},
                {"label": "Estate", "correct": False}
            ],
            "hint": "La stagione delle castagne, delle zucche e dei funghi.",
            "explanation": "In autunno la clorofilla cala, le foglie diventano rosse/gialle e cadono."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-sci-p2-e12",
            "type": "dragdrop",
            "mode": "sort",
            "prompt": "Ordina le quattro stagioni dell'anno partendo dalla rinascita della natura.",
            "sortItems": ["Primavera (fiori e gemme)", "Estate (caldo e mare)", "Autunno (foglie e pioggia)", "Inverno (freddo e neve)"],
            "hint": "La sequenza ciclica delle 4 stagioni.",
            "explanation": "Primavera -> Estate -> Autunno -> Inverno."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-sci-p2-e13",
            "type": "quiz",
            "prompt": "Cosa c'è all'interno di un frutto che permette di far nascere una nuova pianta?",
            "options": [
                {"label": "Il seme", "correct": True},
                {"label": "La foglia", "correct": False},
                {"label": "Il ramo", "correct": False}
            ],
            "hint": "Se lo pianti nel terreno e lo innaffi germoglia.",
            "explanation": "Il seme custodisce l'embrione della futura piantina."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-sci-p2-e14",
            "type": "quiz",
            "prompt": "Come si chiama un animale che mangia sia vegetali sia carne (come l'uomo, il maiale o l'orso)?",
            "options": [
                {"label": "Onnivoro", "correct": True},
                {"label": "Erbivoro", "correct": False},
                {"label": "Carnivoro", "correct": False}
            ],
            "hint": "'Omni' significa 'tutto'. Mangia di tutto.",
            "explanation": "Gli onnivori hanno un apparato digerente in grado di assimilare sia carne sia vegetali."
        }
    },
    {
        "years": ["P2"],
        "round": {
            "id": "qb-sci-p2-e15",
            "type": "quiz",
            "prompt": "Quando un cubetto di ghiaccio si scioglie al sole diventando acqua liquida, quale fenomeno avviene?",
            "options": [
                {"label": "Fusione", "correct": True},
                {"label": "Solidificazione", "correct": False},
                {"label": "Condensazione", "correct": False}
            ],
            "hint": "Il calore fonde il solido trasformandolo in liquido.",
            "explanation": "Il passaggio dallo stato solido allo stato liquido è la fusione."
        }
    },

    # ── P3 (15 quesiti) ────────────────────────────────────────────────────────
    {
        "years": ["P3"],
        "round": {
            "id": "qb-sci-p3-e1",
            "type": "quiz",
            "prompt": "Come si chiama il processo con cui le piante verdi usano la luce del sole, l'acqua e l'anidride carbonica per produrre cibo e liberare OSSIGENO?",
            "options": [
                {"label": "Fotosintesi clorofilliana", "correct": True},
                {"label": "Metamorfosi", "correct": False},
                {"label": "Ebollizione", "correct": False}
            ],
            "hint": "Avviene grazie alla clorofilla presente nelle foglie.",
            "explanation": "La fotosintesi produce glucosio per la pianta e rilascia ossigeno nell'atmosfera."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-sci-p3-e2",
            "type": "quiz",
            "prompt": "Quale grande caratteristica distingue gli animali VERTEBRATI dagli invertebrati?",
            "options": [
                {"label": "I vertebrati possiedono uno scheletro interno con la colonna vertebrale", "correct": True},
                {"label": "I vertebrati hanno le ali per volare", "correct": False},
                {"label": "I vertebrati vivono solo nell'acqua", "correct": False}
            ],
            "hint": "Hanno le ossa e la colonna vertebrale all'interno del corpo.",
            "explanation": "I vertebrati hanno uno scheletro osseo o cartilagineo interno con colonna vertebrale."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-sci-p3-e3",
            "type": "quiz",
            "prompt": "Nel ciclo dell'acqua, cosa accade quando il vapore acqueo sale in alto, si raffredda e forma minuscole goccioline?",
            "options": [
                {"label": "Si condensa e forma le nuvole", "correct": True},
                {"label": "Evapora nello spazio cosmico", "correct": False},
                {"label": "Diventa lava rovente", "correct": False}
            ],
            "hint": "Il vapore gassoso torna liquido: condensazione.",
            "explanation": "La condensazione del vapore acqueo nell'atmosfera fredda genera le nuvole e la nebbia."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-sci-p3-e4",
            "type": "quiz",
            "prompt": "Come si chiama lo strato superficiale e fertile del terreno, scuro e ricco di resti organici decomposti?",
            "options": [
                {"label": "Humus", "correct": True},
                {"label": "Roccia madre", "correct": False},
                {"label": "Ghiaia pura", "correct": False}
            ],
            "hint": "È fondamentale per la crescita delle piante nell'orto.",
            "explanation": "L'humus è la parte organica più fertile del terreno agrario."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-sci-p3-e5",
            "type": "quiz",
            "prompt": "Quale gas indispensabile per la nostra respirazione viene liberato dalle piante durante il giorno?",
            "options": [
                {"label": "Ossigeno", "correct": True},
                {"label": "Anidride carbonica", "correct": False},
                {"label": "Azoto", "correct": False}
            ],
            "hint": "È il gas vitale che respirano gli esseri umani e gli animali.",
            "explanation": "Con la fotosintesi le piante emettono ossigeno puro nell'aria."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-sci-p3-e6",
            "type": "quiz",
            "prompt": "A quale gruppo di vertebrati appartengono la rana e il rospo, che vivono sia in acqua sia sulla terraferma?",
            "options": [
                {"label": "Anfibi", "correct": True},
                {"label": "Rettili", "correct": False},
                {"label": "Mammiferi", "correct": False}
            ],
            "hint": "'Anfi' significa 'doppio': hanno una doppia vita in acqua e su terra.",
            "explanation": "Gli anfibi nascono in acqua come girini con branchie e da adulti respirano coi polmoni sulla terra."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-sci-p3-e7",
            "type": "dragdrop",
            "mode": "match",
            "prompt": "Abbina ogni classe di vertebrati alla rispettiva caratteristica corporea.",
            "leftItems": ["Uccelli", "Pesci", "Mammiferi"],
            "rightItems": ["Piume, penne e becco", "Scaglie e pinne", "Peli e allattano i piccoli"],
            "pairs": [[0, 0], [1, 1], [2, 2]],
            "hint": "Guarda il rivestimento esterno del corpo.",
            "explanation": "Caratteristiche morfologiche distintive delle classi dei vertebrati."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-sci-p3-e8",
            "type": "quiz",
            "prompt": "Quale tra questi animali è un INVERTEBRATO (non ha colonna vertebrale)?",
            "options": [
                {"label": "La chiocciola (lumaca con guscio)", "correct": True},
                {"label": "Il cane", "correct": False},
                {"label": "Il passero", "correct": False}
            ],
            "hint": "Ha un corpo molle protetto da un guscio calcareo.",
            "explanation": "I molluschi (come la chiocciola e il polpo) sono invertebrati privi di ossa."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-sci-p3-e9",
            "type": "quiz",
            "prompt": "Come si chiama l'involucro d'aria invisibile che avvolge e protegge l'intero pianeta Terra?",
            "options": [
                {"label": "Atmosfera", "correct": True},
                {"label": "Idrosfera", "correct": False},
                {"label": "Litosfera", "correct": False}
            ],
            "hint": "Contiene l'aria che respiriamo e fa da scudo ai raggi solari nocivi.",
            "explanation": "L'atmosfera è lo strato di gas trattenuto dalla gravità terrestre."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-sci-p3-e10",
            "type": "quiz",
            "prompt": "Perché le lucertole e i serpenti si scaldano spesso al sole sulle rocce calde?",
            "options": [
                {"label": "Perché sono animali a sangue freddo (eterotermi)", "correct": True},
                {"label": "Perché non sanno nuotare", "correct": False},
                {"label": "Perché mangiano la luce del sole", "correct": False}
            ],
            "hint": "La loro temperatura corporea dipende dalla temperatura dell'ambiente esterno.",
            "explanation": "I rettili sono eterotermi: la temperatura del loro corpo varia con l'ambiente."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-sci-p3-e11",
            "type": "quiz",
            "prompt": "Qual è il pigmento verde all'interno delle foglie che cattura l'energia solare?",
            "options": [
                {"label": "La clorofilla", "correct": True},
                {"label": "L'ossigeno", "correct": False},
                {"label": "La resina", "correct": False}
            ],
            "hint": "Dona alle foglie il loro colore verde brillante.",
            "explanation": "La clorofilla è la sostanza fotosintetica che assorbe la luce solare."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-sci-p3-e12",
            "type": "dragdrop",
            "mode": "sort",
            "prompt": "Ordina le fasi del CICLO DELL'ACQUA in natura partendo dal mare riscaldato dal sole.",
            "sortItems": ["Evaporazione (l'acqua sale come vapore)", "Condensazione (si formano le nuvole)", "Precipitazione (pioggia o neve)", "Ritorno (i fiumi scorrono al mare)"],
            "hint": "Il viaggio senza fine della gocciolina d'acqua.",
            "explanation": "Evaporazione -> Condensazione -> Precipitazione -> Ritorno e infiltrazione."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-sci-p3-e13",
            "type": "quiz",
            "prompt": "Quale tipo di terreno lascia passare l'acqua molto velocemente senza trattenerla (molto permeabile)?",
            "options": [
                {"label": "Il terreno sabbioso", "correct": True},
                {"label": "Il terreno argilloso", "correct": False},
                {"label": "Il terreno roccioso compatto", "correct": False}
            ],
            "hint": "Pensa a cosa succede quando versi un secchiello d'acqua sulla sabbia in spiaggia.",
            "explanation": "La sabbia ha grani grossi con ampi spazi vuoti, quindi è molto permeabile all'acqua."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-sci-p3-e14",
            "type": "quiz",
            "prompt": "Quale animale tra questi è un MAMMIFERO che vive nel mare e allatta il suo piccolo sott'acqua?",
            "options": [
                {"label": "Il delfino", "correct": True},
                {"label": "Lo squalo (pesce cartilagineo)", "correct": False},
                {"label": "Il tonno", "correct": False}
            ],
            "hint": "Respira con i polmoni e deve salire in superficie a prendere aria dallo sfiatatoio.",
            "explanation": "I cetacei (delfini e balene) sono mammiferi marini: respirano aria e allattano i piccoli."
        }
    },
    {
        "years": ["P3"],
        "round": {
            "id": "qb-sci-p3-e15",
            "type": "quiz",
            "prompt": "Come si chiamano i piccoli fori microscopici sulle foglie attraverso cui la pianta scambia i gas dell'aria?",
            "options": [
                {"label": "Stomi", "correct": True},
                {"label": "Pori ossei", "correct": False},
                {"label": "Branchie", "correct": False}
            ],
            "hint": "Si aprono e si chiudono sulla pagina inferiore della foglia.",
            "explanation": "Gli stomi consentono la traspirazione e lo scambio gassoso di ossigeno e anidride carbonica."
        }
    },

    # ── P4 (15 quesiti) ────────────────────────────────────────────────────────
    {
        "years": ["P4"],
        "round": {
            "id": "qb-sci-p4-e1",
            "type": "quiz",
            "prompt": "In una catena alimentare, chi sono i PRODUTTORI (quelli che fabbricano da soli il proprio nutrimento)?",
            "options": [
                {"label": "I vegetali e le piante verdi (autotrofi)", "correct": True},
                {"label": "Gli erbivori", "correct": False},
                {"label": "I predatori carnivori", "correct": False}
            ],
            "hint": "Stanno sempre alla base della piramide ecologica.",
            "explanation": "Le piante sono organismi produttori perché producono materia organica tramite fotosintesi."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-sci-p4-e2",
            "type": "quiz",
            "prompt": "Qual è la differenza fondamentale tra CALORE e TEMPERATURA?",
            "options": [
                {"label": "Il calore è una forma di energia termica; la temperatura è la misura di quanto un corpo è caldo", "correct": True},
                {"label": "Sono esattamente la stessa identica cosa", "correct": False},
                {"label": "La temperatura è il combustibile, il calore è il termometro", "correct": False}
            ],
            "hint": "Il calore si trasferisce da un corpo caldo a uno freddo; la temperatura si misura in gradi Celsius (°C).",
            "explanation": "Il calore è energia termica in transito; la temperatura misura l'agitazione termica delle molecole."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-sci-p4-e3",
            "type": "quiz",
            "prompt": "Come si chiama il passaggio di stato diretto da GAS a LIQUIDO (es. il vapore acqueo che forma le gocce sul coperchio freddo)?",
            "options": [
                {"label": "Condensazione", "correct": True},
                {"label": "Evaporazione", "correct": False},
                {"label": "Sublimazione", "correct": False}
            ],
            "hint": "Il gas cede calore e ritorna liquido.",
            "explanation": "La condensazione è il passaggio di stato dalla fase gassosa alla fase liquida."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-sci-p4-e4",
            "type": "quiz",
            "prompt": "In un ecosistema, che ruolo svolgono i DECOMPOSITORI (come batteri, funghi e lombrichi)?",
            "options": [
                {"label": "Scompongono resti di piante e animali morti trasformandoli in sali minerali per il suolo", "correct": True},
                {"label": "Cacciano i grandi predatori", "correct": False},
                {"label": "Fanno ombra alle piante", "correct": False}
            ],
            "hint": "Riciclano la materia organica chiudendo il ciclo ecologico.",
            "explanation": "I decompositori mineralizzano la materia organica morta, rigenerando i nutrienti del terreno."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-sci-p4-e5",
            "type": "quiz",
            "prompt": "Quale tra queste piante NON fa né fiori né semi e si riproduce tramite SPORE?",
            "options": [
                {"label": "La felce (e i muschi)", "correct": True},
                {"label": "Il melo", "correct": False},
                {"label": "Il girasole", "correct": False}
            ],
            "hint": "Sono piante antichissime, già diffuse ai tempi dei dinosauri.",
            "explanation": "Muschi e felci sono piante semplici prive di fiori che si riproducono mediante spore."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-sci-p4-e6",
            "type": "quiz",
            "prompt": "Cosa accade alla maggior parte dei corpi e metalli quando vengono RISCALDATI?",
            "options": [
                {"label": "Si dilatano aumentando leggermente di volume (dilatazione termica)", "correct": True},
                {"label": "Si rimpiccioliscono all'istante", "correct": False},
                {"label": "Cambiano nome chimico", "correct": False}
            ],
            "hint": "Pensa alle fessure sui ponti stradali per evitare che si spacchino d'estate.",
            "explanation": "Con il calore le particelle vibrano con maggiore ampiezza causando la dilatazione termica."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-sci-p4-e7",
            "type": "dragdrop",
            "mode": "match",
            "prompt": "Abbina ogni passaggio di stato della materia al suo nome scientifico.",
            "leftItems": ["Solido -> Liquido", "Liquido -> Solido", "Liquido -> Vapore"],
            "rightItems": ["Fusione", "Solidificazione", "Evaporazione"],
            "pairs": [[0, 0], [1, 1], [2, 2]],
            "hint": "Pensa a cosa accade al ghiaccio e all'acqua con il calore o il freddo.",
            "explanation": "I cambiamenti di stato fisico reversibili della materia dovuti a scambi di calore."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-sci-p4-e8",
            "type": "quiz",
            "prompt": "I FUNGHI sono considerati un regno a parte rispetto alle piante perché...",
            "options": [
                {"label": "Non compiono la fotosintesi (non hanno clorofilla) e assorbono nutrimento dall'esterno", "correct": True},
                {"label": "Hanno le ali e volano di notte", "correct": False},
                {"label": "Vivono solo nell'acqua marina salata", "correct": False}
            ],
            "hint": "Sono eterotrofi, a differenza delle piante autotrofe.",
            "explanation": "I funghi costituiscono un regno autonomo perché eterotrofi e privi di clorofilla."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-sci-p4-e9",
            "type": "quiz",
            "prompt": "Quale gas compone la maggior parte dell'aria che respiriamo (circa il 78%)?",
            "options": [
                {"label": "Azoto", "correct": True},
                {"label": "Ossigeno (circa 21%)", "correct": False},
                {"label": "Anidride carbonica", "correct": False}
            ],
            "hint": "L'ossigeno è fondamentale, ma l'azoto è il gas più abbondante nell'aria.",
            "explanation": "L'aria è una miscela composta per il 78% da azoto, 21% da ossigeno e 1% da altri gas."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-sci-p4-e10",
            "type": "quiz",
            "prompt": "Che cos'è la DENSITÀ di un corpo?",
            "options": [
                {"label": "Il rapporto tra la sua massa e il volume che occupa (Massa / Volume)", "correct": True},
                {"label": "Il colore esteriore dell'oggetto", "correct": False},
                {"label": "La temperatura misurata dal termometro", "correct": False}
            ],
            "hint": "Spiega perché un pezzo di ferro affonda nell'acqua mentre un tronco di legno galleggia.",
            "explanation": "La densità (d = m / V) determina la concentrazione di massa nello spazio occupato."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-sci-p4-e11",
            "type": "quiz",
            "prompt": "Come si chiamano gli alberi come il pino e l'abete, che producono pigne con semi non racchiusi in un vero frutto?",
            "options": [
                {"label": "Gimnosperme (conifere)", "correct": True},
                {"label": "Angiosperme", "correct": False},
                {"label": "Muschi", "correct": False}
            ],
            "hint": "'Gimnosperma' significa 'seme nudo': i semi stanno tra le scaglie della pigna.",
            "explanation": "Le conifere appartengono alle gimnosperme, piante con semi scoperti raccolti in strobili."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-sci-p4-e12",
            "type": "dragdrop",
            "mode": "sort",
            "prompt": "Ordina gli anelli di una catena alimentare boschiva dal livello base al predatore finale.",
            "sortItems": ["Erba e piante (produttori)", "Lepre (consumatore primario erbivoro)", "Volpe (consumatore secondario carnivoro)", "Batteri (decompositori del suolo)"],
            "hint": "Segui il flusso dell'energia alimentare.",
            "explanation": "Pianta (fotosintesi) -> erbivoro -> carnivoro -> decompositori."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-sci-p4-e13",
            "type": "quiz",
            "prompt": "Come si chiama lo strumento usato per misurare la temperatura di un corpo o dell'ambiente?",
            "options": [
                {"label": "Termometro", "correct": True},
                {"label": "Barometro", "correct": False},
                {"label": "Bilancia", "correct": False}
            ],
            "hint": "'Termo' si riferisce al calore, 'metro' alla misurazione.",
            "explanation": "Il termometro misura la temperatura basandosi sulla dilatazione di liquidi o sensori digitali."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-sci-p4-e14",
            "type": "quiz",
            "prompt": "Quale tra questi materiali è un OTTIMO conduttore termico (trasmette molto rapidamente il calore)?",
            "options": [
                {"label": "Il rame (o i metalli in generale)", "correct": True},
                {"label": "Il legno", "correct": False},
                {"label": "Il sughero", "correct": False}
            ],
            "hint": "Per questo le pentole sono fatte di metallo e i mestoli di legno.",
            "explanation": "I metalli hanno elettroni liberi e sono eccellenti conduttori di calore ed elettricità."
        }
    },
    {
        "years": ["P4"],
        "round": {
            "id": "qb-sci-p4-e15",
            "type": "quiz",
            "prompt": "In ecologia, che cos'è l'HABITAT di una specie animale o vegetale?",
            "options": [
                {"label": "Il luogo naturale con le condizioni ambientali ideali in cui una specie vive e prospera", "correct": True},
                {"label": "Lo zoo in cui gli animali sono in gabbia", "correct": False},
                {"label": "La temperatura della pelle", "correct": False}
            ],
            "hint": "È la 'casa' naturale di una specie (es. lo stagno per la rana, la banchisa per l'orso polare).",
            "explanation": "L'habitat è l'ambiente ecologico che offre a una popolazione le risorse necessarie per vivere."
        }
    },

    # ── P5 (15 quesiti) ────────────────────────────────────────────────────────
    {
        "years": ["P5"],
        "round": {
            "id": "qb-sci-p5-e1",
            "type": "quiz",
            "prompt": "Qual è il muscolo involontario fondamentale che pompa ininterrottamente il sangue in tutto il corpo umano?",
            "options": [
                {"label": "Il cuore", "correct": True},
                {"label": "Il fegato", "correct": False},
                {"label": "Lo stomaco", "correct": False}
            ],
            "hint": "Batte circa 70 volte al minuto e si trova nel torace.",
            "explanation": "Il cuore è una pompa muscolare cava (miocardio) che garantisce la circolazione sanguigna."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-sci-p5-e2",
            "type": "quiz",
            "prompt": "Quanto tempo impiega la Terra a compiere un giro completo su se stessa (moto di ROTAZIONE)?",
            "options": [
                {"label": "Circa 24 ore (un giorno, che alterna dì e notte)", "correct": True},
                {"label": "365 giorni (un anno)", "correct": False},
                {"label": "28 giorni (un mese lunare)", "correct": False}
            ],
            "hint": "Determina l'alternarsi del giorno e della notte.",
            "explanation": "La rotazione della Terra sul proprio asse dura 24 ore ed è la causa del ciclo giorno/notte."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-sci-p5-e3",
            "type": "quiz",
            "prompt": "In quale organo dell'apparato digerente avviene la maggior parte dell'assorbimento delle sostanze nutritive tramite i villi intestinali?",
            "options": [
                {"label": "Intestino tenue", "correct": True},
                {"label": "Stomaco", "correct": False},
                {"label": "Esofago", "correct": False}
            ],
            "hint": "È un lungo tubo ripiegato lungo diversi metri con pareti coperte da villi.",
            "explanation": "L'intestino tenue completa la digestione chimica e assorbe i nutrienti nel sangue."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-sci-p5-e4",
            "type": "quiz",
            "prompt": "Qual è il pianeta più grande del nostro Sistema Solare?",
            "options": [
                {"label": "Giove (gigante gassoso)", "correct": True},
                {"label": "Marte", "correct": False},
                {"label": "Saturno", "correct": False}
            ],
            "hint": "Ha una massa superiore a quella di tutti gli altri pianeti messi insieme.",
            "explanation": "Giove è il pianeta di gran lunga più massiccio e voluminoso del Sistema Solare."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-sci-p5-e5",
            "type": "quiz",
            "prompt": "Quali cellule del sangue hanno il compito fondamentale di difendere l'organismo da virus e batteri?",
            "options": [
                {"label": "I globuli bianchi (leucociti)", "correct": True},
                {"label": "I globuli rossi (eritrociti)", "correct": False},
                {"label": "Le piastrine", "correct": False}
            ],
            "hint": "Sono i soldati del sistema immunitario.",
            "explanation": "I globuli bianchi identificano e neutralizzano agenti patogeni e infezioni."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-sci-p5-e6",
            "type": "quiz",
            "prompt": "Cosa determina l'alternarsi delle QUATTRO STAGIONI sulla Terra?",
            "options": [
                {"label": "L'inclinazione dell'asse terrestre combinata con il moto di rivoluzione intorno al Sole", "correct": True},
                {"label": "La distanza variabile della Terra dalla Luna", "correct": False},
                {"label": "Il vento solare", "correct": False}
            ],
            "hint": "L'asse terrestre è inclinato di circa 23,5° rispetto al piano orbitale.",
            "explanation": "L'asse inclinato fa sì che durante l'anno i raggi solari colpiscano i due emisferi con diversa inclinazione."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-sci-p5-e7",
            "type": "dragdrop",
            "mode": "match",
            "prompt": "Abbina ogni componente del sangue alla sua funzione primaria.",
            "leftItems": ["Globuli rossi", "Globuli bianchi", "Piastrine"],
            "rightItems": ["Trasporto dell'ossigeno", "Difesa dalle infezioni", "Coagulazione del sangue"],
            "pairs": [[0, 0], [1, 1], [2, 2]],
            "hint": "I rossi portano ossigeno con l'emoglobina, le piastrine fermano le emorragie.",
            "explanation": "Le tre principali componenti corpuscolari del sangue umano."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-sci-p5-e8",
            "type": "quiz",
            "prompt": "Nei polmoni, dove avvengono esattamente gli scambi respiratori gassosi tra aria e sangue?",
            "options": [
                {"label": "Negli alveoli polmonari", "correct": True},
                {"label": "Nella laringe", "correct": False},
                {"label": "Nella trachea", "correct": False}
            ],
            "hint": "Sono milioni di minuscole sacche microscopiche avvolte da capillari sanguigni.",
            "explanation": "Negli alveoli polmonari l'ossigeno passa nel sangue e l'anidride carbonica passa nell'aria da espirare."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-sci-p5-e9",
            "type": "quiz",
            "prompt": "Quale tra queste è una fonte di ENERGIA RINNOVABILE e pulita che non si esaurisce mai?",
            "options": [
                {"label": "L'energia solare ed eolica", "correct": True},
                {"label": "Il petrolio", "correct": False},
                {"label": "Il carbone fossile", "correct": False}
            ],
            "hint": "Sfrutta il sole, il vento e l'acqua senza emettere fumi inquinanti.",
            "explanation": "Sole, vento e acqua sono fonti rinnovabili perché si rigenerano naturalmente."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-sci-p5-e10",
            "type": "quiz",
            "prompt": "Come si chiamano le cellule del SISTEMA NERVOSO che trasmettono impulsi elettrici rapidissimi in tutto il corpo?",
            "options": [
                {"label": "Neuroni", "correct": True},
                {"label": "Globuli", "correct": False},
                {"label": "Alveoli", "correct": False}
            ],
            "hint": "Hanno prolungamenti chiamati dendriti e assoni.",
            "explanation": "I neuroni sono le cellule specializzate nella trasmissione di segnali bioelettrici."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-sci-p5-e11",
            "type": "quiz",
            "prompt": "Cosa accade durante un'ECLISSI SOLARE?",
            "options": [
                {"label": "La Luna si interpone esattamente tra il Sole e la Terra, proiettando la sua ombra", "correct": True},
                {"label": "Il Sole si spegne per qualche minuto", "correct": False},
                {"label": "La Terra si sposta improvvisamente dietro a Giove", "correct": False}
            ],
            "hint": "La Luna copre alla vista il disco solare.",
            "explanation": "Nell'eclissi di Sole la Luna si trova allineata tra il Sole e la Terra, oscurando la luce solare."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-sci-p5-e12",
            "type": "dragdrop",
            "mode": "sort",
            "prompt": "Ordina i primi quattro pianeti del Sistema Solare in base alla distanza crescente dal Sole.",
            "sortItems": ["Mercurio (il più vicino)", "Venere", "Terra (il pianeta blu)", "Marte (il pianeta rosso)"],
            "hint": "I quattro pianeti rocciosi interni.",
            "explanation": "Mercurio -> Venere -> Terra -> Marte."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-sci-p5-e13",
            "type": "quiz",
            "prompt": "Quale apparato del corpo umano ha il compito di proteggere gli organi interni, sostenere il corpo e consentire il movimento insieme ai muscoli?",
            "options": [
                {"label": "Apparato scheletrico", "correct": True},
                {"label": "Apparato digerente", "correct": False},
                {"label": "Apparato escretore", "correct": False}
            ],
            "hint": "È formato da oltre 200 ossa collegate dalle articolazioni.",
            "explanation": "Lo scheletro sostiene il corpo, protegge organi delicati (es. cranio e gabbia toracica) e produce cellule del sangue."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-sci-p5-e14",
            "type": "quiz",
            "prompt": "Qual è il nostro satellite naturale che orbita intorno alla Terra in circa 28 giorni?",
            "options": [
                {"label": "La Luna", "correct": True},
                {"label": "Venere", "correct": False},
                {"label": "La cometa di Halley", "correct": False}
            ],
            "hint": "Mostra le sue fasi (nuova, crescente, piena, calante) ogni mese.",
            "explanation": "La Luna è l'unico satellite naturale della Terra e non brilla di luce propria ma riflette quella del Sole."
        }
    },
    {
        "years": ["P5"],
        "round": {
            "id": "qb-sci-p5-e15",
            "type": "quiz",
            "prompt": "I vasi sanguigni che portano il sangue ossigenato dal cuore verso tutti gli organi del corpo si chiamano...",
            "options": [
                {"label": "Arterie", "correct": True},
                {"label": "Vene", "correct": False},
                {"label": "Capillari linfatici", "correct": False}
            ],
            "hint": "Hanno pareti muscolari spesse per resistere alla pressione del battito cardiaco.",
            "explanation": "Le arterie trasportano il sangue dal cuore alla periferia; le vene lo riportano al cuore."
        }
    },

    # ── S1 (15 quesiti) ────────────────────────────────────────────────────────
    {
        "years": ["S1"],
        "round": {
            "id": "qb-sci-s1-e1",
            "type": "quiz",
            "prompt": "Chi fu il grande scienziato italiano che per primo introdusse il METODO SPERIMENTALE basato su osservazione, ipotesi ed esperimenti verificabili?",
            "options": [
                {"label": "Galileo Galilei", "correct": True},
                {"label": "Leonardo da Vinci", "correct": False},
                {"label": "Alessandro Volta", "correct": False}
            ],
            "hint": "Usò il cannocchiale astronomico all'inizio del Seicento.",
            "explanation": "Galileo Galilei è universalmente considerato il padre del metodo scientifico moderno."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-sci-s1-e2",
            "type": "quiz",
            "prompt": "Quale organello è la 'centrale energetica' della cellula, dove avviene la respirazione cellulare per produrre ATP?",
            "options": [
                {"label": "Il mitocondrio", "correct": True},
                {"label": "Il ribosoma", "correct": False},
                {"label": "L'apparato di Golgi", "correct": False}
            ],
            "hint": "Presente in tutte le cellule eucariote per produrre energia chimica.",
            "explanation": "I mitocondri bruciano glucosio con l'ossigeno per ricavare energia sotto forma di molecole di ATP."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-sci-s1-e3",
            "type": "quiz",
            "prompt": "Qual è la differenza fondamentale tra una cellula VEGETALE e una animale?",
            "options": [
                {"label": "La cellula vegetale possiede parete cellulare rigida, cloroplasti e un grande vacuolo", "correct": True},
                {"label": "La cellula vegetale non ha il nucleo", "correct": False},
                {"label": "La cellula animale è verde", "correct": False}
            ],
            "hint": "La parete di cellulosa dona rigidità ai fusti delle piante.",
            "explanation": "Parete cellulare, cloroplasti per la fotosintesi e grande vacuolo centrale sono esclusivi dei vegetali."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-sci-s1-e4",
            "type": "quiz",
            "prompt": "Che cos'è un MISCUGLIO OMOGENEO (o soluzione)?",
            "options": [
                {"label": "Un miscuglio in cui i componenti non si possono più distinguere a occhio nudo o al microscopio (es. acqua e sale)", "correct": True},
                {"label": "Un miscuglio di acqua e sassi", "correct": False},
                {"label": "Una sostanza radioattiva", "correct": False}
            ],
            "hint": "Ha proprietà identiche in ogni suo punto.",
            "explanation": "In una soluzione omogenea il soluto è disciolto in modo perfettamente uniforme nel solvente."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-sci-s1-e5",
            "type": "quiz",
            "prompt": "Come si chiama l'unità fondamentale e microscopica di cui sono composti TUTTI gli esseri viventi?",
            "options": [
                {"label": "La cellula", "correct": True},
                {"label": "Il minerale", "correct": False},
                {"label": "La roccia", "correct": False}
            ],
            "hint": "Teoria cellulare: ogni essere vivente è formato da una o più cellule.",
            "explanation": "La cellula è la più piccola unità vivente autonoma capace di riprodursi e compiere funzioni vitali."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-sci-s1-e6",
            "type": "quiz",
            "prompt": "Come si chiama una sostanza pura formata da atomi TUTTI IDENTICI tra loro (come l'oro, il ferro o l'ossigeno)?",
            "options": [
                {"label": "Elemento chimico", "correct": True},
                {"label": "Composto chimico", "correct": False},
                {"label": "Miscuglio eterogeneo", "correct": False}
            ],
            "hint": "È catalogata nella Tavola Periodica di Mendeleev.",
            "explanation": "Un elemento è costituito da atomi aventi lo stesso numero atomico e non può essere scomposto."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-sci-s1-e7",
            "type": "dragdrop",
            "mode": "match",
            "prompt": "Abbina ogni parte della cellula alla sua funzione principale.",
            "leftItems": ["Nucleo", "Membrana cellulare", "Citoplasma"],
            "rightItems": ["Custodisce il DNA", "Regola gli scambi con l'esterno", "Sostanza gelatinosa con gli organelli"],
            "pairs": [[0, 0], [1, 1], [2, 2]],
            "hint": "Il nucleo è il cervello della cellula, la membrana è il confine protettivo.",
            "explanation": "I tre costituenti fondamentali di qualsiasi cellula eucariote."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-sci-s1-e8",
            "type": "quiz",
            "prompt": "Quale scienziato svedese nel Settecento introdusse la NOMENCLATURA BINOMIA in latino per classificare tutti gli esseri viventi (Genere + specie)?",
            "options": [
                {"label": "Carlo Linneo", "correct": True},
                {"label": "Charles Darwin", "correct": False},
                {"label": "Gregor Mendel", "correct": False}
            ],
            "hint": "Es. Homo sapiens, Canis lupus.",
            "explanation": "Linneo ideò il sistema tassonomico binomiale ancora oggi impiegato nella classificazione scientifica."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-sci-s1-e9",
            "type": "quiz",
            "prompt": "Quale particella subatomica ha carica elettrica POSITIVA e si trova nel nucleo dell'atomo?",
            "options": [
                {"label": "Il protone", "correct": True},
                {"label": "L'elettrone (carica negativa)", "correct": False},
                {"label": "Il neutrone (carica neutra)", "correct": False}
            ],
            "hint": "Nel nucleo ci sono protoni positivi e neutroni neutri.",
            "explanation": "I protoni hanno carica positiva (+1) e definiscono il numero atomico di un elemento."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-sci-s1-e10",
            "type": "quiz",
            "prompt": "I BATTERI sono organismi unicellulari PROCARIOTI. Cosa significa procariote?",
            "options": [
                {"label": "Che il loro materiale genetico (DNA) è libero nel citoplasma, privo di membrana nucleare", "correct": True},
                {"label": "Che possiedono 10 nuclei", "correct": False},
                {"label": "Che vivono solo a 100 gradi", "correct": False}
            ],
            "hint": "'Pro-karyon' significa 'prima del nucleo': non hanno un nucleo racchiuso da membrana.",
            "explanation": "Le cellule procariote sono prive di nucleo delimitato da membrana nucleare."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-sci-s1-e11",
            "type": "quiz",
            "prompt": "Qual è la formula chimica dell'ACQUA, indicante 2 atomi di idrogeno e 1 di ossigeno?",
            "options": [
                {"label": "H₂O", "correct": True},
                {"label": "CO₂ (anidride carbonica)", "correct": False},
                {"label": "NaCl (cloruro di sodio)", "correct": False}
            ],
            "hint": "Due H e un O legati chimicamente.",
            "explanation": "H₂O rappresenta la molecola d'acqua formata da due atomi di idrogeno e uno di ossigeno."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-sci-s1-e12",
            "type": "dragdrop",
            "mode": "sort",
            "prompt": "Ordina i livelli di organizzazione biologica dal più semplice al più complesso.",
            "sortItems": ["Cellula", "Tessuto (insieme di cellule uguali)", "Organo (es. cuore o polmone)", "Apparato o Sistema (es. circolatorio)"],
            "hint": "Dal microscopico all'intero organismo coordinato.",
            "explanation": "Cellula -> Tessuto -> Organo -> Apparato/Sistema -> Organismo."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-sci-s1-e13",
            "type": "quiz",
            "prompt": "Che cos'è la BIODIVERSITÀ in un ecosistema?",
            "options": [
                {"label": "La ricchezza e varietà delle diverse specie viventi presenti in un ambiente", "correct": True},
                {"label": "Il numero di automobili in una città", "correct": False},
                {"label": "La temperatura media delle rocce", "correct": False}
            ],
            "hint": "Più specie diverse ci sono, più l'ecosistema è resiliente e sano.",
            "explanation": "La biodiversità indica la varietà genetica, tassonomica ed ecologica della biosfera."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-sci-s1-e14",
            "type": "quiz",
            "prompt": "Come si chiama lo strumento ottico formato da lenti d'ingrandimento usato per osservare cellule e microrganismi?",
            "options": [
                {"label": "Microscopio", "correct": True},
                {"label": "Telescopio (osserva le stelle lontane)", "correct": False},
                {"label": "Periscopio", "correct": False}
            ],
            "hint": "Permette di vedere cose microscopiche invisibili all'occhio nudo.",
            "explanation": "Il microscopio ottico ed elettronico permette l'ingrandimento di campioni biologici."
        }
    },
    {
        "years": ["S1"],
        "round": {
            "id": "qb-sci-s1-e15",
            "type": "quiz",
            "prompt": "Che cos'è una TRASFORMAZIONE CHIMICA (o reazione chimica)?",
            "options": [
                {"label": "Una trasformazione in cui le sostanze iniziali si modificano creando sostanze completamente nuove (es. combustione)", "correct": True},
                {"label": "Lo scioglimento di un cubetto di ghiaccio in acqua", "correct": False},
                {"label": "La rottura di un vetro in frammenti", "correct": False}
            ],
            "hint": "Nei passaggi fisici la materia resta identica, nelle reazioni chimiche cambia la formula chimica.",
            "explanation": "In una reazione chimica si rompono e riformano legami atomici, formando nuove specie chimiche."
        }
    },

    # ── S2 (15 quesiti) ────────────────────────────────────────────────────────
    {
        "years": ["S2"],
        "round": {
            "id": "qb-sci-s2-e1",
            "type": "quiz",
            "prompt": "Secondo il Principio di Archimede, un corpo immerso in un liquido riceve una spinta dal basso verso l'alto pari a...",
            "options": [
                {"label": "Il peso del volume di liquido spostato", "correct": True},
                {"label": "Il doppio del suo peso reale", "correct": False},
                {"label": "La pressione atmosferica", "correct": False}
            ],
            "hint": "È la forza che permette alle grandi navi di acciaio di galleggiare sull'acqua.",
            "explanation": "La spinta idrostatica di Archimede è uguale al peso della massa di fluido spostata dal corpo."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-sci-s2-e2",
            "type": "quiz",
            "prompt": "Qual è l'unità di misura della FORZA nel Sistema Internazionale (SI)?",
            "options": [
                {"label": "Newton (N)", "correct": True},
                {"label": "Chilogrammo (kg)", "correct": False},
                {"label": "Joule (J)", "correct": False}
            ],
            "hint": "Prende il nome dal grande scienziato Isaac Newton.",
            "explanation": "La forza si misura in Newton (1 N è la forza che imprime a 1 kg l'accelerazione di 1 m/s²)."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-sci-s2-e3",
            "type": "quiz",
            "prompt": "Come si propaga il calore nel VUOTO dello spazio (come la luce e il calore del Sole che raggiungono la Terra)?",
            "options": [
                {"label": "Per irraggiamento (onde elettromagnetiche infrarosse)", "correct": True},
                {"label": "Per conduzione", "correct": False},
                {"label": "Per convezione", "correct": False}
            ],
            "hint": "Nel vuoto non c'è materia, quindi non servono particelle a contatto.",
            "explanation": "L'irraggiamento avviene tramite radiazioni elettromagnetiche e non richiede alcun mezzo materiale."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-sci-s2-e4",
            "type": "quiz",
            "prompt": "Quale forza invisibile attrae tutti i corpi verso il centro della Terra ed è responsabile del peso degli oggetti?",
            "options": [
                {"label": "Forza di gravità (o attrazione gravitazionale)", "correct": True},
                {"label": "Forza magnetica", "correct": False},
                {"label": "Forza d'attrito", "correct": False}
            ],
            "hint": "La scoprì Newton osservando la caduta di una mela dall'albero.",
            "explanation": "La forza peso è l'interazione gravitazionale esercitata dalla massa della Terra su un corpo."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-sci-s2-e5",
            "type": "quiz",
            "prompt": "Quali organi dell'apparato escretore filtrano continuamente il sangue per eliminare le scorie azotate producendo l'urina?",
            "options": [
                {"label": "I reni", "correct": True},
                {"label": "I polmoni", "correct": False},
                {"label": "Il fegato", "correct": False}
            ],
            "hint": "Hanno forma di fagiolo e contengono milioni di nefroni filtranti.",
            "explanation": "I reni depurano il sangue dai rifiuti metabolici (urea) regolando l'equilibrio idrico-salino."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-sci-s2-e6",
            "type": "quiz",
            "prompt": "Come si chiama l'energia che un corpo possiede in virtù del suo MOVIMENTO (es. un'auto in corsa)?",
            "options": [
                {"label": "Energia cinetica", "correct": True},
                {"label": "Energia potenziale gravitazionale", "correct": False},
                {"label": "Energia nucleare", "correct": False}
            ],
            "hint": "'Kinesis' in greco significa movimento. Dipende da massa e velocità.",
            "explanation": "L'energia cinetica è data dalla formula Ec = 1/2 · m · v²."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-sci-s2-e7",
            "type": "dragdrop",
            "mode": "match",
            "prompt": "Abbina ogni meccanismo di trasmissione del calore al suo mezzo tipico.",
            "leftItems": ["Conduzione", "Convezione", "Irraggiamento"],
            "rightItems": ["Solidi (contatto diretto di particelle)", "Fluidi: liquidi e gas (moti convettivi)", "Vuoto e spazio (onde elettromagnetiche)"],
            "pairs": [[0, 0], [1, 1], [2, 2]],
            "hint": "Nel cucchiaio sul fuoco c'è conduzione, nell'acqua che bolle convezione, dal sole irraggiamento.",
            "explanation": "I tre meccanismi fisici fondamentali di propagazione del calore."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-sci-s2-e8",
            "type": "quiz",
            "prompt": "Che cos'è la PRESSIONE in fisica?",
            "options": [
                {"label": "Il rapporto tra la forza applicata perpendicolarmente e l'area della superficie (P = F / S)", "correct": True},
                {"label": "Il peso di un corpo moltiplicato per l'altezza", "correct": False},
                {"label": "La velocità media diviso il tempo", "correct": False}
            ],
            "hint": "Si misura in Pascal (Pa = N / m²). Per questo gli sci non affondano nella neve fresca.",
            "explanation": "Pressione = Forza / Superficie. Allargando la superficie di appoggio la pressione diminuisce."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-sci-s2-e9",
            "type": "quiz",
            "prompt": "In fisica, che cos'è l'ATTRITO?",
            "options": [
                {"label": "Una forza di contatto che si oppone sempre al movimento tra due superfici", "correct": True},
                {"label": "Una calamita che attrae il ferro", "correct": False},
                {"label": "Il calore prodotto da una fiamma", "correct": False}
            ],
            "hint": "Rallenta le cose che scivolano e permette alle nostre scarpe di non scivolare a terra.",
            "explanation": "L'attrito (radente, volvente o viscoso) agisce in direzione contraria al verso del moto."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-sci-s2-e10",
            "type": "quiz",
            "prompt": "Cosa afferma il Principio di Conservazione dell'Energia?",
            "options": [
                {"label": "L'energia non si crea né si distrugge, ma si trasforma da una forma all'altra", "correct": True},
                {"label": "L'energia scompare non appena si spegne la luce", "correct": False},
                {"label": "L'energia aumenta all'infinito da sola", "correct": False}
            ],
            "hint": "Primo principio della termodinamica: la quantità totale di energia nell'universo è costante.",
            "explanation": "L'energia totale di un sistema isolato rimane costante nel tempo, cambiando solo forma."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-sci-s2-e11",
            "type": "quiz",
            "prompt": "Quali proteine speciali prodotte dai linfociti riconoscono e neutralizzano in modo specifico antigeni estranei come virus e batteri?",
            "options": [
                {"label": "Anticorpi (immunoglobuline)", "correct": True},
                {"label": "Enzimi digestivi", "correct": False},
                {"label": "Emoglobina", "correct": False}
            ],
            "hint": "Vengono stimolati dai vaccini per conferire immunità duratura.",
            "explanation": "Gli anticorpi riconoscono specificamente gli antigeni patogeni neutralizzandoli."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-sci-s2-e12",
            "type": "dragdrop",
            "mode": "sort",
            "prompt": "Ordina i pianeti gassosi esterni (giganti del Sistema Solare) dal più vicino al più lontano dal Sole.",
            "sortItems": ["Giove", "Saturno (con gli anelli)", "Urano", "Nettuno (il più esterno)"],
            "hint": "I quattro giganti gassosi e ghiacciati oltre la fascia degli asteroidi.",
            "explanation": "Giove -> Saturno -> Urano -> Nettuno."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-sci-s2-e13",
            "type": "quiz",
            "prompt": "Un'automobile percorre 120 chilometri in 2 ore a velocità costante. Qual è la sua velocità media?",
            "options": [
                {"label": "60 km/h", "correct": True},
                {"label": "120 km/h", "correct": False},
                {"label": "240 km/h", "correct": False}
            ],
            "hint": "Velocità = Spazio diviso Tempo (v = s / t).",
            "explanation": "v = 120 km ÷ 2 h = 60 km/h."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-sci-s2-e14",
            "type": "quiz",
            "prompt": "Quale ormone prodotto dal pancreas regola la quantità di glucosio (zuccheri) nel sangue?",
            "options": [
                {"label": "Insulina", "correct": True},
                {"label": "Adrenalina", "correct": False},
                {"label": "Tiroxina", "correct": False}
            ],
            "hint": "Se scarseggia, può provocare il diabete.",
            "explanation": "L'insulina abbassa la glicemia favorendo l'assorbimento cellulare del glucosio."
        }
    },
    {
        "years": ["S2"],
        "round": {
            "id": "qb-sci-s2-e15",
            "type": "quiz",
            "prompt": "Come si chiama la velocità con cui varia la velocità nel tempo (variazione di velocità / tempo)?",
            "options": [
                {"label": "Accelerazione", "correct": True},
                {"label": "Massa inerziale", "correct": False},
                {"label": "Potenza", "correct": False}
            ],
            "hint": "Si misura in metri al secondo quadrato (m/s²).",
            "explanation": "L'accelerazione indica la rapidità con cui un corpo accelera o frena (a = Δv / Δt)."
        }
    },

    # ── S3 (15 quesiti) ────────────────────────────────────────────────────────
    {
        "years": ["S3"],
        "round": {
            "id": "qb-sci-s3-e1",
            "type": "quiz",
            "prompt": "Chi è considerato il padre della GENETICA classica grazie ai suoi esperimenti sulle piante di pisello odoroso e alla scoperta delle leggi dell'ereditarietà?",
            "options": [
                {"label": "Gregor Mendel", "correct": True},
                {"label": "Charles Darwin", "correct": False},
                {"label": "Louis Pasteur", "correct": False}
            ],
            "hint": "Monaco agostiniano dell'Ottocento.",
            "explanation": "Gregor Mendel formulò le leggi della dominanza, segregazione e assortimento indipendente."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-sci-s3-e2",
            "type": "quiz",
            "prompt": "Qual è la struttura a DOPPIA ELICA scoperta nel 1953 da Watson e Crick che custodisce il codice genetico di tutti gli esseri viventi?",
            "options": [
                {"label": "Il DNA (acido desossiribonucleico)", "correct": True},
                {"label": "L'emoglobina", "correct": False},
                {"label": "Il glucosio", "correct": False}
            ],
            "hint": "Composto da 4 basi azotate: Adenina, Timina, Citosina e Guanina.",
            "explanation": "La molecola del DNA ha conformazione a doppia elica e codifica l'informazione genetica."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-sci-s3-e3",
            "type": "quiz",
            "prompt": "Secondo la teoria dell'evoluzione formulata da Charles Darwin ne 'L'origine delle specie', quale meccanismo guida l'adattamento e l'evoluzione dei viventi?",
            "options": [
                {"label": "La selezione naturale dei caratteri più vantaggiosi per la sopravvivenza", "correct": True},
                {"label": "La volontà degli animali di migliorarsi", "correct": False},
                {"label": "L'influenza delle fasi lunari", "correct": False}
            ],
            "hint": "Gli individui con caratteristiche più adatte all'ambiente sopravvivono e si riproducono con maggior successo.",
            "explanation": "La selezione naturale favorisce gli individui portatori di mutazioni vantaggiose nell'ecosistema."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-sci-s3-e4",
            "type": "quiz",
            "prompt": "Cosa afferma la Prima Legge di Ohm per i circuiti elettrici (relazione tra Tensione V, Corrente I e Resistenza R)?",
            "options": [
                {"label": "V = R × I", "correct": True},
                {"label": "V = R / I", "correct": False},
                {"label": "V = R + I", "correct": False}
            ],
            "hint": "La differenza di potenziale (Volt) è direttamente proporzionale all'intensità di corrente (Ampere).",
            "explanation": "La prima legge di Ohm stabilisce che la tensione V è uguale al prodotto della resistenza R per la corrente I."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-sci-s3-e5",
            "type": "quiz",
            "prompt": "Secondo la Teoria della Tettonica delle Placche, da cosa hanno origine i terremoti e le eruzioni vulcaniche?",
            "options": [
                {"label": "Dal lento movimento e scontro delle placche (zolle) litosferiche sull'astenosfera fluida", "correct": True},
                {"label": "Dalle maree provocate dalla Luna", "correct": False},
                {"label": "Dalle piogge torrenziali", "correct": False}
            ],
            "hint": "La crosta terrestre è divisa in placche rigide che galleggiano sul mantello.",
            "explanation": "L'attrito, la subduzione e lo scontro tra zolle tettoniche generano sismi, orogenesi e vulcanismo."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-sci-s3-e6",
            "type": "quiz",
            "prompt": "Nel modello geologico della Terra, come si chiama il punto sotterraneo esatto in cui ha origine la frattura di una faglia e si scatena il terremoto?",
            "options": [
                {"label": "Ipocentro (fuoco)", "correct": True},
                {"label": "Epicentro (in superficie sulla verticale)", "correct": False},
                {"label": "Crast", "correct": False}
            ],
            "hint": "L'epicentro è il punto in superficie perpendicolare sopra di esso.",
            "explanation": "L'ipocentro è la sorgente profonda del sisma; l'epicentro è la sua proiezione in superficie."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-sci-s3-e7",
            "type": "dragdrop",
            "mode": "match",
            "prompt": "Abbina ogni tipo di roccia alla sua origine geologica.",
            "leftItems": ["Rocce magmatiche (o ignee)", "Rocce sedimentarie", "Rocce metamorfiche"],
            "rightItems": ["Raffreddamento e solidificazione del magma/lava", "Accumulo e compattazione di detriti e fossili", "Trasformazione per altissima pressione e temperatura"],
            "pairs": [[0, 0], [1, 1], [2, 2]],
            "hint": "Il granito e il basalto sono magmatici, il calcare è sedimentario, il marmo è metamorfico.",
            "explanation": "Le tre grandi famiglie litologiche del ciclo delle rocce della crosta terrestre."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-sci-s3-e8",
            "type": "quiz",
            "prompt": "Come si chiama un cambiamento casuale e improvviso nella sequenza dei nucleotidi del DNA che può introdurre nuove varianti genetiche?",
            "options": [
                {"label": "Mutazione genetica", "correct": True},
                {"label": "Clonazione", "correct": False},
                {"label": "Simbiosi", "correct": False}
            ],
            "hint": "Fornisce la materia prima della variabilità su cui agisce la selezione naturale.",
            "explanation": "Le mutazioni sono alterazioni spontanee o indotte della sequenza del DNA."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-sci-s3-e9",
            "type": "quiz",
            "prompt": "Nel magnetismo, cosa accade avvicinando due poli magnetici dello STESSO NOME (es. Nord con Nord o Sud con Sud)?",
            "options": [
                {"label": "Si respingono a vicenda", "correct": True},
                {"label": "Si attraggono con forza", "correct": False},
                {"label": "Diventano incandescenti", "correct": False}
            ],
            "hint": "I poli opposti si attraggono, i poli uguali si...",
            "explanation": "Regola fondamentale del magnetismo: poli concordi si respingono, poli discordi si attraggono."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-sci-s3-e10",
            "type": "quiz",
            "prompt": "Cosa alimenta l'immensa energia irradiata dal Sole e da tutte le stelle nell'universo?",
            "options": [
                {"label": "Le reazioni di fusione nucleare (idrogeno che si fonde in elio nel nucleo)", "correct": True},
                {"label": "La combustione di legna e carbone", "correct": False},
                {"label": "L'attrito tra i pianeti", "correct": False}
            ],
            "hint": "Temperatura di oltre 15 milioni di gradi nel nucleo solare.",
            "explanation": "Nel nucleo stellare la fusione di nuclei di idrogeno in elio libera quantità immani di energia (E = mc²)."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-sci-s3-e11",
            "type": "quiz",
            "prompt": "Qual è la forma della nostra galassia, la Via Lattea, in cui si trova il Sistema Solare?",
            "options": [
                {"label": "Galassia a spirale barrata", "correct": True},
                {"label": "Galassia ellittica perfetta", "correct": False},
                {"label": "Galassia triangolare", "correct": False}
            ],
            "hint": "Ha lunghi bracci a spirale che ruotano attorno al nucleo galattico.",
            "explanation": "La Via Lattea è una galassia a spirale con bracci ricchi di stelle, gas e polveri cosmiche."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-sci-s3-e12",
            "type": "dragdrop",
            "mode": "sort",
            "prompt": "Ordina le unità di misura elettriche fondamentali: Carica, Corrente, Tensione, Resistenza.",
            "sortItems": ["Coulomb (C) - Carica", "Ampere (A) - Corrente", "Volt (V) - Tensione", "Ohm (Ω) - Resistenza"],
            "hint": "Le grandezze elettriche canoniche studiate in 3ª media.",
            "explanation": "Unità di misura del Sistema Internazionale per i circuiti elettrici."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-sci-s3-e13",
            "type": "quiz",
            "prompt": "In genetica, qual è la differenza tra GENOTIPO e FENOTIPO?",
            "options": [
                {"label": "Il genotipo è l'insieme dei geni ereditati (DNA); il fenotipo è l'aspetto esteriore visibile manifestato", "correct": True},
                {"label": "Il genotipo riguarda solo le piante, il fenotipo solo gli animali", "correct": False},
                {"label": "Non c'è alcuna differenza", "correct": False}
            ],
            "hint": "Es. geni per gli occhi azzurri (genotipo) -> colore reale degli occhi (fenotipo).",
            "explanation": "Il genotipo è il corredo genetico; il fenotipo è la risultante visibile dell'interazione col contesto ambientale."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-sci-s3-e14",
            "type": "quiz",
            "prompt": "Qual è la teoria scientifica che descrive l'inizio dell'espansione dell'Universo avvenuta circa 13,8 miliardi di anni fa?",
            "options": [
                {"label": "Il Big Bang", "correct": True},
                {"label": "La Teoria della Gravità", "correct": False},
                {"label": "La Deriva dei Continenti", "correct": False}
            ],
            "hint": "Un'espansione primordiale a partire da una singolarità densissima e caldissima.",
            "explanation": "Il modello cosmologico del Big Bang descrive l'origine e l'evoluzione dell'universo in espansione."
        }
    },
    {
        "years": ["S3"],
        "round": {
            "id": "qb-sci-s3-e15",
            "type": "quiz",
            "prompt": "Cosa misura la Scala Richter nei terremoti?",
            "options": [
                {"label": "La magnitudo (l'energia sismica effettivamente sprigionata dall'ipocentro)", "correct": True},
                {"label": "I danni visibili provocati a edifici e persone (scala Mercalli)", "correct": False},
                {"label": "La durata in secondi del sisma", "correct": False}
            ],
            "hint": "La scala Mercalli valuta l'intensità dei danni; la scala Richter misura l'energia oggettiva.",
            "explanation": "La scala Richter esprime la magnitudo strumentale quantificando l'energia meccanica rilasciata dal terremoto."
        }
    }
]
