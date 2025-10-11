import { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Plus, Calendar, Clock, AlertCircle, CheckCircle2, Trash2, Edit2, Filter, Search, X } from 'lucide-react';
import { format, formatDistanceToNow, isPast, isToday, isTomorrow, differenceInDays } from 'date-fns';
import { cs } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PRIORITIES = {
  high: { label: 'Vysoká', color: 'bg-red-500', textColor: 'text-red-700', bgLight: 'bg-red-50', border: 'border-red-200' },
  medium: { label: 'Střední', color: 'bg-yellow-500', textColor: 'text-yellow-700', bgLight: 'bg-yellow-50', border: 'border-yellow-200' },
  low: { label: 'Nízká', color: 'bg-green-500', textColor: 'text-green-700', bgLight: 'bg-green-50', border: 'border-green-200' },
};

const CATEGORIES = [
  { value: 'work', label: '💼 Práce', color: 'bg-blue-100 text-blue-800' },
  { value: 'school', label: '🎓 Škola', color: 'bg-purple-100 text-purple-800' },
  { value: 'personal', label: '👤 Osobní', color: 'bg-pink-100 text-pink-800' },
  { value: 'project', label: '🚀 Projekt', color: 'bg-indigo-100 text-indigo-800' },
  { value: 'other', label: '📌 Ostatní', color: 'bg-gray-100 text-gray-800' },
];

