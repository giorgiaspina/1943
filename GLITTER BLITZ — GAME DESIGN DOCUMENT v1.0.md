=============================================================
  GLITTER BLITZ — GAME DESIGN DOCUMENT v1.0
  Genere: 2D Pixel Art Run & Gun (Metal Slug-style clone)
  Piattaforma: Browser (HTML5 Canvas + JavaScript)
  Risoluzione: 640×360 px (pixel art nativa, scalabile fullscreen)
  Modalità: Single Player
=============================================================

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. IDENTITÀ DEL GIOCO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Titolo: GLITTER BLITZ
Tagline: "Cute. Deadly. Unstoppable."
Stile grafico: Pixel art 2D di altissimo livello, 640×360 px nativi.
              Palette colori vivace e kawaii ma con atmosfere di ogni livello
              (spettrale, scolastico, dark-forest, ecc.).
              Sprite animate con almeno 8 frame per animazione principale.
              Parallax scrolling su almeno 3 layer di sfondo per ogni livello.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. PERSONAGGI PRINCIPALI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROTAGONISTA — STELLA
  - Aspetto: ragazza con capelli lunghi rosa, vestita come Sailor Moon
    (gonna a pieghe, gonna corta, fiocco sul petto, guanti bianchi,
    tiara sulla fronte, dettagli dorati e rosa)
  - Animazioni richieste: idle, walk, run, jump, double-jump, crouch,
    shoot, shoot-crouching, death, victory
  - Arma base: cambia in base al livello (vedi sezione livelli)

COMPANION — AZURE (trovata a metà Livello 1)
  - Aspetto: ragazza con capelli corti blu, vestita da militare
    (divisa mimetica verde, beret blu, stivali)
  - Trovata legata a un palo a metà livello 1. Si libera con tasto E.
  - Comportamento: segue Stella automaticamente, spara ai nemici
    nelle vicinanze in modo autonomo (AI semplice: target nemico più vicino).
    Non è invincibile narrativamente ma non ha barra vita propria —
    non può essere eliminata dal gioco. Se colpita, animazione "stordita"
    di 1,5 secondi durante la quale non spara.
  - Presente dal livello 1 (dopo il salvataggio) per tutti i livelli successivi.
  - Animazioni richieste: idle, walk, shoot, stunned

MASCOTTE — MICIO (ottenuta dopo boss Livello 4)
  - Aspetto: gatto grigio/arancio rimpicciolito (circa 1/4 della dimensione
    del personaggio), con espressione dispettosa
  - Segue Stella passivamente, è invincibile (mascotte narrativa)
  - Non attacca attivamente, ma la sua presenza sblocca l'arma
    "Crocchette Esplosive" ottenuta dal boss del livello 4
  - Animazioni: idle (coda che si muove), walk/follow, reaction-victory

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. CONTROLLI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ArrowRight   → cammina avanti (destra)
  ArrowLeft    → cammina indietro (sinistra)
  ArrowUp      → pressione singola = salto normale
                 doppia pressione rapida = doppio salto (con animazione distinta)
  ArrowDown    → si abbassa (cambia hitbox, può sparare accucciato)
  Space        → spara (pressione singola = 1 colpo; tenuto premuto = fuoco continuo)
  Q            → cambia arma (switcha tra arma base tematica e arma speciale raccolta)
  E            → usa coltello per liberare ostaggi legati (range ravvicinato,
                 animazione di taglio corda)

  [Limousine — tasti invariati]
  ArrowRight   → accelera avanti
  ArrowLeft    → frena / marcia indietro
  ArrowUp      → [non usato su limousine]
  ArrowDown    → [non usato su limousine]
  Space        → spara (solo frontale, colpi infiniti)
  E            → scendi dalla limousine

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. SISTEMA DI VITA E CONTINUES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BARRA VITA:
  - Rappresentata da una barra orizzontale colorata nell'HUD (angolo sup. sinistra)
  - Quando si azzera, il giocatore perde 1 cuore e la barra si ricarica completamente
  - Animazione di danno: sprite lampeggia in bianco per 0.8 secondi (invincibilità temporanea)

CUORI:
  - Inizio gioco: 4 cuori
  - Quando tutti i cuori finiscono → si consuma 1 "continue"
  - Si riparte dall'ultimo checkpoint del livello corrente con 4 cuori ripristinati

