import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Plus, X, Edit2, Trash2 } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import SyncedCalendar from '../components/SyncedCalendar';
import { calendarSyncService } from '../services/calendarSyncService';

function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
    type: 'deadline',
  });

  const eventTypes = {
    deadline: { label: 'Deadline', color: 'bg-red-500' },
    exam: { label: 'Zkouška', color: 'bg-orange-500' },
    consultation: { label: 'Konzultace', color: 'bg-blue-500' },
    other: { label: 'Ostatní', color: 'bg-gray-500' },
  };

  // Real-time listener pro události
  useEffect(() => {
    const eventsRef = collection(db, 'calendarEvents');
    const q = query(eventsRef, orderBy('date', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const evts = [];
      snapshot.forEach((doc) => {
        evts.push({ id: doc.id, ...doc.data() });
      });
      setEvents(evts);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const eventData = {
        ...formData,
        start: `${formData.date}T${formData.time || '00:00'}:00`,
        end: `${formData.date}T${formData.time ? `${parseInt(formData.time.split(':')[0]) + 1}:${formData.time.split(':')[1]}` : '01:00'}:00`,
      };

      if (editingEvent) {
        await updateDoc(doc(db, 'calendarEvents', editingEvent.id), {
          ...formData,
          updatedAt: serverTimestamp(),
        });
        
        // Update in Notion + Google
        try {
          await calendarSyncService.updateEvent(editingEvent.id, formData);
        } catch (syncError) {
          console.log('Sync update failed (will sync later):', syncError);
        }
      } else {
        const docRef = await addDoc(collection(db, 'calendarEvents'), {
          ...formData,
          createdAt: serverTimestamp(),
        });
        
        // Sync to Notion + Google
        try {
          await calendarSyncService.createEvent({
            id: docRef.id,
            ...eventData,
          });
          console.log('✅ Event synced to Notion + Google');
        } catch (syncError) {
          console.log('Sync failed (will retry on next auto-sync):', syncError);
        }
      }
      
      setFormData({
        title: '',
        date: '',
        time: '',
        description: '',
        type: 'deadline',
      });
      setIsModalOpen(false);
      setEditingEvent(null);
    } catch (error) {
      console.error('Chyba při ukládání události:', error);
      alert('Nepodařilo se uložit událost.');
    }
  };

  const handleDelete = async (eventId) => {
    if (window.confirm('Opravdu chceš smazat tuto událost?')) {
      try {
        await deleteDoc(doc(db, 'calendarEvents', eventId));
        
        // Delete from Notion + Google
        try {
          await calendarSyncService.deleteEvent(eventId);
          console.log('✅ Event deleted from Notion + Google');
        } catch (syncError) {
          console.log('Sync delete failed (will clean up on next auto-sync):', syncError);
        }
      } catch (error) {
        console.error('Chyba při mazání události:', error);
      }
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time || '',
      description: event.description || '',
      type: event.type,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
    setFormData({
      title: '',
      date: '',
      time: '',
      description: '',
      type: 'deadline',
    });
  };

  const groupEventsByDate = () => {
    const grouped = {};
    events.forEach((event) => {
      if (!grouped[event.date]) {
        grouped[event.date] = [];
      }
      grouped[event.date].push(event);
    });
    return grouped;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('cs-CZ', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const groupedEvents = groupEventsByDate();
  const sortedDates = Object.keys(groupedEvents).sort();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <CalendarIcon className="w-10 h-10" />
              <div>
                <h1 className="text-3xl font-bold">📅 Kalendář & Události</h1>
                <p className="text-gray-200 text-sm">Deadlines, zkoušky a další události</p>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Přidat událost
            </button>
          </div>
        </div>
      </header>

      {/* Notion Calendar Embed */}
      <div className="w-full h-[calc(100vh-200px)] bg-white">
        <iframe
          src="https://axiomatic-range-b04.notion.site/ebd/2892f121ab5f80c486c4f603df4dcc24"
          className="w-full h-full border-0"
          allowFullScreen
          title="Notion Calendar"
        />
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 hidden">
        {events.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-lg border-2 border-gray-900">
            <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Žádné události</h3>
            <p className="text-gray-600 mb-4">Začni přidáním první události</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Přidat první událost
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedDates.map((date) => (
              <div key={date} className="bg-white rounded-lg shadow-md border-2 border-gray-900 overflow-hidden">
                <div className="bg-gray-100 px-6 py-4 border-b-2 border-gray-900">
                  <h3 className="font-bold text-gray-900">{formatDate(date)}</h3>
                </div>
                <div className="p-6 space-y-4">
                  {groupedEvents[date].map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start gap-4 p-4 rounded-lg border-2 border-gray-300 hover:border-gray-900 transition-colors"
                    >
                      <div className={`w-3 h-3 rounded-full ${eventTypes[event.type].color} mt-1.5`}></div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1">{event.title}</h4>
                            <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                              <span className="font-medium">{eventTypes[event.type].label}</span>
                              {event.time && <span>• {event.time}</span>}
                            </div>
                            {event.description && (
                              <p className="text-sm text-gray-700">{event.description}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEdit(event)}
                              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(event.id)}
                              className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {editingEvent ? 'Upravit událost' : 'Nová událost'}
              </h2>
              <button
                onClick={closeModal}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Název události *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="např. Odevzdání projektu"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Datum *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Čas
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Typ události *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  required
                >
                  {Object.entries(eventTypes).map(([key, { label }]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Popis
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                  rows="3"
                  placeholder="Doplňující informace..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Zrušit
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  {editingEvent ? 'Uložit' : 'Přidat'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarPage;
