# 🔥 Firebase Setup Guide

## Krok 1: Vytvoř Firebase projekt

1. Jdi na https://console.firebase.google.com/
2. Klikni na **"Add project"** (Přidat projekt)
3. Pojmenuj projekt (např. "FAMU Notes")
4. Pokračuj podle průvodce (Google Analytics je optional)

## Krok 2: Přidej Web App

1. V Firebase Console klikni na **ikonu webu** `</>`
2. Pojmenuj app (např. "FAMU Notes Web")
3. **Nezaškrtávej** "Also set up Firebase Hosting"
4. Klikni na **"Register app"**

## Krok 3: Zkopíruj konfiguraci

Firebase ti ukáže konfiguraci, vypadá takto:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

**ZKOPÍRUJ TYTO HODNOTY!**

## Krok 4: Nastav Firestore Database

1. V levém menu klikni na **"Firestore Database"**
2. Klikni na **"Create database"**
3. Vyber **"Start in test mode"** (pro vývoj)
4. Vyber lokaci (např. `europe-west3` pro EU)
5. Klikni na **"Enable"**

⚠️ **Test mode pravidla (platí 30 dní):**
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2025, 12, 31);
    }
  }
}
```

## Krok 5: Nahraď konfiguraci v projektu

Otevři soubor: `src/firebase.js`

Nahraď placeholder hodnoty svými z Firebase Console:

```javascript
const firebaseConfig = {
  apiKey: "TVOJE_API_KEY_ZDE",
  authDomain: "tvuj-projekt.firebaseapp.com",
  projectId: "tvuj-projekt",
  storageBucket: "tvuj-projekt.appspot.com",
  messagingSenderId: "TVOJE_ID",
  appId: "TVOJE_APP_ID"
};
```

## Krok 6: Testuj

1. `npm run dev`
2. Jdi na http://localhost:5173/my-notes
3. Začni psát - poznámky se automaticky ukládají do Firebase!
4. Otevři Firebase Console → Firestore Database a uvidíš dokument `notes/user-notes`

## 🎉 Hotovo!

Teď máš poznámky synchronizované v cloudu! 

### Bonus tipy:

- **Produkční pravidla:** Po vývoji nastav bezpečnější pravidla v Firestore Rules
- **Autentifikace:** Pro více uživatelů přidej Firebase Authentication
- **Quota:** Free tier má 1GB storage, 50K reads/day, 20K writes/day (stačí!)

## 💬 Firestore Rules pro všechny funkce

Pro fungování chatu, kalendáře, poznámek, nástěnky, mind map a deadlines přidej do Firestore Rules všechny kolekce:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Povolit přístup k poznámkám
    match /notes/{document=**} {
      allow read, write: if true;
    }
    
    // Povolit přístup k chat zprávám
    match /messages/{message} {
      allow read, write: if true;
    }
    
    // Povolit přístup k online users (presence)
    match /onlineUsers/{user} {
      allow read, write: if true;
    }
    
    // Povolit přístup ke kalendáři
    match /calendarEvents/{event} {
      allow read, write: if true;
    }
    
    // Povolit přístup k nástěnce (sticky notes)
    match /stickyNotes/{document=**} {
      allow read, write: if true;
    }
    
    // Povolit přístup k mind maps (pozice nodů a custom nody)
    match /mindMaps/{document=**} {
      allow read, write: if true;
    }
    
    // Povolit přístup k deadlines (úkoly a termíny)
    match /deadlines/{deadline} {
      allow read, write: if true;
    }
  }
}
```

## 🔒 Bezpečnost

- API klíč není tajný (je safe pro frontend)
- Firestore Rules chrání data
- Pro produkci doporuč přidat autentifikaci