CONTINUES:
  - Massimo 3 continues per livello
  - Al 4° game over sullo stesso livello → schermata "GAME OVER" con opzione
    "Ricomincia livello dall'inizio" (con 4 cuori e 3 continues ripristinati)
    oppure "Torna al menu principale"
  - I continues si azzerano passando al livello successivo

CHECKPOINT:
  - 2 checkpoint automatici per livello: al 33% e al 66% del percorso
  - Attivazione automatica al passaggio (nessuna interazione richiesta)
  - Simbolo visivo: stella dorata lampeggiante a terra che scompare dopo l'attivazione

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. SISTEMA ARMI E MUNIZIONI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ARMA BASE (tematica per livello, munizioni infinite, danno basso):
  - Livello 1 (Casa stregata):    Pistola spettrale (spara ectoplasma)
  - Livello 2 (Scuola fantasma):  Gessetto sparante (spara gessi a raffica)
  - Livello 3 (Foresta montana):  Fionda tascabile (spara pietruzze)
  - Livello 4 (Tana del topo):    Trappola-gun (spara mini trappole per topi)
  - Livello 5 (Mondo folletti):   Bacchetta sparkle (spara stelle dorate)

SLOT ARMA SPECIALE (max 1 arma speciale portata contemporaneamente):
  - 40 colpi per arma
  - Esauriti i colpi → ritorno automatico all'arma base
  - Q per switchare tra arma base e arma speciale (se disponibile)
  - Raccogliendo una nuova arma speciale con un'altra già in mano:
    quella nuova sostituisce quella tenuta in mano in quel momento

ARMI SPECIALI SBLOCCABILI (ricompense boss e drop nel livello):
  - 🔥 Lanciafiamme         → ottenuto dopo boss Liv.1
  - 🥛 Mitra Latte Acido    → ottenuto dopo boss Liv.2 (spara proiettili di latte
                               acido che corrodono i nemici)
  - 🚀 Rocket Slime         → ottenuto dopo boss Liv.3 (razzi con slime appiccicoso
                               che si attaccano al nemico ed esplodono dopo 2 secondi)
  - 🐾 Crocchette Esplosive → ottenuto dopo boss Liv.4 (crocchette che esplodono
                               al contatto, danni ad area)

RICARICHE MUNIZIONI:
  - Distribuite nel livello con frequenza medio-alta (ogni 40-60 pixel di avanzamento)
  - Aspetto visivo: box colorata con icona dell'arma
  - Ricarica di 20 colpi per pickup

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. SISTEMA OSTAGGI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  - 6-9 ostaggi per livello, posizionati lungo tutto il percorso
  - Tutti legati (a un palo, a una sedia, a una corda pendente, ecc.)
  - Per liberarli: avvicinarsi + premere E (animazione coltello che taglia la corda)
  - Animazione ostaggio: salta di gioia, ti dà la ricompensa con un'esclamazione
    visiva (fumetto con icona premio), poi scompare
  - Ogni ostaggio dà UNA ricompensa casuale tra:
      a) Vita (ricarica parziale barra vita)
      b) Cuore extra (aggiungi 1 cuore fino a max 6)
      c) Arma speciale nuova (o ricarica quella che hai)
      d) Abilità temporanea (velocità +20% per 30 secondi,
         invincibilità 5 sec, fuoco rapido 15 sec)
  - Non tutti gli ostaggi danno la stessa cosa → sistema RNG con pesi

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7. HUD (HEAD-UP DISPLAY)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Angolo superiore sinistro:
    [Icona Stella] [Barra Vita colorata] [❤️❤️❤️❤️ cuori]

  Angolo superiore destro:
    [Icona arma attiva] [███░░ barra munizioni] [numero colpi rimanenti]
    [Q → icona arma in riserva] (se disponibile)

  Centro-basso (solo durante boss fight):
    [Nome Boss] [████████████ barra vita boss] (con colori che cambiano da verde
    a giallo a rosso al diminuire della vita)

  Angolo inferiore destro:
    [Punteggio corrente] [Tempo livello]

  Schermata di morte (3 continues rimanenti visibili come stelle):
    ⭐⭐⭐ → ⭐⭐☆ → ⭐☆☆ → ☆☆☆ → GAME OVER

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
8. RISORSE NEL LIVELLO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  7-10 risorse per livello, posizionate lungo il percorso:
  - ❤️ Cuore volante: aggiunge 1 cuore (max 6)
  - 🧪 Pozione vita: ricarica la barra vita al 100%
  - 📦 Cassa arma: contiene arma speciale casuale (con probabilità pesata
      per dare armi tematiche del livello)
  - 🔋 Ricarica munizioni: +20 colpi per l'arma speciale in uso
  - ⚡ Power-up temporaneo: velocità, fuoco rapido o scudo 5 sec

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
9. SCHERMATE DI GIOCO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SCHERMATA INTRO LIVELLO:
  - Animazione di apertura (2-3 secondi): nome del livello in pixel art
    con sfondo tematico, effetto "slide in" dal basso
  - Formato: "LIVELLO [N]" — "[Nome livello]"
  - Musica tematica del livello che parte in fade-in

