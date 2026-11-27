# 📒 Master Promptbook — rozbudowa „Naszego Rodzinnego Kącika”

Projekt jest podzielony na **niezależne etapy (moduły)**. Każdy etap mieści się w jednej sesji z asystentem AI. Zasada pracy:

1. Otwórz nową rozmowę, wklej **Blok 0 (kontekst stały)**.
2. Dołącz pliki wymienione w sekcji „Pliki” danego etapu (albo całe repo jako zip).
3. Wklej prompt etapu. Po zakończeniu: `npm test`, `python3 tests/smoke.py`, commit, push.
4. Odhacz etap w tabeli statusu na dole.

Etap 1 jest już **zrobiony** (wersja startowa). Kolejność dalszych etapów jest dowolna, poza zależnościami podanymi przy etapach.

---

## Blok 0 — kontekst stały (wklejaj na początku każdej sesji)

```text
Pracujesz nad prywatną stroną rodzinną „Nasz Rodzinny Kącik” (repo GitHub → Vercel).
Odbiorca: 10-letnia dziewczynka w klasie 4 szkoły podstawowej w Polsce + rodzice.
Technologia: statyczny HTML/CSS/JS (moduły ES), BEZ bundlera i BEZ frameworka. Routing hashowy (#/…).
Dane w JSON w folderze data/. Postępy w localStorage (js/store.js). Hasło: middleware.js (Basic Auth).
Styl: nowoczesny, pastelowy, zaokrąglony, czcionka Poppins, motywy przez zmienne CSS (--p, --s, --a, --m…),
maskotka Sówka (SVG w js/art.js). Ilustracje tylko własne SVG (CC0) albo na otwartej licencji z podaniem autora.
Język interfejsu: polski, prosty, przyjazny dziecku, bez infantylizmu.
Zasady:
- Nie dodawaj zależności npm do frontendu; kod ma działać po wrzuceniu plików na Vercel bez budowania.
- Nie kopiuj treści z podręczników — pytania pisz własnymi słowami, zgodnie z tematem lekcji.
- Fakty sprawdzaj; przy wątpliwościach pomiń pytanie.
- Format pytań: patrz README.md („Pytania i fiszki”). Po zmianach uruchom `npm test`.
- Zwracaj kompletne pliki albo jasne diffy; nie psuj istniejących ścieżek ani kluczy localStorage („kacik-v1”).
```

---

## Etap 1 — Wersja startowa ✅ (zrobione)

Szkielet strony, 4 motywy, Sówka i ikony SVG, silnik quizów (kartkówka / sprawdzian z oceną / powtórka błędów / fiszki), gwiazdki, serie dni i odznaki, strefa dziecka (plan, terminy z odliczaniem, obowiązki), galeria z lightboxem i skryptem `npm run galeria`, angielski z czytaniem na głos i codziennym planem (Duolingo + EarlyStage), 7 przedmiotów, 35 działów, ok. 330 pytań i 270 fiszek, Basic Auth, noindex, testy.

---

## Etap 2 — Personalizacja (15 min, bez AI)

**Pliki:** `data/config.json`, `data/kids.json`

- `childName`, `siteName`, motyw domyślny.
- Prawdziwy plan lekcji (godziny + przedmioty), zajęcia dodatkowe, wiadomości od rodziców.
- Najbliższe sprawdziany i kartkówki z linkiem `quiz`.
- Ustaw `SITE_USER` / `SITE_PASSWORD` w Vercelu.

---

## Etap 3 — Pytania dopasowane do konkretnych lekcji (powtarzalny, 1 sesja = 1–2 działy)

To najważniejszy, wielokrotnie powtarzany etap. Najlepsze źródło: **zdjęcie tematu i notatki z zeszytu** albo lista zagadnień od nauczyciela przed sprawdzianem.

**Pliki:** `data/subjects/<przedmiot>.json`, `README.md`

```text
[Blok 0]
Zadanie: rozbuduj plik data/subjects/<PRZEDMIOT>.json.
Dział: <id działu albo „nowy dział: tytuł”>.
Zakres materiału (temat lekcji / notatki z zeszytu / zakres na sprawdzian):
<WKLEJ TEKST LUB DOŁĄCZ ZDJĘCIA ZESZYTU / KARTKI OD NAUCZYCIELA>

Wymagania:
- 10–15 fiszek (front/back), krótkie i konkretne.
- 15–20 pytań: ~60% choice (4 opcje, wiarygodne błędne odpowiedzi), ~20% tf, ~20% input.
- Do każdego trudniejszego pytania „explain” (1 zdanie, dla 10-latka).
- Poziom: klasa 4, słownictwo z lekcji. Bez pytań-pułapek.
- Zachowaj istniejące działy; nowe id: małe litery i myślniki.
- Zwróć cały poprawiony plik JSON i listę zmian. Na końcu podaj wpis do data/kids.json → terminy, jeśli podałem datę sprawdzianu: <DATA>.
```

