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
};
