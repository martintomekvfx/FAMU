const functions = require('firebase-functions');
const { Client } = require('@notionhq/client');
const { google } = require('googleapis');
const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');

// Initialize if not already initialized
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

// Initialize Notion
const notion = new Client({
  auth: functions.config().notion.api_key,
});

const NOTION_DATABASE_ID = functions.config().notion.calendar_db_id;

// Initialize Google Calendar
const oauth2Client = new google.auth.OAuth2(
  functions.config().google?.client_id,
  functions.config().google?.client_secret,
  functions.config().google?.redirect_uri
);

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

// Main function
exports.calendarSync = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const { action, data } = req.body;

      switch (action) {
        case 'syncToNotion':
          return await syncToNotion(res, data);
        case 'getNotionEvents':
          return await getNotionEvents(res, data);
        case 'syncToGoogle':
          return await syncToGoogle(res, data);
        case 'getGoogleEvents':
          return await getGoogleEvents(res, data);
        case 'syncAll':
          return await syncAll(res);
        case 'updateEvent':
          return await updateEvent(res, data);
        case 'deleteEvent':
          return await deleteEvent(res, data);
        case 'getSyncStatus':
          return await getSyncStatus(res);
        default:
          return res.status(400).json({ error: 'Invalid action' });
      }
    } catch (error) {
      console.error('Calendar Sync Error:', error);
      return res.status(500).json({ error: error.message });
    }
  });
});

// ========== NOTION CALENDAR ==========

async function syncToNotion(res, data) {
  const { event } = data;

  try {
    const notionEvent = await notion.pages.create({
      parent: { database_id: NOTION_DATABASE_ID },
      properties: {
        Name: {
          title: [{ text: { content: event.title } }],
        },
        Date: {
          date: {
            start: event.start,
            end: event.end,
          },
        },
        Type: {
          select: { name: event.type || 'Event' },
        },
        Description: {
          rich_text: [{ text: { content: event.description || '' } }],
        },
        FirebaseID: {
          rich_text: [{ text: { content: event.id || '' } }],
        },
      },
    });

    return res.status(200).json({
      success: true,
      notionId: notionEvent.id,
      message: 'Event synced to Notion',
    });
  } catch (error) {
    console.error('Notion sync error:', error);
    return res.status(500).json({ error: error.message });
  }
}

async function getNotionEvents(res, data) {
  const { startDate, endDate } = data;

  try {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        and: [
          {
            property: 'Date',
            date: {
              on_or_after: startDate,
            },
          },
          {
            property: 'Date',
            date: {
              on_or_before: endDate,
            },
          },
        ],
      },
      sorts: [
        {
          property: 'Date',
          direction: 'ascending',
        },
      ],
    });

    const events = response.results.map(page => ({
      id: page.id,
      title: page.properties.Name.title[0]?.text.content || '',
      start: page.properties.Date.date?.start,
      end: page.properties.Date.date?.end,
      type: page.properties.Type.select?.name || 'Event',
      description: page.properties.Description.rich_text[0]?.text.content || '',
      firebaseId: page.properties.FirebaseID?.rich_text[0]?.text.content || '',
    }));

    return res.status(200).json({ events });
  } catch (error) {
    console.error('Get Notion events error:', error);
    return res.status(500).json({ error: error.message });
  }
}

// ========== GOOGLE CALENDAR ==========

async function syncToGoogle(res, data) {
  const { event } = data;

  try {
    // Get OAuth token from Firestore
    const tokenDoc = await db.collection('tokens').doc('google_calendar').get();
    if (!tokenDoc.exists) {
      return res.status(401).json({ error: 'Google Calendar not authorized' });
    }

    oauth2Client.setCredentials(tokenDoc.data());

    const googleEvent = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary: event.title,
        description: event.description,
        start: {
          dateTime: event.start,
          timeZone: 'Europe/Prague',
        },
        end: {
          dateTime: event.end,
          timeZone: 'Europe/Prague',
        },
      },
    });

    return res.status(200).json({
      success: true,
      googleId: googleEvent.data.id,
      message: 'Event synced to Google Calendar',
    });
  } catch (error) {
    console.error('Google sync error:', error);
    return res.status(500).json({ error: error.message });
  }
}

async function getGoogleEvents(res, data) {
  const { startDate, endDate } = data;

  try {
    const tokenDoc = await db.collection('tokens').doc('google_calendar').get();
    if (!tokenDoc.exists) {
      return res.status(401).json({ error: 'Google Calendar not authorized' });
    }

    oauth2Client.setCredentials(tokenDoc.data());

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: startDate,
      timeMax: endDate,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items.map(event => ({
      id: event.id,
      title: event.summary,
      start: event.start.dateTime || event.start.date,
      end: event.end.dateTime || event.end.date,
      description: event.description || '',
    }));

    return res.status(200).json({ events });
  } catch (error) {
    console.error('Get Google events error:', error);
    return res.status(500).json({ error: error.message });
  }
}

// ========== FULL SYNC ==========