SCHERMATA FINE LIVELLO (post-boss):
  - Tabella risultati:
    ┌────────────────────────────────────┐
    │  MISSIONE COMPLETATA!              │
    │  ──────────────────────────────── │
    │  Nemici sconfitti:    [XX / 50-60] │
    │  Ostaggi salvati:     [X / 6-9]    │
    │  Tempo:               [MM:SS]      │
    │  ──────────────────────────────── │
    │  Bonus ostaggi:       +[punti]     │
    │  Punteggio totale:    [XXXXX]      │
    │  ──────────────────────────────── │
    │  Arma sbloccata: [icona + nome]    │
    └────────────────────────────────────┘
  - Animazione stella che appare per ogni ostaggio salvato

SCHERMATA GAME OVER:
  - "GAME OVER" in pixel art con animazione di caduta
  - Opzioni: [Riprova livello] [Menu principale]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
10. LIVELLI — DESIGN DETTAGLIATO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

══════════════════════════════════════════
LIVELLO 1 — "LA CASA STREGATA"
══════════════════════════════════════════

Ambientazione: casa vittoriana infestata, corridoi bui, candele fluttuanti,
               tappeti volanti, quadri con occhi, scale tortuose.
               Fine livello: giardino con lapidi e luna piena.
Durata media: 10-14 minuti (boss escluso)
Parallax: sfondo luna, alberi spogli, nebbia, mura della casa

ARMA BASE: Pistola Spettrale (spara palline di ectoplasma)

NEMICI (50-60 totali, diversificati per difficoltà):
  DEBOLI (prima metà livello):
  - Peluche Zombie (piccolo): cammina lentamente verso il giocatore,
    attacco corpo a corpo, 2 HP
  - Bambola Assassina Volante: fluttua in diagonale, lancia spilli,
    3 HP, facile da schivare
  MEDI (seconda metà):
  - Orso di Peluche Zombie (grande): più lento ma tank, 6 HP,
    attacco con braccia che fa rimbalzare il personaggio
  - Bambola Voodoo: cammina + lancia aghi a distanza media, 4 HP
  FORTI (zona pre-boss):
  - Bambola Posseduta Rossa: veloce, si teletrasporta di breve
    distanza, attacca a grappolo (3 rapidi colpi), 8 HP
  - Marionetta Gigante: nemica più grande della sezione normale,
    appesa al soffitto, lancia corde che immobilizzano 1 secondo, 10 HP

COMPANION AZURE: trovata legata a un palo a metà del livello 1.
  Dopo liberazione, segue Stella per tutto il resto del gioco.

OSTAGGI (6-9):
  - Uomini muscolosi (in costume da palestra, legati a un palo)
  - Piccole balene con le gambe (creature kawaii, legate con una corda)
  Entrambi si trovano sia nella casa che nel giardino.

RISORSE (7-10): distribuite tra casa e giardino, in casse e su
  mensole/ripiani. Includono pozioni, cuori, ricariche.

BOSS FINALE — "DRAKOPTERO" (Drago-Elicottero):
  Ambientazione: giardino della casa stregata, arena aperta con lapidi
  Descrizione: fusione tra un drago verde-scuro e un elicottero militare.
    Corpo da drago con rotore sul dorso, code metalliche, occhi rossi.
    Dimensione: occupa circa 1/3 dello schermo.
  Fasi di attacco (2 fasi):
    FASE 1 (vita > 50%):
      - Vola avanti/indietro sparando fuoco dalla bocca (orizzontale)
      - Lancia rotori come boomerang (tornano indietro)
      - Atterra brevemente → attacco coda (sweep a terra)
    FASE 2 (vita < 50%, si incendia parzialmente):
      - Velocità aumentata del 30%
      - Spara bombe a grappolo dall'elicottero-dorso
      - Chiama 2 Bambole Possedute Rossa come rinforzi
  HP Boss: alto (calibrare per ~8-12 minuti di fight)
  Musica: epica orchestrale con organo

