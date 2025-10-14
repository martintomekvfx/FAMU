import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Save, X, FileText, Clock } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';

function NoteTaker() {
  const [notes, setNotes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  // Real-time listener for notes
  useEffect(() => {
    const notesRef = collection(db, 'quickNotes');
    const q = query(notesRef, orderBy('updatedAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notesList = [];
      snapshot.forEach((doc) => {
        notesList.push({ id: doc.id, ...doc.data() });
      });
      setNotes(notesList);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Zadej název poznámky');
      return;
    }

    try {
      if (currentNote) {
        // Update existing note
        await updateDoc(doc(db, 'quickNotes', currentNote.id), {
          title: formData.title,
          content: formData.content,
          updatedAt: serverTimestamp(),
        });
      } else {
        // Create new note
        await addDoc(collection(db, 'quickNotes'), {
          title: formData.title,
          content: formData.content,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
      
      // Reset form
      setFormData({ title: '', content: '' });
      setIsEditing(false);
      setCurrentNote(null);
    } catch (error) {
      console.error('Error saving note:', error);
      alert('Nepodařilo se uložit poznámku');
    }
  };

  const handleEdit = (note) => {
    setCurrentNote(note);
    setFormData({
      title: note.title,
      content: note.content || '',
    });
    setIsEditing(true);
  };

  const handleDelete = async (noteId) => {
    if (window.confirm('Opravdu chceš smazat tuto poznámku?')) {
      try {
        await deleteDoc(doc(db, 'quickNotes', noteId));
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  const handleCancel = () => {
    setFormData({ title: '', content: '' });
    setIsEditing(false);
    setCurrentNote(null);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleString('cs-CZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <FileText className="w-10 h-10" />
            <div>
              <h2 className="text-2xl font-bold">Moje poznámky</h2>
              <p className="text-purple-100 text-sm">Cloud-based poznámkový blok - přístupný odkudkoliv</p>
            </div>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Nová poznámka
            </button>
          )}
        </div>
      </div>

      {/* Editor */}
      {isEditing && (
        <div className="bg-white rounded-xl shadow-xl border-2 border-purple-500 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">
              {currentNote ? 'Editovat poznámku' : 'Nová poznámka'}
            </h3>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Název
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg font-semibold"
                placeholder="Název poznámky..."
                autoFocus
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Obsah
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none resize-none font-mono text-sm"
                rows="12"
                placeholder="Piš sem své poznámky...&#10;&#10;Můžeš sem psát cokoliv:&#10;• Nápady&#10;• To-do listy&#10;• Poznámky z hodin&#10;• Důležité informace&#10;• A cokoliv dalšího!"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                <Save className="w-5 h-5" />
                {currentNote ? 'Uložit změny' : 'Vytvořit poznámku'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Zrušit
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Notes List */}
      {notes.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg border-2 border-gray-200">
          <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Zatím žádné poznámky</h3>
          <p className="text-gray-600 mb-6">Vytvoř svou první poznámku - bude uložená v cloudu!</p>
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Vytvořit první poznámku
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="p-5">
                <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {note.title}
                </h4>
                <div className="text-gray-600 mb-3 line-clamp-4 whitespace-pre-wrap text-sm font-mono">
                  {note.content || 'Prázdná poznámka'}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <Clock className="w-3 h-3" />
                  {formatDate(note.updatedAt)}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(note)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                  >
                    <Edit2 className="w-4 h-4" />
                    Editovat
                  </button>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="px-3 py-2 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NoteTaker;
