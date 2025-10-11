import { useState, useEffect } from 'react';
import { Save, Cloud, CloudOff, RefreshCw } from 'lucide-react';
import { notionService } from '../services/notionService';

function NotionEditor({ subjectId, classNumber, initialContent, onSave }) {
  const [content, setContent] = useState(initialContent || '');
  const [syncStatus, setSyncStatus] = useState('idle'); // idle, saving, saved, error
  const [lastSaved, setLastSaved] = useState(null);
  const [notionEnabled, setNotionEnabled] = useState(true);

  // Load from Notion on mount
  useEffect(() => {
    if (notionEnabled) {
      loadFromNotion();
    }
  }, [subjectId, classNumber, notionEnabled]);

  // Auto-save when content changes
  useEffect(() => {
    if (content && content !== initialContent && notionEnabled) {
      handleAutoSave();
    }
  }, [content]);

  const loadFromNotion = async () => {
    try {
      setSyncStatus('loading');
      const result = await notionService.loadNotesFromNotion(subjectId, classNumber);
      
      if (result && result.content) {
        setContent(result.content);
        setSyncStatus('saved');
      } else {
        // Fallback to initial content
        setContent(initialContent || '');
        setSyncStatus('idle');
      }
    } catch (error) {
      console.error('Failed to load from Notion:', error);
      setContent(initialContent || '');
      setSyncStatus('error');
    }
  };

  const handleAutoSave = () => {
    setSyncStatus('saving');
    notionService.autoSaveNotes(subjectId, classNumber, content, 2000);
    
    // Update status after delay
    setTimeout(() => {
      setSyncStatus('saved');
      setLastSaved(new Date());
    }, 2500);
  };

  const handleManualSave = async () => {
    try {
      setSyncStatus('saving');
      await notionService.saveNotesToNotion(subjectId, classNumber, content);
      setSyncStatus('saved');
      setLastSaved(new Date());
      if (onSave) onSave(content);
    } catch (error) {
      console.error('Save failed:', error);
      setSyncStatus('error');
    }
  };

  const handleRefresh = async () => {
    await loadFromNotion();
  };

  const getSyncIcon = () => {
    switch (syncStatus) {
      case 'saving':
        return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'saved':
        return <Cloud className="w-4 h-4" />;
      case 'error':
        return <CloudOff className="w-4 h-4" />;
      default:
        return <Save className="w-4 h-4" />;
    }
  };

  const getSyncColor = () => {
    switch (syncStatus) {
      case 'saving':
        return 'text-blue-600';
      case 'saved':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="notion-editor">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 bg-white border-b-2 border-gray-200 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <h3 className="font-bold text-gray-900">
            {subjectId.toUpperCase()} - Hodina {classNumber}
          </h3>
          
          {/* Sync Status */}
          <div className={`flex items-center gap-2 text-sm ${getSyncColor()}`}>
            {getSyncIcon()}
            <span>
              {syncStatus === 'saving' && 'Ukládám...'}
              {syncStatus === 'saved' && `Uloženo ${lastSaved ? new Date(lastSaved).toLocaleTimeString() : ''}`}
              {syncStatus === 'error' && 'Chyba při ukládání'}
              {syncStatus === 'idle' && 'Připraveno'}
              {syncStatus === 'loading' && 'Načítám...'}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
            title="Načíst z Notion"
          >
            <RefreshCw className="w-4 h-4" />
            Obnovit
          </button>

          <button
            onClick={handleManualSave}
            disabled={syncStatus === 'saving'}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400 transition-colors flex items-center gap-2 font-medium"
          >
            <Save className="w-4 h-4" />
            Uložit do Notion
          </button>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={notionEnabled}
              onChange={(e) => setNotionEnabled(e.target.checked)}
              className="rounded"
            />
            <span className="text-gray-700">Auto-sync</span>
          </label>
        </div>
      </div>

      {/* Editor */}
      <div className="p-6">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full min-h-[600px] p-4 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none font-mono text-sm resize-y"
          placeholder="Začni psát poznámky... Automaticky se uloží do Notion."
        />
      </div>

      {/* Info */}
      {notionEnabled && (
        <div className="px-6 pb-6">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-900">
              <strong>💡 Notion Sync je aktivní!</strong> Tvé poznámky se automaticky ukládají do Notion každé 2 sekundy.
              Můžeš je editovat i v Notion a kliknutím na "Obnovit" je načteš zpět.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotionEditor;