RICOMPENSA: 🔥 LANCIAFIAMME (appare sopra la carcassa del boss)

══════════════════════════════════════════
LIVELLO 2 — "LA SCUOLA FANTASMA"
══════════════════════════════════════════

Ambientazione: scuola abbandonata, corridoi con armadietti arrugginiti,
               aule con lavagne scritte da sole, palestra spettrale.
               Fine livello: discoteca dismessa nel seminterrato.
Durata media: 11-15 minuti (boss escluso)
Parallax: corridoio scolastico, finestre rotte, pavimenti lucidi

ARMA BASE: Gessetto Sparante (spara gessi a raffica, veloce ma corto range)

NEMICI (50-60):
  DEBOLI:
  - Maestra Capelli Arruffati (tipo base): cammina e lancia gessi
    singoli, 3 HP
  - Bidello col Mocio: lento ma con hitbox grande (il mocio copre più
    area), attacco spazzata orizzontale, 4 HP
  MEDI:
  - Maestra Furente: lancia gessi a raffica (3 in sequenza), può
    anche colpire con il righello (attacco ravvicinato potente), 6 HP
  - Bidello Corazzato (con carrello pulizie come scudo): il carrello
    blocca i proiettili frontali, va colpito dall'alto o da dietro, 8 HP
  FORTI (zona pre-boss / discoteca):
  - Maestra Voodoo: lancia righelli come boomerang, evoca 2 gessi
    volanti da sola, 10 HP
  - Bidello Berserker: carica veloce, mocio avvelenato (danno over
    time per 3 secondi), 12 HP

OSTAGGI (6-9): ragazzini con il cappellino a punta della punizione
  (seduti in un angolo o legati a una sedia scolastica), trovati
  nelle aule e nei corridoi.

RISORSE (7-10): dentro armadietti aperti, sotto banchi, in casse
  nel magazzino della scuola.

BOSS FINALE — "BABY BOSS ROCCO":
  Ambientazione: discoteca dismessa (luci stroboscopiche, pista da ballo
    rotta, specchi sui muri, tutto buio tranne i flash)
  Descrizione: bambino enorme (testa grossa, corpo tozzo) in smoking nero
    e papillon, ciuccio fluorescente in bocca, seduto su una LIMOUSINE
    nera che guida lui stesso. Espressione di noia assoluta.
    Dimensione: la limousine occupa metà schermo, il Baby Boss è sul tetto.
  Fasi di attacco (3 fasi):
    FASE 1 (vita > 66%):
      - La limousine avanza e frena creando urti
      - Baby Boss spara latte dal biberon (projectile singolo, danno medio)
      - Sporge dalla limousine e tira il ciuccio come proiettile rimbalzante
    FASE 2 (vita 33-66%, si scalda — diventa rosso in faccia):
      - La limousine accelera di più, difficile da schivare
      - Biberon-mitragliatrice: raffica di latte acido (6 proiettili rapidi)
      - Chiama 2 Maestre Furenti come rinforzi
    FASE 3 (vita < 33%, piange tantissimo — le lacrime creano pozze):
      - Le lacrime sul pavimento rallentano il giocatore del 40%
      - Il latte acido ora causa danni over time
      - Velocità limousine massima
  HP Boss: molto alto (calibrare per ~10-15 minuti di fight)
  Musica: house/techno distorta con pianti di bambino in sottofondo

RICOMPENSE:
  - 🥛 MITRA LATTE ACIDO
  - 🚗 LIMOUSINE disponibile nella strada del Livello 3 (evento scripted
    all'inizio del Livello 3: la limousine del boss appare parcheggiata
    sul bordo della strada con un cartello "LIBERA — PRENDIMI")

══════════════════════════════════════════
LIVELLO 3 — "FORESTA MONTANA TENEBROSA"
══════════════════════════════════════════

Ambientazione: foresta di conifere al crepuscolo, sentiero fangoso,
               ponti di legno su burroni, radure illuminate dalla luna.
               Nella prima sezione del livello: strada asfaltata dove
               appare la Limousine del boss precedente.
Durata media: 12-16 minuti (boss escluso)
Parallax: montagne, nebbia, alberi di pino, cielo viola