### Mapa działów do uzupełnienia (podpowiedź tematów — dopasuj do kolejności w podręczniku)

| Przedmiot | Podręcznik | Działy, które warto dodać |
|---|---|---|
| Polski | Nowe Słowa na start! 4 / Słowa na start! 4 (2026) | Odmiana rzeczownika przez przypadki · Czasy czasownika · Stopniowanie przymiotników · Głoski, litery, sylaby · Wielka i mała litera · Lektury klasy 4 (np. „Akademia pana Kleksa”, „Opowieści z Narnii”, „Mikołajek” — sprawdź listę lektur nauczyciela) · Kartka z pamiętnika, opowiadanie |
| Matematyka | Klucz do matematyki 4 / Matematyka z kluczem 4 cz. 1–2 | Kalendarz i zegar (rozszerzenie) · Mnożenie i dzielenie pisemne · Wielokrotności i dzielniki · Skala i plan · Rozszerzanie i skracanie ułamków · Dodawanie/odejmowanie ułamków dziesiętnych · Zadania tekstowe |
| Przyroda | Tajemnice przyrody 4 | Krajobraz najbliższej okolicy (formy terenu, skały, gleba) · Wody powierzchniowe · Rośliny i zwierzęta w ogrodzie, na łące, w lesie · Dojrzewanie (jeśli w programie) · Bezpieczeństwo (grzyby, rośliny trujące) |
| Historia | Wczoraj i dziś 4 | Legendy o początkach Polski · Polska Jagiellonów · Złoty wiek · Rozbiory · Powstania · Odzyskanie niepodległości · II wojna światowa · PRL i Solidarność · Polska w UE |
| Ed. zdrowotna | Pewny start — edukacja osobista i zdrowotna | Dojrzewanie i zmiany w ciele (wg programu szkoły) · Higiena cyfrowa · Pierwsza pomoc (pozycja boczna, wzywanie pomocy) · Asertywność |
| Muzyka | Lekcja muzyki 4 | Gama C-dur · Znaki chromatyczne · Kompozytorzy polscy · Pieśni patriotyczne · Instrumenty ludowe · Gra na flecie / dzwonkach |
| Angielski | English Class A1 (klasa 4) | Rooms & furniture (there is/are) · Clothes & present continuous · Sports & hobbies · Weather & seasons · Town & directions · Past simple „was/were” (jeśli w programie) |

---

## Etap 4 — Angielski: słówka z EarlyStage i dyktando

**Zależność:** brak. **Pliki:** `data/subjects/angielski.json`, `js/quiz.js`, `js/views/english.js`

### 4a. Import słówek z zajęć (powtarzalny, co tydzień)
```text
[Blok 0]
Oto słówka i zwroty z ostatnich zajęć EarlyStage (przepisane z zeszytu/platformy):
<LISTA, np. „wardrobe – szafa, upstairs – na górze, …”>
Dopisz je do działu „earlystage-moje” w data/subjects/angielski.json (albo utwórz nowy dział
„earlystage-<numer-lekcji>”, jeśli słówek jest ponad 15). Dla każdego słówka: fiszka + co najmniej
1 pytanie (mieszaj: choice PL→EN, choice ze „say” (słuchanie), input EN). Zwróć cały plik.
```

### 4b. Nowy typ pytania „dyktando” (jednorazowo)
```text
[Blok 0]
Dodaj do silnika js/quiz.js typ pytania "listen": przy wyświetleniu czyta q.say (Web Speech API, q.lang),
dziecko wpisuje usłyszane słowo, porównanie jak w "input" (bez wielkości liter). Przycisk 🔊 do powtórzenia,
przycisk „wolniej” (rate 0.6). Zaktualizuj scripts/sprawdz-dane.mjs i README (format). Dodaj po 3 takie
pytania do każdego działu angielskiego. Uruchom testy.
```

---

## Etap 5 — Nowe typy zadań: dopasowywanie i kolejność

**Pliki:** `js/quiz.js`, `css/style.css`, `scripts/sprawdz-dane.mjs`, `README.md`

```text
[Blok 0]
Rozszerz silnik quizów o dwa typy:
1) "match": { "type":"match", "q":"Połącz w pary", "pairs":[["piano","cicho"],["forte","głośno"],…] }
   — dwie kolumny przycisków; kliknięcie lewego, potem prawego tworzy parę; poprawna para zielona, zła miga
   na czerwono; zaliczone, gdy wszystkie pary dobre (błąd = pytanie do powtórki).
2) "order": { "type":"order", "q":"Ułóż chronologicznie", "items":["966 Chrzest","1025 Koronacja","1410 Grunwald"] }
   — elementy tasowane, przesuwanie strzałkami ↑↓ (dostępne z klawiatury i na telefonie, bez drag&drop bibliotek).
Obsłuż oba typy w trybach kartkówka/sprawdzian/błędy i w ekranie wyników (pokaż poprawną odpowiedź).
Dodaj po 2 przykłady do historii (oś czasu) i muzyki. Zaktualizuj walidator i README. Testy muszą przejść.
```

