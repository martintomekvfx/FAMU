# 📝 Notion Integration Setup

## ✅ Co už máš hotové:

1. ✅ Notion Integration vytvořena
2. ✅ API Key: `ntn_YOUR_API_KEY_HERE` (máš ho uložený)
3. ✅ Database ID: `2892f121ab5f802a917dcb05c0062179`
4. ✅ Integration připojena k databázi

## 🚀 Deployment na Vercel:

### Krok 1: Vytvoř Vercel účet
1. Jdi na https://vercel.com/signup
2. Přihlas se přes GitHub

### Krok 2: Importuj projekt
1. Klikni na "Add New..." → "Project"
2. Vyber GitHub repository: `FAMU`
3. Klikni "Import"

### Krok 3: Nastav Environment Variables
V Vercel dashboardu:
1. Jdi do "Settings" → "Environment Variables"
2. Přidej tyto proměnné:

```
NOTION_API_KEY = ntn_YOUR_NOTION_API_KEY
NOTION_DATABASE_ID = 2892f121ab5f802a917dcb05c0062179
```

**Poznámka:** Použij svůj Notion API key, který jsi dostal při vytváření integrace.

### Krok 4: Deploy
1. Klikni "Deploy"
2. Počkej 2-3 minuty
3. Hotovo! 🎉

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