ARMA BASE: Fionda Tascabile (spara pietruzze a parabola, danno medio)

VEICOLO SPECIALE — LIMOUSINE (sezione strada, ~20% del livello):
  Appare parcheggiata all'inizio del livello.
  - Il giocatore può salire (avvicinati + E)
  - Tasti invariati: ArrowRight/Left per guidare, Space per sparare
    (solo frontale, proiettili di latte acido infiniti)
  - La limousine ha una barra vita propria (indicata nell'HUD sostituendo
    la barra vita di Stella mentre è a bordo)
  - I nemici possono distruggerla (HP: medio)
  - Quando distrutta, Stella esce con una capriola e si riprende i
    controlli normali. Nessuna penalità vita.
  La sezione con la limousine finisce quando si entra nella foresta
  (la limousine non può seguire oltre).

NEMICI (50-60):
  DEBOLI:
  - Scoiattolo Soldato (base): divisa mimetica, spara ghiande singole,
    4 HP
  - Scoiattolo Cecchino: fermo su un ramo, mira e spara noccioline
    veloci, 3 HP ma difficile da raggiungere
  MEDI:
  - Scoiattolo Sergente: comanda 2 soldati base, li respawna una volta
    se uccisi, 7 HP
  - Scoiattolo Bombarolo: lancia noccioline esplosive ad arco
    (area damage), 6 HP
  FORTI:
  - Scoiattolo Commando: carica ravvicinata con baionetta-ghianda,
    spara raffica in 3 direzioni, 10 HP
  - Scoiattolo Colonel (raro, 2-3 per livello): grande, in divisa da
    colonnello, resistente, chiama rinforzi fischiando, 15 HP

OSTAGGI (6-9): Falchi muscolosi (falchi antropomorfi con corpo umano
  muscoloso, ali legate con corda militare, legati a tronchi lungo
  il sentiero)

RISORSE (7-10): dentro ceppi cavi, tra le radici, in bunker nascosti.

BOSS FINALE — "GLOBIAX" (Slime Verde Fluo):
  Ambientazione: radura illuminata da bioluminescenza verde, alberi
    incrostati di slime, notte fonda.
  Descrizione: slime verde fluorescente enorme (senza forma fissa),
    con 2 occhi bianchi e una bocca che appare e scompare. Costantemente
    in movimento ondulatorio. Dimensione: ~40% schermo.
  Meccaniche speciali:
    - INGLOBAMENTO: se il giocatore ci cade dentro, appare una mini-
      schermata di QTE (tasto alternato A/D rapidamente per 3 secondi)
      per liberarsi. Se non riesce → perde 1 cuore intero e viene espulso.
    - GELATINA: sputa blob di gelatina appiccicosa che immobilizza
      il giocatore per 2 secondi (durante questi 2 secondi può ancora
      sparare ma non muoversi)
  Fasi di attacco (2 fasi):
    FASE 1 (vita > 50%):
      - Si divide in 2 slime piccoli per 5 secondi (entrambi da colpire)
      - Sputa gelatina in 2 direzioni
      - Si lancia verso il giocatore (dash)
    FASE 2 (vita < 50%, diventa verde acido brillante):
      - Il blob di gelatina ora ha effetto danno over time
      - Prova a inglobare più frequentemente
      - Si divide in 3 pezzi nella terza divisione
  HP Boss: alto
  Musica: ambient elettronica con suoni viscosi e gocciolanti

RICOMPENSA: 🚀 LANCIA RAZZI SLIME (razzi con slime appiccicoso che
  si incollano al nemico ed esplodono dopo 2 secondi precisi — timer
  visivo sopra il proiettile incollato)

══════════════════════════════════════════
LIVELLO 4 — "LA TANA DEL TOPO"
══════════════════════════════════════════

Ambientazione: tunnel sotterranei enormi con tubi arrugginiti,
               formaggio gigante come decorazione ambientale,
               fine livello: uscita in un giardino soleggiato.
Durata media: 13-17 minuti (boss escluso)
Parallax: terra, radici, pipe arrugginite, cristalli di formaggio

ARMA BASE: Trappola-Gun (spara mini trappole che si attivano al passaggio
  del nemico, danno ritardato ma sicuro)

