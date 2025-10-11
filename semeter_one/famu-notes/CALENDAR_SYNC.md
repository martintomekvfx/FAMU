# 📅 Calendar Sync - Notion + Google + App

## 🎯 Co to umí:

### **Triple Sync:**
- ✅ **App Calendar** (Firebase) ↔ **Notion Calendar** ↔ **Google Calendar**
- ✅ Vytvoř událost kdekoliv → synchronizuje se všude
- ✅ Auto-sync každých 15 minut
- ✅ Manual sync tlačítkem
- ✅ Real-time status
- ✅ Conflict resolution

## 🚀 Setup:

### **1. Notion Calendar Database:**

Vytvoř v Notion databázi "📅 FAMU Calendar" s těmito sloupci:
- **Name** (Title) - název události
- **Date** (Date) - datum a čas
- **Type** (Select) - typ: Přednáška, Deadline, Zkouška, Osobní
- **Description** (Text) - popis
- **FirebaseID** (Text) - ID pro sync

### **2. Google Calendar API:**

```bash
# 1. Jdi na Google Cloud Console
https://console.cloud.google.com/

# 2. Vytvoř nový projekt "FAMU Notes"

# 3. Zapni Google Calendar API

# 4. Vytvoř OAuth 2.0 credentials

# 5. Nastav redirect URI:
https://YOUR_PROJECT.firebaseapp.com/__/auth/handler

# 6. Zkopíruj Client ID a Client Secret
```

### **3. Firebase Config:**

```bash
firebase functions:config:set \
  notion.calendar_db_id="YOUR_NOTION_CALENDAR_DB_ID" \
  google.client_id="YOUR_GOOGLE_CLIENT_ID" \
  google.client_secret="YOUR_GOOGLE_CLIENT_SECRET" \
  google.redirect_uri="YOUR_REDIRECT_URI"
```

### **4. Deploy Functions:**

```bash
cd functions
npm install googleapis
firebase deploy --only functions
```

## 📊 Jak to funguje:

### **Scénář 1: Vytvoříš událost v App**
```
1. Vytvoříš událost v CalendarPage
2. Uloží se do Firebase
3. Auto-sync → Notion + Google
4. Všude máš stejnou událost
```

### **Scénář 2: Vytvoříš událost v Notion**
```
1. Vytvoříš page v Notion Calendar
2. Auto-sync (15 min) nebo Manual sync
3. Stáhne se do App + Google
4. Všude synchronizováno
```

### **Scénář 3: Vytvoříš událost v Google Calendar**
```
1. Vytvoříš event v Google Calendar
2. Auto-sync nebo Manual sync
3. Stáhne se do App + Notion
4. Triple sync complete
```

## 🔄 Sync Flow:

```
┌─────────────┐
│  App (FB)   │ ←→ Firebase Functions ←→ Notion API
└─────────────┘                ↕
                        Google Calendar API
```

## 💡 Použití v App:

### **CalendarPage.jsx:**

```jsx
import SyncedCalendar from '../components/SyncedCalendar';

function CalendarPage() {
  const [events, setEvents] = useState([]);

  return (
    <div>
      <SyncedCalendar
        events={events}
        onEventAdd={(event) => {/* ... */}}
        onEventUpdate={(event) => {/* ... */}}
        onEventDelete={(eventId) => {/* ... */}}
      />
      
      {/* Your existing calendar component */}
    </div>
  );
}
```

## 🎨 Features:

### **Auto-Sync:**
- Každých 15 minut
- Můžeš vypnout/zapnout
- Běží na pozadí

### **Manual Sync:**
- Tlačítko "Synchronizovat"
- Okamžitá synchronizace
- Progress indicator

### **Conflict Resolution:**
- Nejnovější verze má přednost
- Merge duplicit
- Error handling

### **Status Display:**
- 🔵 Synchronizuji...
- 🟢 Synchronizováno
- 🔴 Chyba
- ⚪ Připraveno

## 📝 API Endpoints:

### **Calendar Sync Function:**
```
https://us-central1-YOUR_PROJECT.cloudfunctions.net/calendarSync
```

### **Actions:**
- `syncToNotion` - sync event to Notion
- `syncToGoogle` - sync event to Google
- `syncAll` - full sync all calendars
- `getNotionEvents` - get events from Notion
- `getGoogleEvents` - get events from Google
- `getSyncStatus` - check sync status

## 🔐 Security:

- ✅ OAuth 2.0 pro Google Calendar
- ✅ API keys v Firebase Functions
- ✅ Token storage v Firestore
- ✅ CORS protection
- ✅ Rate limiting

## 📦 Dependencies:

```json
{
  "googleapis": "^118.0.0",
  "@google-cloud/firestore": "^6.8.0",
  "@notionhq/client": "^2.2.15"
}
```

## 🎯 Notion Database Template:

```
📅 FAMU Calendar
├── Columns:
│   ├── Name (Title)
│   ├── Date (Date)
│   ├── Type (Select): Přednáška, Deadline, Zkouška, Osobní
│   ├── Description (Text)
│   └── FirebaseID (Text)
├── Views:
│   ├── Calendar View (default)
│   ├── Timeline View
│   ├── Table View
│   └── This Week (filtered)
└── Filters:
    ├── This Month
    ├── Upcoming
    └── By Type
```

## 🚀 Quick Start:

### **1. Setup Notion:**
```bash
# Vytvoř databázi v Notion
# Připoj integraci "FAMU Notes Sync"
# Zkopíruj Database ID
```

### **2. Setup Google:**
```bash
# Google Cloud Console
# Zapni Calendar API
# Vytvoř OAuth credentials
# Zkopíruj Client ID + Secret
```

### **3. Configure Firebase:**
```bash
firebase functions:config:set \
  notion.calendar_db_id="YOUR_DB_ID" \
  google.client_id="YOUR_CLIENT_ID" \
  google.client_secret="YOUR_SECRET"
```

### **4. Deploy:**
```bash
firebase deploy --only functions
```

### **5. Use in App:**
```jsx
<SyncedCalendar events={events} />
```

## 💡 Tips:

### **Rychlá synchronizace:**
- Klikni "Synchronizovat" po vytvoření události
- Nebo počkej 15 minut na auto-sync

### **Offline mode:**
- Vypni auto-sync
- Vytvárej události offline
- Zapni sync a klikni "Synchronizovat"

### **Duplicity:**
- Systém automaticky detekuje duplicity
- Merge podle názvu + času
- Nejnovější verze má přednost

## 🐛 Troubleshooting:

### **"Google Calendar not authorized":**
```bash
# Authorize Google Calendar
# Jdi do App → Settings → Connect Google Calendar
# Nebo použij OAuth flow
```

### **"Notion database not found":**
```bash
# Zkontroluj Database ID
# Připoj integraci k databázi
# Zkontroluj permissions
```

### **"Sync failed":**
```bash
# Zkontroluj Firebase Functions logs
firebase functions:log
# Zkontroluj API keys
firebase functions:config:get
```

## 🎉 Hotovo!

Teď máš **triple calendar sync**:
- 📱 App Calendar
- 📝 Notion Calendar  
- 📅 Google Calendar

**Všechno synchronizované, všude dostupné!** 🚀
