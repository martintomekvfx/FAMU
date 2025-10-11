import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  MessageCircle, 
  CalendarDays, 
  StickyNote, 
  Gamepad2, 
  Menu, 
  X, 
  ChevronRight,
  FileText,
  Clock
} from 'lucide-react';
import { subjects, generalNotes } from '../data/subjects';

const menuItems = [
  { path: '/', icon: Home, label: 'Domů' },
  { path: '/bulletin-board', icon: StickyNote, label: 'Nástěnka' },
  { path: '/chat', icon: MessageCircle, label: 'Chat' },
  { path: '/timetable', icon: CalendarDays, label: 'Rozvrh' },
  { path: '/deadlines', icon: Clock, label: 'Deadlines' },
];

const colorMap = {
  blue: 'text-gray-900 bg-gray-100 border-gray-900',
  purple: 'text-gray-900 bg-gray-100 border-gray-900',
  green: 'text-gray-900 bg-gray-100 border-gray-900',
  red: 'text-gray-900 bg-gray-100 border-gray-900',
  orange: 'text-gray-900 bg-gray-100 border-gray-900',
};

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSubjects, setExpandedSubjects] = useState({});
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);
  
  const toggleSubject = (subjectId) => {
    setExpandedSubjects(prev => ({
      ...prev,
      [subjectId]: !prev[subjectId]
    }));
  };

  const isCurrentPath = (path) => location.pathname === path;
  
  const isCurrentSubject = (subjectId) => 
    location.pathname.startsWith(`/subject/${subjectId}`);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-40
          transform transition-transform duration-300 ease-in-out
          w-80 overflow-y-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-0
        `}
      >
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              FAMU Poznámky
            </h1>
            <p className="text-sm text-gray-600">
              Zimní semestr 2025/26
            </p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {/* Home link */}
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                ${isCurrentPath('/') 
                  ? 'bg-gray-900 text-white border border-gray-900' 
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Přehled předmětů</span>
            </Link>

            {/* Timetable */}
            <Link
              to="/timetable"
              onClick={() => setIsOpen(false)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                ${location.pathname === '/timetable'
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              <CalendarDays className="w-5 h-5" />
              <span className="font-medium">📅 Rozvrh</span>
            </Link>

            {/* Chat */}
            <Link
              to="/chat"
              onClick={() => setIsOpen(false)}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg transition-colors mt-2
                ${isCurrentPath('/chat') 
                  ? 'bg-gray-900 text-white border border-gray-900' 
                  : 'text-gray-700 hover:bg-gray-100 border border-gray-300'
                }
              `}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">💬 Chat</span>
            </Link>

            {/* Bulletin Board */}
            <Link
              to="/bulletin-board"
              onClick={() => setIsOpen(false)}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg transition-colors mt-2
                ${isCurrentPath('/bulletin-board') 
                  ? 'bg-gray-900 text-white border border-gray-900' 
                  : 'text-gray-700 hover:bg-gray-100 border border-gray-300'
                }
              `}
            >
              <StickyNote className="w-5 h-5" />
              <span className="font-medium">📌 Nástěnka</span>
            </Link>

            {/* General Notes */}
            <Link
              to="/subject/general"
              onClick={() => setIsOpen(false)}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg transition-colors mt-2
                ${isCurrentPath('/subject/general') 
                  ? 'bg-gray-900 text-white border border-gray-900' 
                  : 'text-gray-700 hover:bg-gray-100 border border-gray-300'
                }
              `}
            >
              <FileText className="w-5 h-5" />
              <span className="font-medium">{generalNotes.icon} {generalNotes.shortName}</span>
            </Link>

            {/* Subjects */}
            <div className="mt-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Předměty
              </h3>
              
              {subjects.map((subject) => {
                const isExpanded = expandedSubjects[subject.id];
                const isCurrent = isCurrentSubject(subject.id);
                
                return (
                  <div key={subject.id} className="mb-2">
                    {/* Subject header */}
                    <div className="flex items-center">
                      <Link
                        to={`/subject/${subject.id}`}
                        onClick={() => setIsOpen(false)}
                        className={`
                          flex-1 flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                          ${isCurrent 
                            ? colorMap[subject.color] + ' border'
                            : 'text-gray-700 hover:bg-gray-50'
                          }
                        `}
                      >
                        <BookOpen className="w-5 h-5" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">
                            {subject.shortName}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {subject.classes.length} hodin
                          </div>
                        </div>
                      </Link>
                      
                      {/* Expand button */}
                      <button
                        onClick={() => toggleSubject(subject.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                    </div>

                    {/* Classes list */}
                    {isExpanded && (
                      <div className="ml-8 mt-2 space-y-1">
                        {subject.classes.map((classItem) => {
                          const classPath = `/subject/${subject.id}/class/${classItem.id}`;
                          const isCurrentClass = isCurrentPath(classPath);
                          
                          return (
                            <Link
                              key={classItem.id}
                              to={classPath}
                              onClick={() => setIsOpen(false)}
                              className={`
                                flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm
                                ${isCurrentClass
                                  ? 'bg-gray-100 text-gray-900 font-medium'
                                  : 'text-gray-600 hover:bg-gray-50'
                                }
                              `}
                            >
                              <FileText className="w-4 h-4" />
                              <div className="flex-1 min-w-0">
                                <div className="truncate">
                                  {classItem.id}. {classItem.title}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {classItem.date}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            {/* KOS Link */}
            <a
              href="https://kos.amu.cz/"
              target="_blank"
              rel="noopener noreferrer"
              className="block mb-4 px-3 py-3 bg-gray-900 hover:bg-gray-700 text-white rounded-lg transition-colors text-center font-medium"
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>KOS - Studijní systém</span>
              </div>
            </a>

            <div className="text-xs text-gray-500 text-center">
              <div>FAMU Notes</div>
              <div>React App</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
