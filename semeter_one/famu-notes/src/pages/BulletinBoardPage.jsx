import { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Plus, X, Edit2, Trash2, StickyNote } from 'lucide-react';

const COLORS = [
  { name: 'Žlutá', bg: 'bg-yellow-200', hover: 'hover:bg-yellow-300', border: 'border-yellow-400' },
  { name: 'Růžová', bg: 'bg-pink-200', hover: 'hover:bg-pink-300', border: 'border-pink-400' },
  { name: 'Modrá', bg: 'bg-blue-200', hover: 'hover:bg-blue-300', border: 'border-blue-400' },
  { name: 'Zelená', bg: 'bg-green-200', hover: 'hover:bg-green-300', border: 'border-green-400' },
  { name: 'Oranžová', bg: 'bg-orange-200', hover: 'hover:bg-orange-300', border: 'border-orange-400' },
  { name: 'Fialová', bg: 'bg-purple-200', hover: 'hover:bg-purple-300', border: 'border-purple-400' },
];

function BulletinBoardPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [newNoteColor, setNewNoteColor] = useState(0);
  const dragRef = useRef({ noteId: null, offsetX: 0, offsetY: 0 });

  // Načíst poznámky z Firebase
  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const docRef = doc(db, 'stickyNotes', 'bulletin-board');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setNotes(docSnap.data().notes || []);
      }
    } catch (error) {
      console.error('Chyba při načítání poznámek:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveNotes = async (updatedNotes) => {
    try {
      const docRef = doc(db, 'stickyNotes', 'bulletin-board');
      await setDoc(docRef, { notes: updatedNotes });
    } catch (error) {
      console.error('Chyba při ukládání poznámek:', error);
    }
  };

  const addNote = () => {
    if (!newNoteText.trim()) return;

    const newNote = {
      id: Date.now().toString(),
      text: newNoteText,
      colorIndex: newNoteColor,
      x: Math.random() * 300 + 100,
      y: Math.random() * 300 + 100,
      createdAt: new Date().toISOString(),
    };

    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
    
    setNewNoteText('');
    setNewNoteColor(0);
    setShowAddModal(false);
  };

  const updateNote = (noteId, updates) => {
    const updatedNotes = notes.map(note => 
      note.id === noteId ? { ...note, ...updates } : note
    );
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  const deleteNote = (noteId) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  const handleMouseDown = (e, noteId) => {
    if (e.target.closest('.note-action-button')) return;
    
    const note = notes.find(n => n.id === noteId);
    
    let clientX, clientY;
    
    if (e.type === 'touchstart') {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    dragRef.current = {
      noteId,
      offsetX: clientX - note.x,
      offsetY: clientY - note.y,
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleMouseMove, { passive: false });
    document.addEventListener('touchend', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!dragRef.current.noteId) return;
    
    // Prevent default behavior
    e.preventDefault();

    let clientX, clientY;
    
    if (e.type === 'touchmove') {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const newX = clientX - dragRef.current.offsetX;
    const newY = clientY - dragRef.current.offsetY;

    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === dragRef.current.noteId
          ? { ...note, x: Math.max(0, newX), y: Math.max(0, newY) }
          : note
      )
    );
  };

  const handleMouseUp = () => {
    if (dragRef.current.noteId) {
      // Use callback to get latest state
      setNotes(currentNotes => {
        saveNotes(currentNotes);
        return currentNotes;
      });
      dragRef.current = { noteId: null, offsetX: 0, offsetY: 0 };
    }
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('touchmove', handleMouseMove);
    document.removeEventListener('touchend', handleMouseUp);
  };

  const startEditing = (note) => {
    setEditingNote(note);
  };

  const saveEdit = () => {
    if (editingNote && editingNote.text.trim()) {
      updateNote(editingNote.id, { text: editingNote.text });
    }
    setEditingNote(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Načítání nástěnky...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <StickyNote className="w-8 h-8 text-yellow-500" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">📌 Nástěnka</h1>
                <p className="text-sm text-gray-600">Sticky notes pro rychlé poznámky</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              Nová poznámka
            </button>
          </div>
        </div>
      </div>

      {/* Bulletin Board */}
      <div className="relative w-full" style={{ minHeight: 'calc(100vh - 100px)', height: '2000px' }}>
        {notes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <StickyNote className="w-20 h-20 mx-auto mb-4 opacity-30" />
              <p className="text-lg">Zatím žádné poznámky</p>
              <p className="text-sm">Klikni na "Nová poznámka" a začni!</p>
            </div>
          </div>
        )}

        {notes.map((note) => {
          const color = COLORS[note.colorIndex] || COLORS[0];
          return (
            <div
              key={note.id}
              onMouseDown={(e) => handleMouseDown(e, note.id)}
              onTouchStart={(e) => handleMouseDown(e, note.id)}
              style={{
                position: 'absolute',
                left: `${note.x}px`,
                top: `${note.y}px`,
                cursor: 'grab',
                touchAction: 'none',
                userSelect: 'none',
                WebkitUserSelect: 'none',
              }}
              className={`w-64 h-64 ${color.bg} ${color.border} border-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow p-4 flex flex-col`}
            >
              {/* Note Actions */}
              <div className="flex justify-end gap-1 mb-2">
                <button
                  onClick={() => startEditing(note)}
                  className="note-action-button p-1.5 bg-white/70 hover:bg-white rounded-full transition-colors"
                  title="Upravit"
                >
                  <Edit2 className="w-4 h-4 text-gray-700" />
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="note-action-button p-1.5 bg-white/70 hover:bg-white rounded-full transition-colors"
                  title="Smazat"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>

              {/* Note Content */}
              <div className="flex-1 overflow-auto">
                <p className="text-gray-800 whitespace-pre-wrap break-words font-handwriting" style={{ fontSize: '15px', lineHeight: '1.5' }}>
                  {note.text}
                </p>
              </div>

              {/* Note Footer */}
              <div className="text-xs text-gray-600 mt-2 opacity-60">
                {new Date(note.createdAt).toLocaleDateString('cs-CZ')}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingNote) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {editingNote ? '✏️ Upravit poznámku' : '➕ Nová poznámka'}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingNote(null);
                  setNewNoteText('');
                }}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <textarea
              value={editingNote ? editingNote.text : newNoteText}
              onChange={(e) => editingNote 
                ? setEditingNote({ ...editingNote, text: e.target.value })
                : setNewNoteText(e.target.value)
              }
              placeholder="Napiš svou poznámku..."
              className="w-full h-40 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              autoFocus
            />

            {!editingNote && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vyber barvu:
                </label>
                <div className="flex gap-2 flex-wrap">
                  {COLORS.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setNewNoteColor(index)}
                      className={`w-12 h-12 ${color.bg} ${color.hover} ${color.border} border-2 rounded-lg transition-all ${
                        newNoteColor === index ? 'ring-4 ring-gray-900 ring-offset-2' : ''
                      }`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingNote(null);
                  setNewNoteText('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                Zrušit
              </button>
              <button
                onClick={editingNote ? saveEdit : addNote}
                className="flex-1 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg font-medium shadow-md"
              >
                {editingNote ? 'Uložit' : 'Přidat'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BulletinBoardPage;
