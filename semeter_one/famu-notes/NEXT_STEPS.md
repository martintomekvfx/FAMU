# 🎯 Next Steps - Co dělat teď

## ✅ Co je hotovo

Vaše aplikace je **100% připravena k použití**! 

- ✅ React aplikace s moderním UI
- ✅ 2 předměty (DDF a AV) s ukázkovými poznámkami
- ✅ Responzivní design pro všechna zařízení
- ✅ GitHub Actions pro automatický deployment
- ✅ Kompletní dokumentace

---

## 🚀 Doporučené kroky (v pořadí)

### 1. Testujte lokálně (5 minut)

```bash
cd famu-notes
npm install
npm run dev
```

Otevřete: **http://localhost:5173**

**Vyzkoušejte:**
- [ ] Hlavní stránka zobrazuje 2 předměty
- [ ] Kliknutí na DDF zobrazí 12 hodin
- [ ] Otevření hodiny 1 zobrazí kompletní poznámky
- [ ] Navigace mezi hodinami funguje
- [ ] Zpět na přehled předmětů funguje
- [ ] Na mobilu (otevřete DevTools a změňte viewport)

### 2. Nahrajte na GitHub (10 minut)

#### A. Vytvořte GitHub repozitář
1. Jděte na https://github.com/new
2. Název: `famu-notes`
3. Public nebo Private (vaše volba)
4. **NEVYTVÁŘEJTE** README, .gitignore, license (už je v projektu)
5. Klikněte "Create repository"

#### B. Nahrajte kód
```bash
cd famu-notes
git init
git add .
git commit -m "Initial commit: FAMU Notes React app"
git remote add origin https://github.com/YOUR-USERNAME/famu-notes.git
git branch -M main
git push -u origin main
```

#### C. Aktivujte GitHub Pages
1. Jděte do vašeho repozitáře na GitHubu
2. **Settings** → **Pages**
3. Source: **GitHub Actions**
4. Počkejte 2-3 minuty
5. Stránky budou na: `https://YOUR-USERNAME.github.io/famu-notes/`

### 3. Přidejte své první vlastní poznámky (15 minut)

Vyberte si jednu hodinu a přidejte poznámky:

1. **Otevřete:** `src/data/subjects.js` - zkontrolujte, že hodina je v seznamu
2. **Vytvořte:** `src/content/ddf/class-03.jsx` (nebo kteroukoliv jinou)
3. **Nakopírujte obsah z:** `class-01.jsx` jako šablonu
4. **Upravte:** obsah podle vašich poznámek
5. **Zaregistrujte:** v `src/pages/ClassPage.jsx`
6. **Testujte:** `npm run dev` a zkontrolujte výsledek
7. **Commitněte:**
   ```bash
   git add .
   git commit -m "Add class 3 notes"
   git push
   ```

### 4. Postupně přidávejte více poznámek

**Průběžně během semestru:**
- Po každé hodině přidejte poznámky
- Commit a push změny
- GitHub automaticky aktualizuje web
- Máte přístup k poznámkám kdykoliv a odkudkoliv

---

## 📱 Použití

### Pro studium:
- Otevřete na telefonu
- Přidejte záložku do prohlížeče
- Poznámky jsou vždy dostupné online
- Funguje i offline po prvním načtení (SPA)

### Pro sdílení:
- Pošlete kolegům odkaz na vaši GitHub Pages
- Můžou si poznámky číst (pokud je repozitář public)
- Nebo je přidejte jako collaborators (Settings → Collaborators)

---

## 🎨 Personalizace (volitelné)

### Změnit barvy předmětů
`src/data/subjects.js` → změňte `color` property:
```javascript
color: 'purple'  // blue, purple, green, red, orange
```

### Přidat logo
1. Dejte `logo.png` do `public/`
2. Upravte `src/pages/Home.jsx` - přidejte `<img src="/logo.png" />`

### Změnit název
`index.html` a `package.json` → změňte `title` a `name`

---

## 📊 Monitorování

### Sledování deploymentu
- **GitHub** → váš repozitář → záložka **Actions**
- Zelený ✓ = úspěch
- Červený ✗ = chyba (klikněte pro detail)

### Přístupové statistiky
- **GitHub** → váš repozitář → **Insights** → **Traffic**
- Vidíte kolik lidí navštívilo vaše poznámky

---

## 🔧 Údržba

### Pravidelně (po každé hodině):
```bash
# Přidat poznámky
npm run dev  # test lokálně
git add .
git commit -m "Add class X notes"
git push
```

### Občas (jednou za měsíc):
```bash
# Aktualizovat dependencies
npm update
npm run build  # test že vše funguje
git add .
git commit -m "Update dependencies"
git push
```

---

## 📚 Dokumentace rychlý přístup

| Potřebuji | Soubor |
|-----------|--------|
| Rychlý start | **QUICK_START.md** ⭐ |
| Přidat poznámky | **ADDING_NOTES.md** |
| Nasadit na web | **DEPLOYMENT.md** |
| Přehled projektu | **PROJECT_SUMMARY.md** |
| Kompletní info | **README.md** |
| Co dělat teď | **NEXT_STEPS.md** (tento soubor) |

---

## 💡 Pro & Tips

### ✅ Doporučené praktiky:
- Přidávejte poznámky průběžně (ne vše najednou)
- Commitujte často s popisnými zprávami
- Testujte vždy lokálně před push
- Používejte konzistentní formátování
- Přidejte obrázky do `public/images/` pokud je potřeba

### ⚠️ Vyhněte se:
- Nespouštějte `npm install` zbytečně (jen při změně dependencies)
- Neměňte strukturu projektu bez důvodu
- Nezapomeňte zaregistrovat nové komponenty v ClassPage
- Necommitujte `node_modules/` (je v .gitignore)

---

## 🎓 Výsledek

Máte nyní:
- ✅ Profesionální webovou aplikaci pro poznámky
- ✅ Automatický deployment na GitHub Pages
- ✅ Mobilní přístup odkudkoliv
- ✅ Krásné a přehledné UI
- ✅ Připraveno na rozšíření během celého semestru

---

## 🆘 Potřebujete pomoc?

### Build problémy:
```bash
npm run build
# Přečtěte chybovou hlášku
```

### Git problémy:
```bash
git status  # co je změněno
git log     # historie commitů
```

### React problémy:
- Zkontrolujte konzoli v prohlížeči (F12)
- Červené chyby = problém s kódem
- Žluté varování = OK, ale upozornění

---

## 🎉 Gratulujeme!

Váš projekt je připraven. Začněte používat a přidávat poznámky!

**Happy studying! 📚✨**

---

### Rychlé odkazy:
- 📖 [React Docs](https://react.dev)
- 🎨 [Tailwind Docs](https://tailwindcss.com/docs)
- 🔀 [React Router Docs](https://reactrouter.com)
- 🚀 [Vite Docs](https://vitejs.dev)
- 📘 [GitHub Pages Docs](https://docs.github.com/en/pages)
