# 🦉 Nasz Rodzinny Kącik

Prywatna strona rodzinna: zdjęcia, strefa dziecka (plan lekcji, sprawdziany, obowiązki) i moduł nauki dla klasy 4 — fiszki, kartkówki, sprawdziany, powtórka błędów, angielski z wymową, linki do EarlyStage i Duolingo.

- **Bez budowania** — czysty HTML/CSS/JS (moduły ES). Vercel serwuje pliki tak, jak są.
- **Dane w JSON** — pytania, plan lekcji, terminy i albumy edytujesz w folderze `data/`.
- **Postępy** (gwiazdki, odznaki, błędy) zapisują się w przeglądarce dziecka (`localStorage`).
- **Ochrona hasłem** — `middleware.js` (Basic Auth na Vercelu).

## Struktura

```
index.html              jedna strona, routing po #/adres
css/style.css           wygląd + 4 motywy kolorów (lawenda, mięta, brzoskwinia, ocean)
js/app.js               router i start aplikacji
js/quiz.js              silnik: kartkówka, sprawdzian, powtórka błędów, fiszki
js/store.js             zapis postępów w przeglądarce
js/art.js               ilustracje SVG (CC0) — Sówka, ikony przedmiotów, tęcza
js/views/*.js           widoki: start, nauka, angielski, moja strefa, zdjęcia, postępy, ustawienia
data/config.json        nazwa strony, imię dziecka, linki, codzienny plan angielskiego
data/kids.json          wiadomości, terminy sprawdzianów, obowiązki, plan lekcji, ciekawostki
data/gallery.json       albumy (generowane skryptem)
data/subjects/*.json    banki pytań i fiszek (1 plik = 1 przedmiot)
zdjecia/<album>/        zdjęcia (1 folder = 1 album)
scripts/                galeria.mjs (aktualizuje albumy), sprawdz-dane.mjs (walidacja)
tests/smoke.py          test w przeglądarce (Playwright)
middleware.js           hasło do całej strony
PROMPTBOOK.md           plan rozbudowy w etapach + gotowe prompty
```

## Szybki start

1. **Spersonalizuj**: w `data/config.json` wpisz imię dziecka (`childName`) i nazwę strony; w `data/kids.json` — plan lekcji, terminy, wiadomości. Przykładowe terminy są ustawione na grudzień 2026.
2. **Podgląd lokalny** (potrzebny serwer, bo strona wczytuje JSON):
   ```bash
   python3 -m http.server 3000     # albo: npm start
   ```
   Otwórz http://localhost:3000
3. **Sprawdź dane** po każdej zmianie: `npm test` (wymaga Node 18+).

## GitHub → Vercel

1. Utwórz na GitHubie **repozytorium prywatne** (ważne — w repo będą zdjęcia rodzinne).
2. Wgraj pliki:
   ```bash
   git init -b main      # (w paczce repo jest już zainicjowane — pomiń)
   git add . && git commit -m "Pierwsza wersja"
   git remote add origin https://github.com/<twoj-login>/rodzinna-strona.git
   git push -u origin main
   ```
3. Na [vercel.com](https://vercel.com) → **Add New → Project** → wybierz repo. Framework Preset: **Other**, Build Command: puste, Output Directory: puste (katalog główny). **Deploy**.
4. **Hasło**: Project → Settings → Environment Variables → dodaj `SITE_USER` i `SITE_PASSWORD` (dla Production i Preview) → **Redeploy**. Bez tych zmiennych strona jest otwarta.
5. Każdy `git push` na `main` automatycznie aktualizuje stronę.

> Uwaga: Basic Auth chroni całą stronę i zdjęcia. Przeglądarka pamięta hasło po pierwszym logowaniu. Dodatkowo `robots.txt`, `X-Robots-Tag` i `<meta robots>` blokują indeksowanie w Google.

## Jak dodawać treści

### Zdjęcia
1. Utwórz folder `zdjecia/nazwa-albumu/` (małe litery, myślniki, bez polskich znaków) i wrzuć zdjęcia (`.jpg`, `.png`, `.webp`). Zmniejsz je wcześniej do ok. 1600 px — strona będzie szybsza.
2. `npm run galeria` — dopisze album do `data/gallery.json`.
3. W `data/gallery.json` uzupełnij `tytul`, `data`, `opis` i podpisy zdjęć (zostaną zachowane przy kolejnym uruchomieniu skryptu).
4. Przykładowe obrazki SVG możesz usunąć razem z ich folderami.

### Sprawdzian / kartkówka w kalendarzu
W `data/kids.json` → `terminy`:
```json
{ "data": "2026-12-10", "rodzaj": "Sprawdzian", "przedmiot": "Przyroda", "temat": "Pogoda", "quiz": "przyroda/pogoda/sprawdzian" }
```
`quiz` = `przedmiot/dział/tryb` (tryby: `fiszki`, `kartkowka`, `sprawdzian`; dział `wszystko` = test z całego przedmiotu). Przycisk „Powtórz” pojawi się na stronie głównej i w Mojej strefie.

### Pytania i fiszki
Każdy plik `data/subjects/<przedmiot>.json` ma listę działów (`units`). Dział:
```json
{
  "id": "ulamki-zwykle", "title": "Ułamki zwykłe", "desc": "…",
  "lang": "en-GB",                       // tylko angielski: włącza czytanie na głos
  "flashcards": [ { "front": "Licznik", "back": "Liczba nad kreską", "note": "opcjonalnie" } ],
  "questions": [
    { "type": "choice", "q": "Pytanie?", "options": ["A", "B", "C"], "answer": 1, "explain": "opcjonalnie" },
    { "type": "tf", "q": "Zdanie prawdziwe?", "answer": true },
    { "type": "input", "q": "Wpisz…", "answer": ["4", "cztery"], "strict": false },
    { "type": "choice", "q": "Posłuchaj i wybierz:", "say": "rabbit", "options": ["królik", "kot"], "answer": 0 }
  ]
}
```
- `answer` w `choice` to **numer** opcji liczony od 0 (opcje są tasowane na ekranie).
- `input` akceptuje kilka wersji; wielkość liter nie ma znaczenia, przecinek = kropka w liczbach. `"strict": true` wymaga polskich znaków (ortografia).
- Sprawdzian pojawia się, gdy dział ma co najmniej 8 pytań; losuje do 20 pytań i podaje przewidywaną ocenę.
- Po zmianach: `npm test`.

## Podręczniki i serwisy zewnętrzne
Linki do flipbooków Nowej Ery są na stronach przedmiotów. Pytania zostały napisane od zera według tematów z klasy 4 — flipbooki są aplikacjami graficznymi i nie da się z nich automatycznie pobrać treści. Aby dopasować pytania do konkretnych lekcji, użyj promptów z `PROMPTBOOK.md` (np. wklej temat lekcji lub notatki z zeszytu). Materiały EarlyStage są za logowaniem — nowe słówka z zajęć dopisuj do działu „Moje słówka z EarlyStage” w `data/subjects/angielski.json`.

## Licencje
- Kod i ilustracje (`js/art.js`, `assets/favicon.svg`, `zdjecia/**/*.svg`) — CC0 1.0.
- Czcionka Poppins — SIL Open Font License 1.1 (`assets/fonts/OFL-Poppins.txt`).
- Jeśli dodasz ilustracje z zewnątrz (np. OpenMoji — CC BY-SA 4.0, unDraw, Open Peeps — CC0), dopisz autorów w widoku `#/licencje` (`js/views/settings.js`).
