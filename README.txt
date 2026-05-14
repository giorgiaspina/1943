# Documentazione tecnica — Glitter Blitz Demo

## Panoramica del progetto
Glitter Blitz è un action platformer 2D in stile arcade con struttura a livelli, combattimento a colpi glitter, ostaggi da liberare, boss fight finali e una compagna chiamata Azure che si unisce al giocatore dopo il salvataggio.

La build attuale è una **demo a 2 livelli**. Il flusso termina dopo il completamento del livello 2 con una schermata finale a tema arcade neon che comunica la fine della demo e permette di ricominciare dal livello 1.

## Obiettivo di gioco
Il giocatore attraversa livelli lineari con piattaforme, nemici, checkpoint e ostaggi. Il gameplay combina:

- movimento laterale;
- salto e doppio salto;
- attacco base con glitter;
- attacco speciale/super;
- raccolta pickup;
- scontro finale con boss;
- liberazione di ostaggi, inclusa Azure.

## Struttura dei file principali
La versione corrente del progetto è organizzata in più file JavaScript, ciascuno con un ruolo preciso.

| File | Ruolo principale |
|---|---|
| `js/boot.js` | Costanti globali, stati del gioco, input base, audio, definizione livelli e variabili runtime. |
| `js/content.js` | Costruzione dei livelli, piattaforme, ostaggi, pickup, spawn nemici e setup della partita. |
| `js/update.js` | Logica di aggiornamento del gameplay: player, boss, collisioni, pickup, danni, progressione e trigger finali. |
| `js/render-ui.js` | Rendering grafico di mondo, HUD, title screen, intro, ostaggi, Azure, schermate finali e statistiche. |
| `js/loop.js` | Game loop principale, gestione degli stati (`TITLE`, `INTRO`, `PLAY`, `PAUSE`, `STATS`, `WIN`, `GAMEOVER`). |

## Architettura logica
Il gioco segue una divisione classica tra **setup**, **update** e **render**.

### Setup
Il setup inizializza canvas, input, audio, stati, livelli e dati runtime. In questa fase vengono anche preparati gli array principali del gioco, come piattaforme, nemici, proiettili, pickup, ostaggi e particelle.

### Update
Durante ogni frame, la logica aggiorna:

- movimento del personaggio;
- salti e doppio salto;
- sparo base e attacco speciale;
- IA dei nemici;
- comportamento dei boss;
- collisioni con piattaforme e proiettili;
- raccolta oggetti;
- liberazione ostaggi;
- passaggio tra stati di gioco.

### Render
Il rendering disegna nell’ordine:

1. sfondo del livello;
2. piattaforme e props rilevanti;
3. pickup e ostaggi;
4. nemici e boss;
5. proiettili;
6. protagonista e Azure;
7. particelle ed effetti;
8. HUD e schermate UI.

Questa separazione rende più semplice modificare l’estetica senza rompere la logica, e viceversa.

## Livelli della demo
La demo attuale contiene due livelli.

| Livello | Tema | Funzione nella demo |
|---|---|---|
| Livello 1 — Avenue in Fiamme | Introduzione, salvataggi, sblocco di Azure, primo boss | Presenta le meccaniche principali e il ritmo base del gioco |
| Livello 2 — Metro Distrutta | Scenario metro moderna, atmosfera più tecnica, boss finale della demo | Mostra il linguaggio visivo definitivo della demo e porta alla schermata “DEMO TERMINATA” |

Il vecchio livello 3 è stato rimosso dalla progressione della demo per concentrare l’esperienza su una vertical slice più pulita e coerente.

## Controlli attuali
I controlli della build aggiornata sono i seguenti:

- `Freccia sinistra / destra`: movimento;
- `Freccia su`: salto e doppio salto;
- `Space` oppure `J`: sparo base glitter;
- `W`: attacco speciale / colpo super;
- `E`: liberazione ostaggi;
- `Esc`: pausa o ritorno alle schermate appropriate.

## Personaggi e ostaggi
La protagonista è il personaggio principale controllato dal giocatore. Azure è un personaggio compagno che viene liberato durante il gioco e poi può seguire il player.

Gli ostaggi sono stati uniformati a uno stile più umano e coerente con il resto del cast. In particolare:

- hanno testa, occhi, bocca, torso, braccia e gambe;
- mantengono varianti visive diverse tra loro;
- Azure, quando è legata, usa la stessa silhouette base della versione libera, con le corde sovrapposte;
- le posizioni degli ostaggi sono state riallineate per farli stare correttamente sulle piattaforme e non sospesi nel vuoto.

## Rendering del livello 2
Il secondo livello ha subito una forte revisione grafica per migliorare leggibilità e identità visiva.