NEMICI (50-60):
  DEBOLI:
  - Topo Soldato (dimensione personaggio): spara proiettili di formaggio
    giallo, 5 HP
  - Topo Veloce (piccolo): non spara, attacco corpo a corpo velocissimo,
    3 HP
  MEDI:
  - Topo Artigliere: spara proiettili di formaggio a raffica + lancia
    trancetti di formaggio esplosivo (area), 8 HP
  - Topo Tank (enorme, doppia dimensione): lento, altissima HP, attacco
    carica devastante, 18 HP
  FORTI:
  - Topo Ninja: si teletrasporta breve distanza, attacco ravvicinato
    combo 3 colpi, 12 HP
  - Topo Generale: coordina altri topi (buff velocità), spara formaggio
    acido, 15 HP

OSTAGGI (6-9): soldatini di plastica verde (le statuine classiche in
  pose miltari), trovati legati con filo da pesca in punti nascosti
  dei tunnel

RISORSE (7-10): dentro formaggi cavi, in casse militari abbandonate,
  su piattaforme elevate.

BOSS FINALE — "GENERALISSIMO FELIX" (gattino laser):
  Ambientazione: giardino soleggiato fuori dalla tana (contrasto netto
    col buio dei tunnel). Il gattino appare innocente poi... attacca.
  Descrizione: gatto domestico di grandi dimensioni (2× Stella),
    arancione/bianco, espressione di sufficienza assoluta. Occhi
    che brillano di rosso prima di sparare il laser.
  Fasi di attacco (3 fasi):
    FASE 1 (vita > 66%) — "modalità giocherellona":
      - Laser dagli occhi: traccia orizzontale che il giocatore deve
        saltare o accovacciarsi per evitare
      - Palla di pelo: sputa una sfera di pelo che rimbalza sulle pareti
        (3 rimbalzi prima di scomparire)
      - Graffia: attacco ravvicinato veloce
    FASE 2 (vita 33-66%) — "modalità arrabbiata" (si ingrandisce del 20%):
      - Laser diagonale (più difficile da schivare)
      - 2 palle di pelo simultanee
      - Si teletrasporta nell'angolo opposto
    FASE 3 (vita < 33%) — "modalità berserk" (occhi completamente rossi):
      - Laser continuo che ruota lentamente
      - Tempesta di palle di pelo (5 simultaneous)
      - Carica furiosa attraverso tutto lo schermo
  HP Boss: molto alto (fight lunga, ~12-16 min)
  Musica: jazz gatto-stile che accelera progressivamente fino a metal

RICOMPENSA:
  - 🐾 SPARA CROCCHETTE ESPLOSIVE
  - 🐱 MICIO: il gattino si rimpicciolisce, assume espressione
    vergognosa/dolce, comincia a seguire Stella. Animazione: si strofina
    sulla gamba di Stella.

══════════════════════════════════════════
LIVELLO 5 (BONUS) — "IL REGNO DEI FOLLETTI"
══════════════════════════════════════════

Ambientazione: mondo fantasy coloratissimo, arcobaleno, prati verdi
               brillanti, funghi giganti, cielo rosato con nuvole
               dorate. Atmosfera iniziale: gioiosa e amichevole.
               Poi: i folletti si strappano la maglietta. Tutto diventa
               leggermente più oscuro e caotico.
Durata media: 10-13 minuti (boss escluso)
Apertura: Stella e Micio scivolano giù da un arcobaleno (animazione
  scripted di 4 secondi) e atterrano nella valle.
Parallax: cielo arcobaleno, colline verdi, funghi, nuvole animate

ARMA BASE: Bacchetta Sparkle (spara stelle dorate, corto range ma splash)

NEMICI (50-60):
  I folletti sembrano amichevoli (animazione: salutano e sorridono) poi
  si strappano la maglietta rivelando muscoli e salopette, e tirano fuori
  mitragliatori.
  DEBOLI:
  - Folletto Soldato (base): salopette + mitragliatore, spara monete
    d'oro (danno medio), 4 HP
  - Folletto Veloce: salopette rossa, corre a zig-zag e spara, 3 HP
  MEDI:
  - Folletto Bombardiere: lancia pentoline di monete come granate
    (area damage), 7 HP
  - Folletto Berserker: muscoloso, attacco corpo a corpo con moneta
    gigante come mazza, 9 HP
  FORTI:
  - Folletto Elite: divisa dorata, spara raffiche di monete d'oro
    corrosive, 12 HP
  - Folletto Sensei (raro): convoca 3 folletti base, immunità temporanea,
    contrattacca se schivato, 16 HP

