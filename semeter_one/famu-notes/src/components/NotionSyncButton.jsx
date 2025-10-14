import { useState } from 'react';
import { Upload, Check, AlertCircle, Loader } from 'lucide-react';
import { notionService } from '../services/notionService';

function NotionSyncButton({ subject, classData, onSuccess }) {
  const [syncing, setSyncing] = useState(false);
  const [status, setStatus] = useState(null); // 'success', 'error', null

  const handleSync = async () => {
    setSyncing(true);
    setStatus(null);

    try {
      // First, try to create/get subject page
      const subjectResult = await notionService.createSubjectPage(subject);
      
      // If we have class data, create class page
      if (classData) {
        await notionService.createClassPage(subjectResult.pageId, classData);
      }

      setStatus('success');
      if (onSuccess) onSuccess();

      // Reset status after 3 seconds
      setTimeout(() => setStatus(null), 3000);
    } catch (error) {
      console.error('Sync error:', error);
      setStatus('error');
      setTimeout(() => setStatus(null), 5000);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <button
      onClick={handleSync}
      disabled={syncing}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all
        ${syncing ? 'bg-gray-400 cursor-not-allowed' : 
          status === 'success' ? 'bg-green-600 hover:bg-green-700' :
          status === 'error' ? 'bg-red-600 hover:bg-red-700' :
          'bg-black hover:bg-gray-800'
        }
        text-white shadow-lg hover:shadow-xl
      `}
    >
      {syncing ? (
        <>
          <Loader className="w-5 h-5 animate-spin" />
          <span>Synchronizace...</span>
        </>
      ) : status === 'success' ? (
        <>
          <Check className="w-5 h-5" />
          <span>Synchronizováno!</span>
        </>
      ) : status === 'error' ? (
        <>
          <AlertCircle className="w-5 h-5" />
          <span>Chyba</span>
        </>
      ) : (
        <>
          <Upload className="w-5 h-5" />
          <span>Sync do Notion</span>
        </>
      )}
    </button>
  );
}

export default NotionSyncButton;
