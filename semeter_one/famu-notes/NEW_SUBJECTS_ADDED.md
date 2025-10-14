# ✅ Nové předměty přidány

Přidal jsem **3 nové předměty** do vaší aplikace na základě markdown souborů!

## 🆕 Přidané předměty

### 1. 🤖 AI - Umělá inteligence (Zelená)
- **Hodina 1:** Emergentní jevy a AlphaGo
  - Emergentní jevy (mozek a mysl)
  - Fázové jevy (bod varu)
  - Lee Sedol vs AlphaGo
  - Doporučená kniha: Maniak
  - Kontakt: ditamorg@gmail.com

### 2. 🎬 PF - Praktická filmová tvorba (Oranžová)
- **Hodina 1:** Úvod do praktické filmové tvorby
  - Připraveno jako šablona
  - Můžete doplnit své poznámky

### 3. 📋 Obecné poznámky (Červená)
- **Hodina 1:** Důležité termíny a informace
  - Pedagogická praxe (Hovorka)
  - Termín po nesice: 18.5. - 22.5. 2026
  - Plenér ve Vídni: 19.-23. listopadu
  - Konzultační díla
  - Checklist na semestr

## 📊 Aktuální stav aplikace

Nyní máte **5 předmětů**:
1. ✅ **DDF** - Dějiny dokumentárního filmu (Modrá) - 12 hodin
2. ✅ **AV** - Audiovizuální studia (Fialová) - 1 hodina
3. ✅ **AI** - Umělá inteligence (Zelená) - 1 hodina
4. ✅ **PF** - Praktická filmová tvorba (Oranžová) - 1 hodina
5. ✅ **Obecné** - Důležité informace (Červená) - 1 hodina

## 🎨 Barevné rozlišení

- 🔵 **Modrá** - DDF
- 🟣 **Fialová** - AV
- 🟢 **Zelená** - AI
- 🟠 **Oranžová** - PF
- 🔴 **Červená** - Obecné poznámky

## 📁 Vytvořené soubory

```
src/
├── content/
│   ├── ai/
│   │   └── ai1.jsx         ✅ NOVÉ
│   ├── pf/
│   │   └── pf1.jsx         ✅ NOVÉ
│   └── general/
│       └── general1.jsx    ✅ NOVÉ
└── data/
    └── subjects.js         ✅ AKTUALIZOVÁNO
```

## 🚀 Co dělat dál?

### 1. Otestujte lokálně
```bash
npm run dev
```
Otevřete http://localhost:5173 a uvidíte:
- Hlavní stránku s 5 předměty
- Každý předmět má jinou barvu
- Všechny mají funkční poznámky

### 2. Doplňte poznámky
Postupně během semestru:

#### Pro AI (ai1.jsx):
- Rozšiřte poznámky z hodiny
- Přidejte další detaily o emergentních jevech
- Doplňte informace o AlphaGo

#### Pro PF (pf1.jsx):
- Nahraďte placeholder text
- Přidejte svoje poznámky z praktických cvičení
- Přidejte odkazy na projekty

#### Pro Obecné (general1.jsx):
- Aktualizujte termíny
- Přidejte další důležité informace
- Doplňte kontakty

### 3. Přidejte další hodiny
Podle potřeby přidejte další hodiny pro každý předmět:

```javascript
// src/data/subjects.js
{
  id: 2,
  date: 'XX. XX.',
  lecturer: 'Jméno',
  title: 'Téma hodiny',
}
```

## 💡 Tipy pro použití

### Obecné poznámky jako "Dashboard"
Předmět "Obecné poznámky" můžete použít jako centrální místo pro:
- ✅ Důležité termíny všech předmětů
- ✅ Checklist na semestr
- ✅ Kontakty na vyučující
- ✅ Odkazy na studijní materiály
- ✅ Připomínky a deadlines

### Práce s markdown soubory
Pokud už máte poznámky v markdown:
1. Otevřete markdown soubor
2. Nakopírujte obsah
3. Převeďte na JSX (změňte `class` → `className`)
4. Vložte do příslušného `.jsx` souboru

## 🔄 Deployment

Po aktualizaci commitněte změny:

```bash
git add .
git commit -m "Add AI, PF and General notes subjects"
git push
```

GitHub Actions automaticky nasadí změny na vaše GitHub Pages!

## 📱 Výsledek

Vaše aplikace nyní má:
- ✅ 5 různobarevných předmětů
- ✅ Přehledné karty na hlavní stránce
- ✅ Všechny předměty mají funkční obsah
- ✅ Důležité termíny na jednom místě
- ✅ Připraveno na rozšíření během semestru

---

**Happy studying! 📚✨**
