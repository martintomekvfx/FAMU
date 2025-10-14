// Notion API service via Firebase Functions
const API_URL = import.meta.env.PROD 
  ? 'https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/notionSync'
  : 'http://localhost:5001/YOUR_PROJECT_ID/us-central1/notionSync';

async function callNotionAPI(action, data = {}) {
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
    console.error('Notion API call failed:', error);
    throw error;
  }
}

// Cache pro Notion data
let notionCache = {};
let cacheTimestamp = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minut

export const notionService = {
  // Create a new subject page in Notion
  async createSubjectPage(subject) {
    return await callNotionAPI('createSubjectPage', {
      subjectId: subject.id,
      name: subject.name,
      code: subject.id.toUpperCase(),
      color: subject.color,
    });
  },

  // Create a class page under a subject
  async createClassPage(parentPageId, classData) {
    return await callNotionAPI('createClassPage', {
      parentPageId,
      classNumber: classData.number,
      title: classData.title,
      content: classData.content || '',
    });
  },

  // Sync notes to existing page
  async syncNotes(pageId, content) {
    return await callNotionAPI('syncNotes', {
      pageId,
      content,
    });
  },

  // Get all subjects from Notion
  async getSubjects() {
    return await callNotionAPI('getSubjects');
  },

  // Sync all subjects to Notion
  async syncAllSubjects(subjects) {
    const results = [];
    for (const subject of subjects) {
      try {
        const result = await this.createSubjectPage(subject);
        results.push({ subject: subject.name, success: true, pageId: result.pageId });
      } catch (error) {
        results.push({ subject: subject.name, success: false, error: error.message });
      }
    }
    return results;
  },

  // ========== NOVÉ FUNKCE PRO PLNOU INTEGRACI ==========

  // Uložit poznámky do Notion
  async saveNotesToNotion(subjectId, classNumber, content) {
    const cacheKey = `${subjectId}-${classNumber}`;
    
    try {
      const result = await callNotionAPI('saveNotes', {
        subjectId,
        classNumber,
        content,
        timestamp: new Date().toISOString(),
      });
      
      // Invalidate cache
      delete notionCache[cacheKey];
      delete cacheTimestamp[cacheKey];
      
      return result;
    } catch (error) {
      console.error('Failed to save notes to Notion:', error);
      throw error;
    }
  },

  // Načíst poznámky z Notion
  async loadNotesFromNotion(subjectId, classNumber) {
    const cacheKey = `${subjectId}-${classNumber}`;
    const now = Date.now();
    
    // Check cache
    if (notionCache[cacheKey] && (now - cacheTimestamp[cacheKey]) < CACHE_DURATION) {
      console.log('📦 Loading from cache:', cacheKey);
      return notionCache[cacheKey];
    }
    
    try {
      const result = await callNotionAPI('loadNotes', {
        subjectId,
        classNumber,
      });
      
      // Update cache
      notionCache[cacheKey] = result;
      cacheTimestamp[cacheKey] = now;
      
      return result;
    } catch (error) {
      console.error('Failed to load notes from Notion:', error);
      return null; // Fallback to local content
    }
  },

  // Auto-save s debounce
  autoSaveTimer: null,
  async autoSaveNotes(subjectId, classNumber, content, delay = 2000) {
    clearTimeout(this.autoSaveTimer);
    
    this.autoSaveTimer = setTimeout(async () => {
      try {
        await this.saveNotesToNotion(subjectId, classNumber, content);
        console.log('✅ Auto-saved to Notion');
      } catch (error) {
        console.error('❌ Auto-save failed:', error);
      }
    }, delay);
  },

  // Sync status check
  async checkSyncStatus(subjectId, classNumber) {
    try {
      const result = await callNotionAPI('checkSync', {
        subjectId,
        classNumber,
      });
      return result;
    } catch (error) {
      return { synced: false, error: error.message };
    }
  },

  // Clear cache
  clearCache() {
    notionCache = {};
    cacheTimestamp = {};
  },
};
