# 📝 Rychlý průvodce přidáváním poznámek

## Krok 1: Přidat hodinu do seznamu

Otevřete `src/data/subjects.js` a najděte správný předmět (ddf, av, atd.).

Přidejte novou hodinu do pole `classes`:

```javascript
{
  id: 3,  // Číslo hodiny
  date: '15. 10.',
  lecturer: 'Jméno Přednášejícího',
  title: 'Název tématu hodiny',
  description: 'Volitelný krátký popis', // nepovinné
}
```

## Krok 2: Vytvořit soubor s poznámkami

Vytvořte nový soubor podle předmětu:

- **DDF:** `src/content/ddf/class-XX.jsx`
- **AV:** `src/content/av/avXX.jsx`

### Šablona pro obsah:

```javascript
function ClassXXContent() {
  return (
    <>
      <h1>📚 Hodina XX - Název</h1>
      <h2>Datum - Přednášející</h2>

      <p><strong>Téma:</strong> Stručný popis...</p>

      <hr />

      <h2>📑 Obsah</h2>
      <ul>
        <li><a href="#sekce1">Sekce 1</a></li>
        <li><a href="#sekce2">Sekce 2</a></li>
      </ul>

      <hr />

      <h2 id="sekce1">Sekce 1</h2>
      <p>Text poznámek...</p>

      <h3>Podsekce</h3>
      <p>Více textu...</p>

      <blockquote>
        Důležitá citace nebo poznámka
      </blockquote>

      <ul>
        <li>Odrážka 1</li>
        <li>Odrážka 2</li>
      </ul>

      <h2 id="sekce2">Sekce 2</h2>
      <p>Další obsah...</p>
    </>
  );
}

export default ClassXXContent;
```

## Krok 3: Zaregistrovat v ClassPage

Otevřete `src/pages/ClassPage.jsx` a:

1. **Importujte komponentu:**
```javascript
import ClassXXContent from '../content/[predmet]/class-XX';
```

2. **Přidejte do `contentMap`:**
```javascript
const contentMap = {
  'ddf-1': DDF1Content,
  'ddf-2': DDF2Content,
  'ddf-3': ClassXXContent,  // <-- přidejte tento řádek
  'av-1': AV1Content,
};
```

Formát klíče: `[id-predmetu]-[cislo-hodiny]`

## Užitečné HTML elementy

### Nadpisy
```jsx
<h1>Hlavní nadpis</h1>
<h2>Sekce</h2>
<h3>Podsekce</h3>
<h4>Drobná sekce</h4>
```

### Text formátování
```jsx
<p>Normální text</p>
<strong>Tučný text</strong>
<em>Kurzíva</em>
```

### Citace
```jsx
<blockquote>
  Důležitá citace nebo poznámka
</blockquote>
```

### Seznam
```jsx
<ul>
  <li>Odrážka</li>
  <li>Další odrážka</li>
</ul>

<ol>
  <li>Číslovaný seznam</li>
  <li>Položka 2</li>
</ol>
```

### Odkazy
```jsx
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  Externí odkaz
</a>

<a href="#sekce">Odkaz na sekci</a>
```

### Tabulka
```jsx
<table>
  <thead>
    <tr>
      <th>Sloupec 1</th>
      <th>Sloupec 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
    </tr>
  </tbody>
</table>
```

### Horizontální čára
```jsx
<hr />
```

### Speciální prvky
```jsx
{/* Šipka (použijte className místo class) */}
<span className="arrow">→</span>

{/* Žlutý box pro poznámky */}
<div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
  <strong>Poznámka:</strong> Důležitá informace
</div>
```

## Testování

### Lokální náhled:
```bash
npm run dev
```
Otevřete: http://localhost:5173

### Build test:
```bash
npm run build
```

## Deployment

Po uložení změn a commitu:

```bash
git add .
git commit -m "Add class XX notes"
git push
```

GitHub Actions automaticky nasadí změny na GitHub Pages!

## Tipy

✅ **DO:**
- Používejte `className` místo `class`
- Používejte self-closing tagy: `<hr />`, `<br />`
- Testujte lokálně před commitnutím
- Pište poznámky průběžně během semestru

❌ **DON'T:**
- Nepoužívejte `class` (použijte `className`)
- Nezapomeňte exportovat komponentu
- Nezapomeňte zaregistrovat v ClassPage.jsx

## Potřebujete pomoct?

Podívejte se na existující soubory:
- `src/content/ddf/class-01.jsx` - kompletní příklad
- `src/content/av/av1.jsx` - další příklad

---

**Happy note-taking! 📚✨**
