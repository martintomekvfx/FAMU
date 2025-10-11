# 🔄 Notion Full Integration

## ✨ Co to umí:

### **Obousměrná synchronizace:**
- ✅ **Piš v app** → automaticky se uloží do Notion
- ✅ **Edituj v Notion** → načti zpět do app
- ✅ **Auto-save** - ukládá každé 2 sekundy
- ✅ **Manual save** - tlačítko "Uložit do Notion"
- ✅ **Refresh** - načti nejnovější verzi z Notion
- ✅ **Sync status** - vidíš kdy bylo naposledy uloženo

## 🚀 Jak to použít:

### **1. V React App:**

```jsx
import NotionEditor from './components/NotionEditor';

function ClassPage() {
  return (
    <NotionEditor
      subjectId="ddf"
      classNumber={1}
      initialContent="Tvé poznámky..."
      onSave={(content) => console.log('Saved!', content)}
    />
  );
}
```

### **2. Features:**

#### **Auto-save:**
- Automaticky ukládá každé 2 sekundy po změně
- Debounce - nespamuje API
- Viditelný status "Ukládám..." → "Uloženo"

#### **Manual save:**
- Tlačítko "Uložit do Notion"
- Okamžité uložení
- Feedback o úspěchu/chybě

#### **Refresh:**
- Tlačítko "Obnovit"
- Načte nejnovější verzi z Notion
- Přepíše lokální změny

#### **Toggle Auto-sync:**
- Checkbox "Auto-sync"
- Vypni pro offline práci
- Zapni pro automatické ukládání

## 📊 Sync Status:

### **Stavy:**
- 🔵 **Ukládám...** - právě se ukládá
- 🟢 **Uloženo** - vše je synchronizováno
- 🔴 **Chyba** - něco se pokazilo
- ⚪ **Připraveno** - čeká na změny
- 🔄 **Načítám...** - stahuje z Notion

## 🔧 Technické detaily:

### **Cache:**
- 5 minut cache pro načítání
- Invalidace při uložení
- Rychlejší loading

### **API Calls:**
- `saveNotes` - uložit do Notion
- `loadNotes` - načíst z Notion
- `checkSync` - zkontrolovat status

### **Firebase Functions:**
Všechny operace jdou přes Firebase Functions:
```
App → Firebase Function → Notion API
```

## 📝 Jak to funguje:

### **1. Uložení:**
```
User píše → Debounce 2s → Firebase Function → Notion API → Uloženo
```

### **2. Načtení:**
```
Page load → Check cache → Firebase Function → Notion API → Zobraz
```

### **3. Struktura v Notion:**
```
📚 Předměty Database
├── 📘 Dokumentární film (DDF)
│   ├── 1. hodina ← Zde jsou poznámky
│   ├── 2. hodina
│   └── ...
├── 📙 AV
│   └── ...
```

## 🎯 Použití v existujících pages:

### **ClassPage.jsx:**
```jsx
import NotionEditor from '../components/NotionEditor';

// Nahraď statický content
<NotionEditor
  subjectId={subjectId}
  classNumber={classNumber}
  initialContent={classContent}
/>
```

## 🔐 Security:

- ✅ API Key je v Firebase Functions (ne v browseru)
- ✅ CORS protection
- ✅ Rate limiting
- ✅ Error handling

## 📦 Dependencies:

```json
{
  "react-notion-x": "^6.16.0",
  "notion-client": "^6.16.0",
  "@notionhq/client": "^2.2.15"
}
```

## 🚀 Deploy:

### **1. Deploy Firebase Functions:**
```bash
cd functions
npm install
firebase deploy --only functions
```

### **2. Aktualizuj API URL:**
V `src/services/notionService.js`:
```javascript
const API_URL = 'https://us-central1-YOUR_PROJECT.cloudfunctions.net/notionSync';
```

### **3. Deploy React App:**
```bash
npm run build
firebase deploy --only hosting
```

## 💡 Tips:

### **Offline mode:**
- Vypni Auto-sync
- Pracuj offline
- Zapni Auto-sync a klikni "Uložit"

### **Konflikt verzí:**
- Vždy klikni "Obnovit" před editací
- Notion verze má přednost
- Lokální změny se přepíšou

### **Backup:**
- Všechno je v Notion
- Export z Notion kdykoliv
- Markdown, PDF, HTML

## 🎨 Customizace:

### **Změň auto-save delay:**
```javascript
notionService.autoSaveNotes(subjectId, classNumber, content, 5000); // 5 sekund
```

### **Změň cache duration:**
```javascript
const CACHE_DURATION = 10 * 60 * 1000; // 10 minut
```

## 🐛 Troubleshooting:

### **"Failed to save":**
- Zkontroluj Firebase Functions logs
- Zkontroluj Notion permissions
- Zkontroluj API key

### **"Page not found":**
- Vytvoř předmět v Notion databázi
- Připoj integraci k databázi
- Zkus znovu

### **"Slow loading":**
- Zvyš cache duration
- Optimalizuj Notion structure
- Use pagination

## 🎉 Hotovo!

Teď máš plnou obousměrnou integraci mezi React app a Notion! 🚀

**Piš poznámky kde chceš, všude jsou synchronizované!**
