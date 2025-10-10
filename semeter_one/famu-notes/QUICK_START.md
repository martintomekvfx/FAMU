# ⚡ Quick Start Guide

## 🚀 Spuštění za 3 kroky

### 1. Instalace (jednorázově)
```bash
cd famu-notes
npm install
```

### 2. Spuštění
```bash
npm run dev
```

### 3. Otevřít
Otevřete v prohlížeči: **http://localhost:5173**

---

## 📝 Přidání nové hodiny (5 minut)

### Krok 1: Přidat do seznamu
`src/data/subjects.js` → Najít správný předmět → Přidat:
```javascript
{
  id: 3,
  date: '15. 10.',
  lecturer: 'Jméno',
  title: 'Název tématu',
}
```

### Krok 2: Vytvořit soubor s poznámkami
`src/content/ddf/class-03.jsx`:
```javascript
function Class03Content() {
  return (
    <>
      <h1>📚 Hodina 3 - Název</h1>
      <h2>15. 10. - Jméno</h2>
      
      <p>Poznámky zde...</p>
    </>
  );
}

export default Class03Content;
```

### Krok 3: Zaregistrovat
`src/pages/ClassPage.jsx` → Přidat na začátek:
```javascript
import Class03Content from '../content/ddf/class-03';
```

A do `contentMap`:
```javascript
const contentMap = {
  'ddf-3': Class03Content,  // <-- přidat
  // ... zbytek
};
```

### Hotovo! 🎉
Poznámky se okamžitě zobrazí na http://localhost:5173

---

## 🌐 Nasazení na web (první push)

```bash
# 1. Inicializovat Git
git init
git add .
git commit -m "Initial commit"

# 2. Vytvořte repozitář na github.com (např. famu-notes)

# 3. Připojit a nahrát
git remote add origin https://github.com/YOUR-USERNAME/famu-notes.git
git branch -M main
git push -u origin main

# 4. Nastavit GitHub Pages
# → GitHub.com → Settings → Pages → Source: GitHub Actions
```

**Vaše stránky budou na:** `https://YOUR-USERNAME.github.io/famu-notes/`

---

## 🔄 Aktualizace poznámek (další změny)

```bash
git add .
git commit -m "Add class 3 notes"
git push
```

GitHub automaticky nasadí změny! ⚡

---

## 📁 Kde co najdu?

| Co chci | Kde to je |
|---------|-----------|
| Přidat hodinu | `src/data/subjects.js` |
| Napsat poznámky | `src/content/[predmet]/class-XX.jsx` |
| Zaregistrovat | `src/pages/ClassPage.jsx` |
| Spustit lokálně | `npm run dev` |
| Nasadit změny | `git push` |

---

## 🆘 Nejčastější problémy

### "Cannot find module"
→ Zkontrolujte import v `ClassPage.jsx`

### Stránka je prázdná
→ Zkontrolujte, že jste přidali do `contentMap`

### CSS nefunguje
→ Restartujte dev server (`Ctrl+C` pak `npm run dev`)

### Build selhává
```bash
npm run build  # zjistit chybu
```

---

## 💡 Tipy

- **Pište průběžně** - přidávejte poznámky po každé hodině
- **Testujte lokálně** - před commitem vždy otestujte `npm run dev`
- **Commitujte často** - lepší více malých commitů než jeden velký
- **Používejte šablony** - nakopírujte existující soubor a upravte
- **Sdílejte s kolegy** - pošlete jim odkaz na GitHub Pages

---

## 📚 Další dokumentace

- **README.md** - Kompletní dokumentace
- **ADDING_NOTES.md** - Detailní průvodce přidáváním
- **DEPLOYMENT.md** - Detailní průvodce deploymentem
- **PROJECT_SUMMARY.md** - Přehled projektu

---

## ✅ Checklist pro první použití

- [ ] `npm install` dokončeno
- [ ] `npm run dev` funguje
- [ ] Otevřel jsem http://localhost:5173
- [ ] Vidím 2 předměty (DDF a AV)
- [ ] Můžu kliknout na DDF a vidím hodiny
- [ ] Můžu otevřít hodinu 1 a vidím poznámky
- [ ] Přečetl jsem ADDING_NOTES.md
- [ ] Vytvořil jsem GitHub repozitář
- [ ] Nahrál jsem kód na GitHub
- [ ] Nastavil jsem GitHub Pages
- [ ] Stránky fungují online

---

**Vše je připraveno! Začněte přidávat poznámky 📝✨**