---

## Etap 6 — Panel rodzica (bez edycji JSON ręcznie)

**Pliki:** nowy `js/views/parent.js`, `js/app.js`, `css/style.css`

```text
[Blok 0]
Dodaj widok #/rodzic (bez linku w menu dziecka; link w stopce „dla rodziców”):
- Podgląd postępów dziecka z tego urządzenia: gwiazdki, ostatnie quizy (data, dział, wynik), najczęstsze błędy.
- Formularz „Dodaj sprawdzian” (data, rodzaj, przedmiot z listy, dział z listy, tryb) → generuje gotowy fragment
  JSON do wklejenia w data/kids.json (przycisk „Kopiuj”). Analogicznie „Dodaj wiadomość”.
- Eksport/import postępów do pliku JSON (przeniesienie na inne urządzenie).
Wymagaj w store.saveResult zapisu historii (ostatnie 200 wyników) — z migracją starego stanu.
```

---

## Etap 7 — Synchronizacja postępów między urządzeniami (opcjonalny)

**Zależność:** Etap 6. **Wymaga:** konta w bazie (np. Upstash Redis z Vercel Marketplace albo Supabase).

```text
[Blok 0]
Dodaj synchronizację stanu localStorage z serwerem:
- Funkcja Vercel /api/progress (GET/PUT), klucz = SITE_USER, dane w Upstash Redis (zmienne środowiskowe
  z integracji Vercel). Middleware już chroni /api hasłem.
- Frontend: przy starcie pobierz stan, scal (max gwiazdek, suma dni, najlepsze wyniki), zapisuj z opóźnieniem 3 s.
- Działa offline: przy braku sieci tylko localStorage. Opisz konfigurację w README.
Pokaż dokładne kroki w panelu Vercela. Nie wprowadzaj bundlera — tylko plik api/progress.js.
```

---

## Etap 8 — Zdjęcia: optymalizacja i albumy

**Pliki:** `scripts/galeria.mjs`, `js/views/gallery.js`

```text
[Blok 0]
1) Rozszerz scripts/galeria.mjs: jeśli zainstalowany jest pakiet "sharp" (devDependency), twórz miniatury
   400 px (zdjecia/<album>/_min/) i wersje 1600 px webp; galeria używa miniatur w siatce i dużych w lightboxie.
   Usuń dane EXIF (lokalizacja GPS!) z publikowanych plików.
2) Album może mieć pole "dlaDzieci": false — taki album widać tylko w #/rodzic.
3) Lightbox: gesty przesuwania na telefonie, pokaz slajdów (▶ co 4 s).
```

---

## Etap 9 — Aplikacja na telefon (PWA offline)

**Pliki:** nowy `sw.js`, `index.html`, `manifest.webmanifest`

```text
[Blok 0]
Zrób z strony PWA: service worker cache'ujący pliki aplikacji i data/*.json (stale-while-revalidate),
ikony PNG 192/512 wygenerowane z assets/favicon.svg, ekran „Jesteś offline — quizy działają dalej”.
Uwaga na Basic Auth: service worker nie może cache'ować odpowiedzi 401. Instrukcja „Dodaj do ekranu głównego”
dla iPhone i Androida w widoku #/ustawienia.
```

---

## Etap 10 — Grywalizacja+ (opcjonalny, dla motywacji)

```text
[Blok 0]
Dodaj „sklepik” za gwiazdki: dziecko wymienia gwiazdki na dodatki wizualne (kolor Sówki, czapka, okulary,
naklejki w tle — wszystko jako własne SVG CC0). Nagrody z prawdziwego świata (np. „wyjście na lody”) definiuje
rodzic w data/config.json → nagrody[] z ceną w gwiazdkach. Nie zmieniaj sposobu zdobywania gwiazdek.
```

---

## Kontrola jakości po każdym etapie

```bash
npm test                    # walidacja danych
python3 tests/smoke.py      # test w przeglądarce (pip install playwright && playwright install chromium)
```
Checklist ręczny: telefon (menu na dole), zmiana motywu, quiz do końca, powtórka błędów, czytanie na głos po angielsku, hasło na Vercelu.

## Status

| Etap | Opis | Status |
|---|---|---|
| 1 | Wersja startowa | ✅ |
| 2 | Personalizacja | ☐ |
| 3 | Pytania do lekcji (powtarzalny) | ☐ |
| 4 | Angielski: EarlyStage + dyktando | ☐ |
| 5 | Dopasowywanie i kolejność | ☐ |
| 6 | Panel rodzica | ☐ |
| 7 | Synchronizacja postępów | ☐ |
| 8 | Zdjęcia: miniatury, EXIF | ☐ |
| 9 | PWA offline | ☐ |
| 10 | Sklepik za gwiazdki | ☐ |
