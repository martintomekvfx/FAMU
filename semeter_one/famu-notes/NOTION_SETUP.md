# 📝 Notion Integration Setup (Firebase Functions)

## ✅ Co už máš hotové:

1. ✅ Notion Integration vytvořena
2. ✅ API Key: `ntn_YOUR_API_KEY_HERE` (máš ho uložený)
3. ✅ Database ID: `2892f121ab5f802a917dcb05c0062179`
4. ✅ Integration připojena k databázi
5. ✅ Firebase projekt nastavený

## 🚀 Setup Firebase Functions:

### Krok 1: Přihlas se do Firebase CLI
```bash
firebase login
```

### Krok 2: Inicializuj Firebase projekt
```bash
cd famu-notes
firebase init
```
- Vyber: **Functions** (mezerník pro výběr)
- Vyber existující projekt
- Jazyk: **JavaScript**
- ESLint: **No** (nebo Yes, jak chceš)
- Install dependencies: **Yes**

### Krok 3: Nainstaluj dependencies
```bash
cd functions
npm install
```

### Krok 4: Nastav Firebase Config
```bash
firebase functions:config:set \
  notion.api_key="ntn_YOUR_API_KEY" \
  notion.database_id="2892f121ab5f802a917dcb05c0062179"
```

**Poznámka:** Nahraď `ntn_YOUR_API_KEY` svým skutečným API key!

### Krok 5: Deploy Functions
```bash
firebase deploy --only functions
```

Počkej 1-2 minuty... 🚀

### Krok 6: Získej Function URL
Po deployi uvidíš:
```
✔  functions[notionSync(us-central1)] Successful create operation.
Function URL: https://us-central1-YOUR_PROJECT.cloudfunctions.net/notionSync
```

**Zkopíruj tuto URL!**

### Krok 7: Aktualizuj frontend
V souboru `src/services/notionService.js` nahraď:
```javascript
const API_URL = 'https://us-central1-YOUR_PROJECT.cloudfunctions.net/notionSync';
```

## 🚀 RYCHLÝ START - Auto Setup Script:

### **Nejjednodušší způsob - spusť script:**

```bash
# 1. Jdi do scripts složky
cd scripts

# 2. Nainstaluj dependencies
npm install

# 3. Nastav API keys
export NOTION_API_KEY="ntn_YOUR_API_KEY"
export NOTION_DATABASE_ID="2892f121ab5f802a917dcb05c0062179"

# 4. Spusť setup
npm run setup
```

**Za 2 minuty máš:**
- ✅ Všechny předměty v Notion
- ✅ Rozvrh (sudý/lichý týden)
- ✅ Dashboard s widgety
- ✅ Strukturu pro poznámky

---

## 🎯 Jak to funguje:

### 1. Sync tlačítko na každém předmětu
- Klikni "Sync do Notion" na stránce předmětu
- Automaticky vytvoří page v Notion databázi
- Přidá všechny informace (název, kód, barva)

### 2. Notion databáze struktura
Tvá databáze by měla mít tyto sloupce:
- **Name** (Title) - název předmětu
- **Code** (Text) - kód předmětu (DDF, STRIH, atd.)
- **Color** (Select) - barva
- **SubjectID** (Text) - ID pro synchronizaci

### 3. Auto-sync poznámek
- Když upravíš poznámky v app
- Klikni "Sync do Notion"
- Poznámky se automaticky aktualizují v Notion

## 🔧 Troubleshooting:

### Chyba: "Missing or insufficient permissions"
- Zkontroluj, že Integration je připojená k databázi
- V Notion databázi: ... → Connections → FAMU Notes Sync

### Chyba: "CORS error"
- Ujisti se, že používáš Vercel deployment
- Lokálně to nefunguje kvůli CORS

### Chyba: "Database not found"
- Zkontroluj Database ID
- Ujisti se, že Integration má přístup

## 📚 Co můžeš dělat:

1. **Sync jednotlivých předmětů** - tlačítko na každé subject page
2. **Sync všech předmětů najednou** - (přidáme později)
3. **Auto-sync poznámek** - při každé změně
4. **Vytváření class pages** - pro každou hodinu

## 🎨 Notion Template:

Tvá databáze by měla vypadat takto:

| Name | Code | Color | SubjectID |
|------|------|-------|-----------|
| Dokumentární film | DDF | blue | ddf |
| Střih | STRIH | purple | strih |
| Kamera | KAMERA | green | kamera |

## 🔐 Bezpečnost:

- ✅ API Key je v environment variables (ne v kódu)
- ✅ Backend API na Vercel (bezpečné)
- ✅ CORS protection
- ✅ Notion permissions kontrolují přístup

## 🚀 Next Steps:

1. Deploy na Vercel
2. Nastav environment variables
3. Zkus sync tlačítko
4. Profit! 🎉
