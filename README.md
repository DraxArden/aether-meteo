# Aether Meteo

Il confronto dei modelli meteo: tutte le previsioni insieme, con indice di affidabilità, mappe, allerte e verifica storica.

## Contenuto della cartella

| File | A cosa serve |
|---|---|
| `index.html` | L'app completa (si può aprire anche da sola con un doppio clic) |
| `manifest.webmanifest` | Nome, colori e icone per installarla sul telefono |
| `sw.js` | Service worker: fa funzionare l'app offline con gli ultimi dati |
| `icons/` | Icone dell'app |

## Usarla subito

Fai doppio clic su `index.html`. Tutto funziona tranne l'installazione e l'uso offline, che richiedono un indirizzo web vero (https).

## Pubblicarla gratis su GitHub Pages (per installarla sul telefono)

1. Crea un account su github.com, se non ce l'hai.
2. Crea un nuovo repository pubblico, per esempio `aether-meteo`.
3. Nella pagina del repository: **Add file → Upload files**, trascina **tutto il contenuto** di questa cartella (compresa la cartella `icons`) e conferma con **Commit changes**.
4. Vai in **Settings → Pages**, alla voce *Branch* scegli `main` e la cartella `/ (root)`, poi **Save**.
5. Dopo un paio di minuti l'app è online su `https://TUONOME.github.io/aether-meteo/`.

Apri quell'indirizzo dal telefono:
- **Android (Chrome):** compare il pulsante di installazione in alto nell'app, oppure menu ⋮ → *Installa app*.
- **iPhone (Safari):** pulsante Condividi → *Aggiungi alla schermata Home*.

## Link condivisibili

Il pulsante **Condividi** crea un link del tipo `…/?lat=41.89&lon=12.51&name=Roma`, che apre direttamente quella località.

## Fonti dei dati

- Previsioni dei modelli, ensemble, run precedenti e verifica: [Open-Meteo](https://open-meteo.com) (CC BY 4.0), uso gratuito solo non commerciale.
- Mappe dei modelli ICON e AICON e satellite Meteosat: [DWD](https://maps.dwd.de) (servizio meteo tedesco).
- Radar: [RainViewer](https://www.rainviewer.com).
- Allerte: bollettino di criticità della [Protezione Civile](https://github.com/pcm-dpc/DPC-Bollettini-Criticita-Idrogeologica-Idraulica) (CC BY 4.0).
- Sfondi della mappa: Esri.

Prototipo: non usarlo per decisioni in cui è in gioco la sicurezza; per le allerte fa sempre fede il sito della Protezione Civile e della tua Regione.