function DeadlinePage() {
  const [deadlines, setDeadlines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDeadline, setEditingDeadline] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('active');
  const [sortBy, setSortBy] = useState('dueDate');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: new Date(),
    priority: 'medium',
    category: 'school',
  });

  // Load deadlines from Firebase
  useEffect(() => {
    const q = query(collection(db, 'deadlines'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const deadlinesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        dueDate: doc.data().dueDate?.toDate?.() || new Date(doc.data().dueDate),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      }));
      setDeadlines(deadlinesData);
      setIsLoading(false);
    }, (error) => {
      console.error('Error loading deadlines:', error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Add deadline
  const handleAddDeadline = async (e) => {
    e.preventDefault();
    console.log('Form submitted!', formData);
    
    try {
      const deadlineData = {
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
        priority: formData.priority,
        category: formData.category,
        completed: false,
        createdAt: new Date(),
      };
      
      console.log('Saving to Firebase:', deadlineData);
      await addDoc(collection(db, 'deadlines'), deadlineData);
      console.log('Saved successfully!');
      
      setShowAddModal(false);
      resetForm();
    } catch (error) {
      console.error('Error adding deadline:', error);
      alert('Chyba při přidávání deadline: ' + error.message);
    }
  };

  // Update deadline
  const handleUpdateDeadline = async (e) => {
    e.preventDefault();
    try {
      const deadlineRef = doc(db, 'deadlines', editingDeadline.id);
      await updateDoc(deadlineRef, {
        ...formData,
        dueDate: formData.dueDate,
      });
      setEditingDeadline(null);
      resetForm();
    } catch (error) {
      console.error('Error updating deadline:', error);
    }
  };

  // Toggle complete
  const toggleComplete = async (deadline) => {
    try {
      const deadlineRef = doc(db, 'deadlines', deadline.id);
      await updateDoc(deadlineRef, {
        completed: !deadline.completed,
      });
    } catch (error) {
      console.error('Error toggling complete:', error);
    }
  };

  // Delete deadline
  const handleDelete = async (id) => {
    if (window.confirm('Opravdu chcete smazat tento deadline?')) {
      try {
        await deleteDoc(doc(db, 'deadlines', id));
      } catch (error) {
        console.error('Error deleting deadline:', error);
      }
    }
  };

  // Edit deadline
  const startEdit = (deadline) => {
    setEditingDeadline(deadline);
    setFormData({
      title: deadline.title,
      description: deadline.description || '',
      dueDate: deadline.dueDate,
      priority: deadline.priority,
      category: deadline.category,
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      dueDate: new Date(),
      priority: 'medium',
      category: 'school',
    });
  };

  // Get deadline status
  const getDeadlineStatus = (deadline) => {
    if (deadline.completed) return 'completed';
    if (isPast(deadline.dueDate)) return 'overdue';
    if (isToday(deadline.dueDate)) return 'today';
    if (isTomorrow(deadline.dueDate)) return 'tomorrow';
    if (differenceInDays(deadline.dueDate, new Date()) <= 7) return 'soon';
    return 'future';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'overdue': return 'border-l-4 border-red-500 bg-red-50';
      case 'today': return 'border-l-4 border-orange-500 bg-orange-50';
      case 'tomorrow': return 'border-l-4 border-yellow-500 bg-yellow-50';
      case 'soon': return 'border-l-4 border-blue-500 bg-blue-50';
      case 'completed': return 'border-l-4 border-gray-400 bg-gray-50 opacity-60';
      default: return 'border-l-4 border-green-500 bg-white';
    }
  };

  // Filter and sort deadlines
  const filteredDeadlines = deadlines
    .filter(d => {
      // Status filter
      if (filterStatus === 'active' && d.completed) return false;
      if (filterStatus === 'completed' && !d.completed) return false;
      
      // Priority filter
      if (filterPriority !== 'all' && d.priority !== filterPriority) return false;
      
      // Category filter
      if (filterCategory !== 'all' && d.category !== filterCategory) return false;
      
      // Search filter
      if (searchQuery && !d.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          return a.dueDate - b.dueDate;
        case 'priority':
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'created':
          return b.createdAt - a.createdAt;
        default:
          return 0;
      }
    });

  // Statistics
  const stats = {
    total: deadlines.length,
    active: deadlines.filter(d => !d.completed).length,
    completed: deadlines.filter(d => d.completed).length,
    overdue: deadlines.filter(d => !d.completed && isPast(d.dueDate)).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8 px-6 shadow-xl">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">⏰ Deadlines & Úkoly</h1>
          <p className="text-gray-300">Správa termínů a úkolů</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:pl-16">
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 border-2 border-gray-900">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Celkem</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-2 border-blue-500">
            <div className="text-2xl font-bold text-blue-600">{stats.active}</div>
            <div className="text-sm text-gray-600">Aktivní</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-2 border-green-500">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-sm text-gray-600">Hotovo</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-2 border-red-500">
            <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
            <div className="text-sm text-gray-600">Po termínu</div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-lg shadow-lg border-2 border-gray-900 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Hledat úkoly..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Add Button */}
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 font-semibold"
            >
              <Plus className="w-5 h-5" />
              Přidat deadline
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
            >
              <option value="all">Všechny</option>
              <option value="active">Aktivní</option>
              <option value="completed">Hotové</option>
            </select>

            {/* Priority Filter */}
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
            >
              <option value="all">Všechny priority</option>
              <option value="high">Vysoká</option>
              <option value="medium">Střední</option>
              <option value="low">Nízká</option>
            </select>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
            >
              <option value="all">Všechny kategorie</option>
              {CATEGORIES.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
            >
              <option value="dueDate">Podle termínu</option>
              <option value="priority">Podle priority</option>
              <option value="created">Podle vytvoření</option>
            </select>
          </div>
        </div>

        {/* Deadlines List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Načítání...</p>
          </div>
        ) : filteredDeadlines.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg border-2 border-gray-900 p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Žádné deadlines</h3>
            <p className="text-gray-600 mb-4">Začněte přidáním nového úkolu</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Přidat deadline
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDeadlines.map(deadline => {
              const status = getDeadlineStatus(deadline);
              const priority = PRIORITIES[deadline.priority];
              const category = CATEGORIES.find(c => c.value === deadline.category);

              return (
                <div
                  key={deadline.id}
                  className={`bg-white rounded-lg shadow-lg p-6 transition-all hover:shadow-xl ${getStatusColor(status)} ${
                    deadline.completed ? 'opacity-75' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleComplete(deadline)}
                      className="mt-1 flex-shrink-0"
                    >
                      {deadline.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      ) : (
                        <div className="w-6 h-6 border-2 border-gray-400 rounded-full hover:border-gray-600 transition-colors"></div>
                      )}
                    </button>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className={`text-lg font-bold ${deadline.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {deadline.title}
                        </h3>
                        
                        {/* Actions */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(deadline)}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Upravit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(deadline.id)}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Smazat"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {deadline.description && (
                        <p className="text-gray-600 mb-3">{deadline.description}</p>
                      )}

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-3 items-center">
                        {/* Due Date */}
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className={`font-medium ${
                            status === 'overdue' ? 'text-red-600' :
                            status === 'today' ? 'text-orange-600' :
                            status === 'tomorrow' ? 'text-yellow-600' :
                            'text-gray-700'
                          }`}>
                            {format(deadline.dueDate, 'd. MMMM yyyy', { locale: cs })}
                          </span>
                        </div>

                        {/* Countdown */}
                        {!deadline.completed && (
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className={`font-medium ${
                              status === 'overdue' ? 'text-red-600' : 'text-gray-700'
                            }`}>
                              {isPast(deadline.dueDate) ? 'Po termínu' : formatDistanceToNow(deadline.dueDate, { addSuffix: true, locale: cs })}
                            </span>
                          </div>
                        )}

                        {/* Priority */}
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priority.bgLight} ${priority.textColor} border ${priority.border}`}>
                          {priority.label}
                        </span>

                        {/* Category */}
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${category.color}`}>
                          {category.label}
                        </span>

                        {/* Status Badge */}
                        {status === 'overdue' && !deadline.completed && (
                          <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                            <AlertCircle className="w-3 h-3" />
                            Po termínu
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Add/Edit Modal */}
      {(showAddModal || editingDeadline) && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60"
            onClick={() => {
              setShowAddModal(false);
              setEditingDeadline(null);
              resetForm();
            }}
          />
          
          {/* Modal Content */}
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-gray-900 relative z-10">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-1">
                    {editingDeadline ? '✏️ Upravit deadline' : '➕ Nový deadline'}
                  </h2>
                  <p className="text-gray-300 text-sm">
                    {editingDeadline ? 'Změňte detaily úkolu' : 'Vytvořte nový úkol nebo deadline'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingDeadline(null);
                    resetForm();
                  }}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <form onSubmit={editingDeadline ? handleUpdateDeadline : handleAddDeadline} className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-red-500">*</span>
                  Název úkolu
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 focus:outline-none transition-all text-lg"
                  placeholder="např. Odevzdat seminární práci..."
                  autoFocus
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Popis (volitelné)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 focus:outline-none transition-all resize-none"
                  rows="4"
                  placeholder="Přidejte detaily, poznámky nebo instrukce..."
                />
              </div>

              {/* Due Date with react-datepicker */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-red-500">*</span>
                  <Calendar className="w-4 h-4" />
                  Termín
                </label>
                <DatePicker
                  selected={formData.dueDate}
                  onChange={(date) => setFormData({ ...formData, dueDate: date })}
                  dateFormat="d. MMMM yyyy"
                  locale={cs}
                  minDate={new Date()}
                  showPopperArrow={false}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 focus:outline-none transition-all text-lg cursor-pointer"
                  calendarClassName="shadow-2xl border-2 border-gray-900 rounded-xl"
                  required
                />
                <p className="text-sm text-gray-500 mt-2">
                  {formatDistanceToNow(formData.dueDate, { addSuffix: true, locale: cs })}
                </p>
              </div>

              {/* Priority & Category Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Priority */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="text-red-500">*</span>
                    Priorita
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="high">🔴 Vysoká</option>
                    <option value="medium">🟡 Střední</option>
                    <option value="low">🟢 Nízká</option>
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="text-red-500">*</span>
                    Kategorie
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 focus:outline-none transition-all cursor-pointer"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t-2 border-gray-100">
                <button
                  type="submit"
                  onClick={(e) => {
                    console.log('Button clicked!');
                  }}
                  className="flex-1 bg-gray-900 text-white px-6 py-4 rounded-xl hover:bg-gray-800 active:bg-gray-700 font-bold text-lg transition-colors"
                >
                  {editingDeadline ? '💾 Uložit změny' : '✨ Přidat deadline'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    console.log('Cancel clicked!');
                    setShowAddModal(false);
                    setEditingDeadline(null);
                    resetForm();
                  }}
                  className="px-6 py-4 border-2 border-gray-300 rounded-xl hover:bg-gray-50 active:bg-gray-100 font-bold text-gray-700 transition-colors"
                >
                  Zrušit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeadlinePage;
