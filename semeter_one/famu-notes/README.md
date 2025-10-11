# FAMU Poznámky - Studijní materiály

Moderní webová aplikace pro organizaci a přístup k poznámkám z předmětů FAMU (Filmová a televizní fakulta AMU).

## Živá verze

Aplikace je dostupná online na: **https://YOUR-USERNAME.github.io/famu-notes/**

## Funkce

- **Přehledná navigace** - jednoduché procházení předmětů a hodin
- **Responzivní design** - funguje na počítači i mobilu
- **Moderní UI** - postaveno na React a TailwindCSS
- **Rychlé** - optimalizováno pomocí Vite
- **SEO friendly** - přátelské pro vyhledávače

## 🛠️ Technologie

- **React 19** - UI framework
- **React Router** - navigace mezi stránkami
- **TailwindCSS** - stylování
- **Vite** - build tool
- **Lucide React** - ikony
- **GitHub Pages** - hosting

## 💻 Lokální vývoj

### Instalace

```bash
npm install
```

### Spuštění vývojového serveru

```bash
npm run dev
```

Aplikace bude dostupná na `http://localhost:5173`

### Build pro produkci

```bash
npm run build
```

### Náhled produkční verze

```bash
npm run preview
```

## 📝 Jak přidat nové poznámky

### 1. Přidat informace o hodině do `src/data/subjects.js`

```javascript
{
  id: 3,
  date: '15. 10.',
  lecturer: 'Jméno Přednášejícího',
  title: 'Název hodiny',
  description: 'Krátký popis (nepovinné)',
}
```

### 2. Vytvořit nový soubor s obsahem

Vytvořte nový soubor v `src/content/[predmet]/class-XX.jsx`:

```javascript
function ClassXXContent() {
  return (
    <>
      <h1>📚 Hodina XX - Název</h1>
      <h2>Datum - Přednášející</h2>

      <p>Váš obsah zde...</p>
      
      <h2>Sekce</h2>
      <p>Text, <strong>tučný text</strong>, <em>kurzíva</em></p>
      
      <blockquote>
        Citace nebo důležitá poznámka
      </blockquote>
      
      <ul>
        <li>Odrážka 1</li>
        <li>Odrážka 2</li>
      </ul>
    </>
  );
}

export default ClassXXContent;
```

### 3. Zaregistrovat komponentu v `src/pages/ClassPage.jsx`

```javascript
import ClassXXContent from '../content/[predmet]/class-XX';

const contentMap = {
  // ... existující
  '[predmet-id]-XX': ClassXXContent,
};
```

### 4. Jak přidat nový předmět

V souboru `src/data/subjects.js` přidejte nový objekt:

```javascript
{
  id: 'zkratka-predmetu',  // např. 'av', 'ddf'
  name: 'Plný název předmětu',
  shortName: 'Zkratka',
  description: 'Popis předmětu',
  color: 'blue',  // blue, purple, green, red, orange
  classes: [
    // ... hodiny
  ],
  links: [
    {
      name: 'Užitečný odkaz',
      url: 'https://example.com',
    },
  ],
}
```

## 🚀 Deployment na GitHub Pages

### Automatický deployment (Doporučeno)

1. **Nahrajte kód na GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR-USERNAME/famu-notes.git
   git push -u origin main
   ```

2. **Nastavte GitHub Pages:**
   - Jděte do Settings → Pages
   - Source: GitHub Actions
   - Při každém push na `main` se stránky automaticky aktualizují

### Manuální deployment

```bash
npm run deploy
```

**Poznámka:** Před prvním deploymentem nainstalujte gh-pages:
```bash
npm install -D gh-pages
```

## 📁 Struktura projektu

```
famu-notes/
├── src/
│   ├── content/          # Obsah poznámek
│   │   ├── ddf/          # Poznámky z DDF
│   │   └── av/           # Poznámky z AV
│   ├── data/             # Data a konfigurace
│   │   └── subjects.js   # Definice předmětů a hodin
│   ├── pages/            # React stránky
│   │   ├── Home.jsx      # Hlavní stránka
│   │   ├── SubjectPage.jsx  # Stránka předmětu
│   │   └── ClassPage.jsx    # Stránka hodiny
│   ├── App.jsx           # Hlavní komponenta
│   ├── main.jsx          # Entry point
│   └── index.css         # Globální styly
├── public/               # Statické soubory
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions
└── package.json
```

## 🎨 Stylování

Aplikace používá TailwindCSS s vlastními utility třídami definovanými v `src/index.css`.

Pro obsah poznámek použijte třídu `prose-custom` pro konzistentní stylování:
- Nadpisy automaticky stylované
- Citace s modrým pruhem
- Tabulky s hover efekty
- Odkazy s tečkovaným podtržením

## 🤝 Přispívání

Během semestru postupně přidávejte nové poznámky a aktualizujte existující:

1. Vytvořte nový soubor s poznámkami
2. Aktualizujte `subjects.js`
3. Zaregistrujte komponentu
4. Commitněte a pushněte změny

## 📄 Licence

Osobní studijní materiály pro FAMU © 2025

---

**Vytvořeno pro snadný přístup k poznámkám kdykoliv a kdekoliv 🎓**