### Problemi iniziali
Le prime versioni contenevano blocchi decorativi e masse scure nello sfondo che cadevano nella stessa fascia visiva delle piattaforme, creando confusione nella lettura dei salti.

### Interventi eseguiti
Sono stati applicati diversi interventi progressivi:

- rimozione dei blocchi decorativi scuri residui;
- pulizia delle props di foreground che disturbavano la lettura;
- ricostruzione dello sfondo con tema metro;
- passaggio a una direzione **metro realistica**;
- rifinitura verso una **metro moderna**, più pulita e coerente;
- eliminazione degli elementi alti indesiderati nella fascia superiore dello sfondo.

### Risultato
Il livello 2 ora usa uno sfondo continuo e leggibile, con linguaggio metro moderno, senza masse decorative invadenti dietro alle piattaforme giocabili.

## Progressione di fine demo
La demo termina al completamento del livello 2.

Il flusso corretto finale è:

1. sconfitta del boss del livello 2;
2. raccolta dell’oggetto finale associato al livello;
3. attivazione della schermata finale `WIN` personalizzata;
4. comparsa della schermata arcade neon con scritta **DEMO TERMINATA**;
5. pressione di `SPACE` per ricominciare dal livello 1, oppure `ESC` per tornare al titolo.

Questa parte è stata corretta perché inizialmente la schermata finale non compariva sempre: in alcuni casi si andava ancora verso la schermata statistiche invece della fine demo.

## Title screen e UI
La schermata principale è stata aggiornata per essere più pulita e più adatta a una demo pubblicabile.

### Modifiche principali alla schermata iniziale
- rimozione della stringa tecnica di versione;
- sostituzione con il testo: **Benvenuti nella demo.**;
- aggiornamento dei controlli mostrati a schermo;
- aggiornamento della selezione livelli da `1 2 3` a `1 2`.

### Schermata finale demo
La schermata finale è stata progettata in stile **arcade neon**:

- pannello scuro con overlay colorato;
- cornici ciano e magenta;
- titolo luminoso “DEMO TERMINATA”;
- istruzione chiara che indica `SPACE` per ricominciare dal livello 1.

## Principali modifiche effettuate
Di seguito un riepilogo sintetico delle modifiche principali apportate durante il lavoro sulla demo.

| Area | Modifica |
|---|---|
| Progressione | Rimosso il livello 3 dalla demo |
| Finale demo | Aggiunta schermata “DEMO TERMINATA” dopo il livello 2 |
| Finale demo | `SPACE` ricomincia dal livello 1, `ESC` torna al titolo |
| Title screen | Sostituita la scritta tecnica con “Benvenuti nella demo.” |
| Controlli | Tasto super cambiato da `K` a `W` |
| Livello 2 | Rimossi blocchi decorativi e props invasive |
| Livello 2 | Nuovo sfondo metro moderna, più leggibile |
| Ostaggi | Restyle verso uno stile umano coerente con protagonista e Azure |
| Azure | Versione legata allineata alla silhouette della versione libera |
| Ostaggi | Riallineamento su piattaforme per evitare effetto fluttuante |

## Flusso degli stati di gioco
Il gioco usa una macchina a stati semplice ma efficace.

| Stato | Descrizione |
|---|---|
| `TITLE` | Schermata iniziale |
| `INTRO` | Intro del livello con nome missione e boss |
| `PLAY` | Gameplay attivo |
| `PAUSE` | Pausa |
| `STATS` | Report di fine livello intermedio |
| `WIN` | Schermata finale demo |
| `GAMEOVER` | Sconfitta e restart |

Nella build attuale, lo stato `WIN` non rappresenta più un “passa al prossimo livello”, ma la vera chiusura della demo.

## Manutenzione futura consigliata
Per rendere il progetto più robusto nelle prossime iterazioni, i passi più utili sono i seguenti:

- separare ancora di più dati dei livelli e logica di rendering;
- centralizzare le stringhe UI in una sezione unica;
- documentare meglio i tipi di nemico e i boss;
- introdurre costanti dedicate per i controlli, così da rendere più semplice cambiare tasti in futuro;
- preparare un piccolo changelog versione per versione;
- aggiungere un file README sintetico per onboarding rapido.

## Conclusione tecnica
La build attuale di Glitter Blitz è una demo compatta ma già ben strutturata, con due livelli, flusso completo, identità visiva definita e schermata finale dedicata.

Le modifiche principali hanno migliorato tre aspetti fondamentali del progetto:

- **leggibilità** del livello 2;
- **coerenza visiva** di ostaggi e personaggi;
- **chiarezza di presentazione** della demo, sia nella schermata iniziale sia nella schermata finale.