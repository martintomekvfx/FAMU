# 🚀 Deployment Guide - GitHub Pages

## Rychlý start

### 1. Vytvořte GitHub repozitář

```bash
cd famu-notes
git init
git add .
git commit -m "Initial commit: FAMU Notes React app"
```

### 2. Připojte k GitHub

Vytvořte nový repozitář na GitHubu (např. `famu-notes`) a pak:

```bash
git remote add origin https://github.com/YOUR-USERNAME/famu-notes.git
git branch -M main
git push -u origin main
```

### 3. Nastavte GitHub Pages

1. Jděte na GitHub do vašeho repozitáře
2. Klikněte na **Settings** → **Pages**
3. V sekci **Source** vyberte: **GitHub Actions**
4. Hotovo! 🎉

### 4. Automatický deployment

Při každém push na `main` branch se automaticky:
- Spustí build
- Nasadí na GitHub Pages
- Stránky budou dostupné na: `https://YOUR-USERNAME.github.io/famu-notes/`

## Důležité poznámky

### URL konfigurace

Aplikace je nakonfigurovaná pro URL: `/famu-notes/`

Pokud chcete změnit název repozitáře, musíte aktualizovat:

1. **vite.config.js:**
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/NOVY-NAZEV/',  // změňte zde
})
```

2. **src/App.jsx:**
```javascript
<Router basename="/NOVY-NAZEV">  // změňte zde
```

### První deployment

Po prvním push může trvat 2-3 minuty, než se stránky zobrazí.

## Sledování deploymentu

1. Jděte na váš GitHub repozitář
2. Klikněte na záložku **Actions**
3. Uvidíte průběh deploymentu
4. Zelený ✓ = úspěch, červený ✗ = chyba

## Testování před deploymentem

### Lokální build test

```bash
npm run build
npm run preview
```

Otevřete: http://localhost:4173

### Dev server

```bash
npm run dev
```

Otevřete: http://localhost:5173

## Přidávání nových poznámek

Po přidání nových poznámek:

```bash
git add .
git commit -m "Add class X notes for [Subject]"
git push
```

GitHub Actions automaticky nasadí změny!

## Řešení problémů

### Stránky se nenačítají (404)

- Zkontrolujte, že GitHub Pages je nastaveno na "GitHub Actions"
- Ověřte, že deployment proběhl úspěšně (zelený ✓ v Actions)
- Počkejte 2-3 minuty po prvním deploymentu

### CSS se nenačítá

- Zkontrolujte `base` v `vite.config.js`
- Ujistěte se, že odpovídá názvu vašeho repozitáře

### Build selhává

```bash
# Zkuste lokální build
npm run build

# Pokud selže, zkontrolujte chyby v terminálu
```

## Vlastní doména (volitelné)

Pokud chcete použít vlastní doménu:

1. Vytvořte soubor `public/CNAME` s vaší doménou:
```
notes.vasedomena.cz
```

2. Nastavte DNS u vašeho registrátora
3. V GitHub Settings → Pages zadejte vlastní doménu

## Aktualizace po semestru

Aplikace zůstane online i po skončení semestru. Můžete:
- Přidávat poznámky i v dalších semestrech
- Archivovat starý semestr a vytvořit nový
- Sdílet odkaz s kolegy

## Zálohování

Váš GitHub repozitář je automaticky zálohován. Pro extra bezpečnost:

```bash
# Vytvořte lokální zálohu
git clone https://github.com/YOUR-USERNAME/famu-notes.git famu-notes-backup
```

---

**Úspěšný deployment! 🎓✨**
