/**
 * Calendar Sync Service
 * Synchronizuje události mezi:
 * - App Calendar (Firebase)
 * - Notion Calendar
 * - Google Calendar
 */

const API_URL = import.meta.env.PROD 
  ? 'https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/calendarSync'
  : 'http://localhost:5001/YOUR_PROJECT_ID/us-central1/calendarSync';

async function callCalendarAPI(action, data = {}) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, data }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Calendar API call failed:', error);
    throw error;
  }
}

export const calendarSyncService = {
  // ========== NOTION CALENDAR ==========
  
  // Sync event to Notion
  async syncToNotion(event) {
    return await callCalendarAPI('syncToNotion', { event });
  },

  // Get events from Notion
  async getNotionEvents(startDate, endDate) {
    return await callCalendarAPI('getNotionEvents', { startDate, endDate });
  },

  // ========== GOOGLE CALENDAR ==========
  
  // Sync event to Google Calendar
  async syncToGoogle(event) {
    return await callCalendarAPI('syncToGoogle', { event });
  },

  // Get events from Google Calendar
  async getGoogleEvents(startDate, endDate) {
    return await callCalendarAPI('getGoogleEvents', { startDate, endDate });
  },

  // Authorize Google Calendar
  async authorizeGoogle() {
    return await callCalendarAPI('authorizeGoogle');
  },

  // ========== FULL SYNC ==========
  
  // Sync všech kalendářů najednou
  async syncAll() {
    try {
      console.log('🔄 Syncing all calendars...');
      
      const result = await callCalendarAPI('syncAll');
      
      console.log('✅ Sync completed:', result);
      return result;
    } catch (error) {
      console.error('❌ Sync failed:', error);
      throw error;
    }
  },

  // Auto-sync s intervalem
  autoSyncInterval: null,
  startAutoSync(intervalMinutes = 15) {
    if (this.autoSyncInterval) {
      clearInterval(this.autoSyncInterval);
    }

    // Sync immediately
    this.syncAll();

    // Then sync every X minutes
    this.autoSyncInterval = setInterval(() => {
      this.syncAll();
    }, intervalMinutes * 60 * 1000);

    console.log(`🔄 Auto-sync started (every ${intervalMinutes} minutes)`);
  },

  stopAutoSync() {
    if (this.autoSyncInterval) {
      clearInterval(this.autoSyncInterval);
      this.autoSyncInterval = null;
      console.log('⏸️ Auto-sync stopped');
    }
  },

  // ========== EVENT MANAGEMENT ==========
  
  // Create event in all calendars
  async createEvent(event) {
    try {
      const results = await Promise.allSettled([
        this.syncToNotion(event),
        this.syncToGoogle(event),
      ]);

      return {
        notion: results[0].status === 'fulfilled' ? results[0].value : null,
        google: results[1].status === 'fulfilled' ? results[1].value : null,
        errors: results.filter(r => r.status === 'rejected').map(r => r.reason),
      };
    } catch (error) {
      console.error('Failed to create event:', error);
      throw error;
    }
  },

  // Update event in all calendars
  async updateEvent(eventId, updates) {
    return await callCalendarAPI('updateEvent', { eventId, updates });
  },

  // Delete event from all calendars
  async deleteEvent(eventId) {
    return await callCalendarAPI('deleteEvent', { eventId });
  },

  // ========== CONFLICT RESOLUTION ==========
  
  // Resolve conflicts between calendars
  async resolveConflicts() {
    return await callCalendarAPI('resolveConflicts');
  },

  // Get sync status
  async getSyncStatus() {
    return await callCalendarAPI('getSyncStatus');
  },
};
