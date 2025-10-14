# 🚀 Notion Setup Script

Tento script automaticky vytvoří kompletní Notion workspace s:
- ✅ Všemi předměty (DDF, Střih, Kamera, Zvuk, AV, AI)
- ✅ Hodinami a poznámkami
- ✅ Rozvrhem (sudý/lichý týden)
- ✅ Dashboard s widgety

## 📋 Před spuštěním:

1. **Notion Integration připojena** k databázi
2. **API Key** a **Database ID** připravené

## 🏃 Jak spustit:

### Krok 1: Nainstaluj dependencies
```bash
cd scripts
npm install
```

### Krok 2: Nastav environment variables
```bash
export NOTION_API_KEY="ntn_YOUR_API_KEY"
export NOTION_DATABASE_ID="2892f121ab5f802a917dcb05c0062179"
```

### Krok 3: Spusť script
```bash
npm run setup
```

## 📊 Co script vytvoří:

### 1. Dashboard Page
- Úvodní stránka s přehledem
- Odkazy na všechny sekce
- Widget pro aktuální týden

### 2. Rozvrh Page
- Lichý týden (toggle)
- Sudý týden (toggle)
- Všechny hodiny s časy a místnostmi

### 3. Předměty v databázi
Každý předmět obsahuje:
- Název, kód, barva
- Popis předmětu
- Sub-pages pro každou hodinu

### 4. Hodiny (Sub-pages)
- Číslo a název hodiny
- Datum
- Prostor pro poznámky

## ⏱️ Jak dlouho to trvá:

- **6 předmětů** = ~30 sekund
- **+ hodiny** = +5 sekund na hodinu
- **Celkem** = ~1-2 minuty

## 🎨 Notion Widgets (přidáš ručně):

Po spuštění scriptu přidej tyto widgety:

### 1. Indify - Week Number Widget
- URL: https://indify.co/widgets/live/week-number
- Zobrazí sudý/lichý týden

### 2. Notion Calendar
- Propoj s deadlines databází
- Zobrazí nadcházející termíny

### 3. Progress Bar
- URL: https://indify.co/widgets/live/progress-bar
- Sleduj postup semestru

## 🔧 Troubleshooting:

### Chyba: "Unauthorized"
- Zkontroluj API key
- Ujisti se, že Integration je připojená k databázi

### Chyba: "Database not found"
- Zkontroluj Database ID
- Ujisti se, že databáze existuje

### Chyba: "Rate limit"
- Script má built-in delays
- Pokud selže, zkus znovu za minutu

## 📝 Poznámky:

- Script je **idempotentní** - můžeš ho spustit vícekrát
- Existující pages nebudou duplikovány (kontrola podle názvu)
- Můžeš upravit data v `setup-notion.js`

## 🎉 Po dokončení:

1. Otevři Notion
2. Najdi databázi "famu-predmety"
3. Uvidíš všechny předměty a strukturu
4. Přidej widgety podle návodu výše
5. Profit! 🚀