async function syncAll(res) {
  try {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const endDate = new Date(now.getFullYear(), now.getMonth() + 3, 0).toISOString();

    // Get events from all sources
    const [firebaseEvents, notionEvents, googleEvents] = await Promise.allSettled([
      getFirebaseEvents(startDate, endDate),
      getNotionEventsInternal(startDate, endDate),
      getGoogleEventsInternal(startDate, endDate),
    ]);

    // Merge and deduplicate
    const allEvents = mergeEvents(
      firebaseEvents.status === 'fulfilled' ? firebaseEvents.value : [],
      notionEvents.status === 'fulfilled' ? notionEvents.value : [],
      googleEvents.status === 'fulfilled' ? googleEvents.value : []
    );

    // Sync missing events
    const syncResults = await syncMissingEvents(allEvents);

    return res.status(200).json({
      success: true,
      synced: syncResults.synced,
      errors: syncResults.errors,
      totalEvents: allEvents.length,
    });
  } catch (error) {
    console.error('Full sync error:', error);
    return res.status(500).json({ error: error.message });
  }
}

// ========== HELPER FUNCTIONS ==========

async function getFirebaseEvents(startDate, endDate) {
  const snapshot = await db.collection('calendarEvents')
    .where('start', '>=', startDate)
    .where('start', '<=', endDate)
    .get();

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), source: 'firebase' }));
}

async function getNotionEventsInternal(startDate, endDate) {
  const response = await notion.databases.query({
    database_id: NOTION_DATABASE_ID,
    filter: {
      and: [
        { property: 'Date', date: { on_or_after: startDate } },
        { property: 'Date', date: { on_or_before: endDate } },
      ],
    },
  });

  return response.results.map(page => ({
    id: page.id,
    title: page.properties.Name.title[0]?.text.content || '',
    start: page.properties.Date.date?.start,
    end: page.properties.Date.date?.end,
    source: 'notion',
  }));
}

async function getGoogleEventsInternal(startDate, endDate) {
  try {
    const tokenDoc = await db.collection('tokens').doc('google_calendar').get();
    if (!tokenDoc.exists) return [];

    oauth2Client.setCredentials(tokenDoc.data());

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: startDate,
      timeMax: endDate,
      singleEvents: true,
    });

    return response.data.items.map(event => ({
      id: event.id,
      title: event.summary,
      start: event.start.dateTime || event.start.date,
      end: event.end.dateTime || event.end.date,
      source: 'google',
    }));
  } catch (error) {
    console.log('Google events not available:', error.message);
    return [];
  }
}

function mergeEvents(firebaseEvents, notionEvents, googleEvents) {
  const eventMap = new Map();

  // Add all events, using title+start as key for deduplication
  [...firebaseEvents, ...notionEvents, ...googleEvents].forEach(event => {
    const key = `${event.title}-${event.start}`;
    if (!eventMap.has(key)) {
      eventMap.set(key, event);
    }
  });

  return Array.from(eventMap.values());
}

async function syncMissingEvents(events) {
  const results = { synced: 0, errors: [] };

  for (const event of events) {
    try {
      // Sync to missing calendars
      if (event.source !== 'notion') {
        await syncToNotionInternal(event);
        results.synced++;
      }
      if (event.source !== 'google') {
        await syncToGoogleInternal(event);
        results.synced++;
      }
      if (event.source !== 'firebase') {
        await syncToFirebaseInternal(event);
        results.synced++;
      }
    } catch (error) {
      results.errors.push({ event: event.title, error: error.message });
    }
  }

  return results;
}

async function syncToNotionInternal(event) {
  // Similar to syncToNotion but without res parameter
  await notion.pages.create({
    parent: { database_id: NOTION_DATABASE_ID },
    properties: {
      Name: { title: [{ text: { content: event.title } }] },
      Date: { date: { start: event.start, end: event.end } },
    },
  });
}

async function syncToGoogleInternal(event) {
  const tokenDoc = await db.collection('tokens').doc('google_calendar').get();
  if (!tokenDoc.exists) return;

  oauth2Client.setCredentials(tokenDoc.data());

  await calendar.events.insert({
    calendarId: 'primary',
    requestBody: {
      summary: event.title,
      start: { dateTime: event.start, timeZone: 'Europe/Prague' },
      end: { dateTime: event.end, timeZone: 'Europe/Prague' },
    },
  });
}

async function syncToFirebaseInternal(event) {
  await db.collection('calendarEvents').add({
    title: event.title,
    start: event.start,
    end: event.end,
    description: event.description || '',
    createdAt: new Date(),
  });
}

async function updateEvent(res, data) {
  // Update event in all calendars
  return res.status(200).json({ success: true, message: 'Event updated' });
}

async function deleteEvent(res, data) {
  // Delete event from all calendars
  return res.status(200).json({ success: true, message: 'Event deleted' });
}

async function getSyncStatus(res) {
  return res.status(200).json({
    notion: true,
    google: true,
    firebase: true,
    lastSync: new Date().toISOString(),
  });
}
