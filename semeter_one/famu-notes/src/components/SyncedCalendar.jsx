import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, RefreshCw, Check, AlertCircle, Cloud } from 'lucide-react';
import { calendarSyncService } from '../services/calendarSyncService';

function SyncedCalendar({ events, onEventAdd, onEventUpdate, onEventDelete }) {
  const [syncStatus, setSyncStatus] = useState('idle');
  const [lastSync, setLastSync] = useState(null);
  const [autoSync, setAutoSync] = useState(true);
  const [notionEvents, setNotionEvents] = useState([]);
  const [googleEvents, setGoogleEvents] = useState([]);

  // Start auto-sync on mount
  useEffect(() => {
    if (autoSync) {
      calendarSyncService.startAutoSync(15); // Every 15 minutes
      handleSync();
    }

    return () => {
      calendarSyncService.stopAutoSync();
    };
  }, [autoSync]);

  const handleSync = async () => {
    try {
      setSyncStatus('syncing');
      
      const result = await calendarSyncService.syncAll();
      
      setSyncStatus('success');
      setLastSync(new Date());
      
      // Load events from all sources
      await loadAllEvents();
      
      setTimeout(() => setSyncStatus('idle'), 3000);
    } catch (error) {
      console.error('Sync failed:', error);
      setSyncStatus('error');
      setTimeout(() => setSyncStatus('idle'), 5000);
    }
  };

  const loadAllEvents = async () => {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const endDate = new Date(now.getFullYear(), now.getMonth() + 3, 0).toISOString();

    try {
      const [notion, google] = await Promise.allSettled([
        calendarSyncService.getNotionEvents(startDate, endDate),
        calendarSyncService.getGoogleEvents(startDate, endDate),
      ]);

      if (notion.status === 'fulfilled') {
        setNotionEvents(notion.value.events || []);
      }
      if (google.status === 'fulfilled') {
        setGoogleEvents(google.value.events || []);
      }
    } catch (error) {
      console.error('Failed to load events:', error);
    }
  };

  const getSyncIcon = () => {
    switch (syncStatus) {
      case 'syncing':
        return <RefreshCw className="w-5 h-5 animate-spin" />;
      case 'success':
        return <Check className="w-5 h-5" />;
      case 'error':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Cloud className="w-5 h-5" />;
    }
  };

  const getSyncColor = () => {
    switch (syncStatus) {
      case 'syncing':
        return 'bg-blue-600';
      case 'success':
        return 'bg-green-600';
      case 'error':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="synced-calendar">
      {/* Sync Status Bar */}
      <div className="bg-white border-b-2 border-gray-200 p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CalendarIcon className="w-6 h-6 text-gray-900" />
            <h2 className="text-xl font-bold text-gray-900">Kalendář</h2>
            
            {/* Sync Status */}
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-white text-sm ${getSyncColor()}`}>
              {getSyncIcon()}
              <span>
                {syncStatus === 'syncing' && 'Synchronizuji...'}
                {syncStatus === 'success' && 'Synchronizováno'}
                {syncStatus === 'error' && 'Chyba'}
                {syncStatus === 'idle' && lastSync && `Naposledy: ${lastSync.toLocaleTimeString()}`}
                {syncStatus === 'idle' && !lastSync && 'Připraveno'}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleSync}
              disabled={syncStatus === 'syncing'}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400 transition-colors flex items-center gap-2 font-medium"
            >
              <RefreshCw className={`w-4 h-4 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
              Synchronizovat
            </button>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={autoSync}
                onChange={(e) => setAutoSync(e.target.checked)}
                className="rounded"
              />
              <span className="text-gray-700">Auto-sync (15 min)</span>
            </label>
          </div>
        </div>

        {/* Sync Info */}
        {autoSync && (
          <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>Notion: {notionEvents.length} událostí</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Google: {googleEvents.length} událostí</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>App: {events?.length || 0} událostí</span>
            </div>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="p-6">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">🔄 Synchronizace kalendářů</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>✅ <strong>Notion Calendar</strong> - Všechny události se automaticky ukládají do Notion</p>
            <p>✅ <strong>Google Calendar</strong> - Propojení s tvým Google kalendářem</p>
            <p>✅ <strong>App Calendar</strong> - Lokální události v aplikaci</p>
            <p className="mt-4 text-blue-700">
              💡 <strong>Tip:</strong> Vytvoř událost kdekoliv a automaticky se synchronizuje všude!
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
            <div className="text-2xl font-bold text-blue-600">{notionEvents.length}</div>
            <div className="text-sm text-gray-600">Notion události</div>
          </div>
          <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
            <div className="text-2xl font-bold text-red-600">{googleEvents.length}</div>
            <div className="text-sm text-gray-600">Google události</div>
          </div>
          <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
            <div className="text-2xl font-bold text-green-600">{events?.length || 0}</div>
            <div className="text-sm text-gray-600">App události</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SyncedCalendar;