OSTAGGI (6-9): ragazze intrappolate dai folletti malvagi, chiuse in
  gabbie di funghi giganti o legate a funghi con liane. Ogni ragazza
  liberata ringrazia con un'animazione speciale.

RISORSE (7-10): dentro pentole d'oro (piccole), su nuvole, dentro funghi.

BOSS FINALE — "GRAND LEPRECHAUN MALUS":
  Ambientazione: trono di monete d'oro al centro della valle.
    Lo sfondo diventa tempestoso con lampi dorati.
  Descrizione: folletto enorme (3× Stella), cappello a cilindro verde
    altissimo, smoking verde, barba rossa, occhi gialli. Seduto su
    un trono di monete. Ride di continuo.
  Fasi di attacco (3 fasi):
    FASE 1 (vita > 66%):
      - Lancia monete come proiettili in arco
      - Chiama pioggia di monete dal cielo (pattern prevedibile)
      - Si teletrasporta tra angoli dello schermo
    FASE 2 (vita 33-66%, il cappello si incendia d'oro):
      - Mitragliatore di monete a raffica
      - Crea barriere di monete che bloccano i proiettili
      - Convoca 3 Folletti Elite
    FASE 3 (vita < 33%, diventa enorme e il colore vira al rosso):
      - Tempesta di monete: coprì tutta l'arena di proiettili
      - Attacco fisico: schiacciata col cappello (area enorme)
      - Velocità raddoppiata
  HP Boss: altissimo (boss finale del gioco)
  Musica: jig irlandese elettronica che si trasforma in metal progressivo

RICOMPENSA: 🏆 PENTOLA D'ORO (compare al centro dello schermo con
  fanfara e confetti)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
11. ANIMAZIONE FINALE (ENDING)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Sequenza scripted dopo la raccolta della Pentola d'Oro:
  1. Stella alza la Pentola d'Oro verso il cielo (posa di trionfo)
  2. Micio la guarda con occhi brillanti
  3. Azure applaude sullo sfondo
  4. Testo animato: "HAI VINTO! GLITTER BLITZ COMPLETATO!"
     (pixel art con stelle e coriandoli che cadono)
  5. Stella e Micio si guardano, si annuiscono
  6. Entrambi si tuffano insieme nella Pentola d'Oro
     (animazione di splash con monete d'oro che volano ovunque)
  7. Schermata nera con stelle dorate che appaiono
  8. Schermata crediti in pixel art con musica dolce

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
12. SPECIFICHE TECNICHE (HTML5 BROWSER GAME)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ENGINE: HTML5 Canvas 2D API + JavaScript vanilla (o Phaser 3)
  RISOLUZIONE: 640×360 px nativi, scalati via CSS a schermo intero
               mantenendo aspect ratio 16:9
  FRAMERATE TARGET: 60 FPS stabile
  TILEMAP: Tiled JSON format, tile size 16×16 px
  SPRITE: spritesheet PNG con atlas JSON
  AUDIO: Web Audio API, file .ogg + .mp3 (fallback)
  SALVATAGGIO: in-memory (nessun localStorage — sandbox browser)
  
  STRUTTURA FILE:
  glitter-blitz/
  ├── glitter-blitz.html         ← entry point
  ├── assets/
  │   ├── sprites/               ← spritesheet PNG + atlas JSON
  │   ├── tilemaps/              ← JSON livelli
  │   ├── audio/                 ← musiche e SFX
  │   └── fonts/                 ← pixel font

  LIBRERIE CDN:
  - Phaser 3 (https://cdn.jsdelivr.net/npm/phaser@3/dist/phaser.min.js)
  - Font pixel art: Press Start 2P (Google Fonts)

  PERFORMANCE:
  - Object pooling per proiettili e nemici
  - Camera con dead zone 20% laterale e 30% verticale
  - Culling entità fuori viewport

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
13. AUDIO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Ogni livello: traccia musicale unica (vedi note per livello)
  Ogni boss: traccia musicale distinta (cambio al trigger di spawning)
  SFX: sparo, salto, danno ricevuto, morte nemico, pickup,
       liberazione ostaggio, attivazione checkpoint,
       transizione livello, fine livello.
  Stile generale: chiptune/synth-pop con elementi tematici per livello

=============================================================
  END OF GAME DESIGN DOCUMENT — GLITTER BLITZ v1.0
=============================================================