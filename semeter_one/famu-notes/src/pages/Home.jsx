import { Link } from 'react-router-dom';
import { BookOpen, FileText, MessageCircle, StickyNote, CalendarDays, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { subjects, generalNotes } from '../data/subjects';
import Dashboard from '../components/Dashboard';

const colorMap = {
  blue: 'from-blue-500 to-blue-700',
  purple: 'from-purple-500 to-purple-700',
  green: 'from-green-500 to-green-700',
  red: 'from-red-500 to-red-700',
  orange: 'from-orange-500 to-orange-700',
};
function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-xl border-b-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:pl-16">
          <div className="text-center lg:text-left">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              📚 FAMU Poznámky
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-200 max-w-2xl lg:mx-0 mx-auto mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Přehledné poznámky z předmětů Filmové a televizní fakulty AMU
            </motion.p>
            <motion.div 
              className="flex items-center justify-center lg:justify-start gap-4 flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <span className="inline-flex items-center px-4 py-2 bg-yellow-400 text-gray-900 rounded-full font-semibold text-sm">
                🎓 Zimní semestr 2025/26
              </span>
              <span className="inline-flex items-center px-4 py-2 bg-white/10 text-white rounded-full font-medium text-sm backdrop-blur-sm">
                📖 {subjects.length} předmětů
              </span>
              <span className="inline-flex items-center px-4 py-2 bg-white/10 text-white rounded-full font-medium text-sm backdrop-blur-sm">
                ✨ Nové: Nástěnka
              </span>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:pl-16">
        {/* Dashboard */}
        <Dashboard />

        {/* Quick Links Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.2 }
            }
          }}
        >
          {/* Chat */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
          <Link
            to="/chat"
            className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-900 h-full"
          >
            <div className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-gray-900 rounded-full w-12 h-12 flex items-center justify-center text-2xl flex-shrink-0">
                  💬
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">Chat</h3>
                  <p className="text-sm text-gray-600">Real-time komunikace</p>
                </div>
                <MessageCircle className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          </Link>
          </motion.div>

          {/* Bulletin Board */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/bulletin-board"
              className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-900 h-full"
            >
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-900 rounded-full w-12 h-12 flex items-center justify-center text-2xl flex-shrink-0">
                    📌
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">Nástěnka</h3>
                    <p className="text-sm text-gray-600">Sticky notes pro rychlé poznámky</p>
                  </div>
                  <StickyNote className="w-6 h-6 text-gray-400" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Timetable */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/timetable"
              className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-900 h-full"
            >
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-900 rounded-full w-12 h-12 flex items-center justify-center text-2xl flex-shrink-0">
                    📅
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">Rozvrh</h3>
                    <p className="text-sm text-gray-600">Týdenní rozvrh hodin</p>
                  </div>
                  <CalendarDays className="w-6 h-6 text-gray-400" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Deadlines */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/deadlines"
              className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-900 h-full"
            >
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-900 rounded-full w-12 h-12 flex items-center justify-center text-2xl flex-shrink-0">
                    ⏰
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">Deadlines</h3>
                    <p className="text-sm text-gray-600">Správa termínů a úkolů</p>
                  </div>
                  <Clock className="w-6 h-6 text-gray-400" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* General Notes */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/subject/general"
              className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-900 h-full"
            >
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-900 rounded-full w-12 h-12 flex items-center justify-center text-2xl flex-shrink-0">
                    📚
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">Obecné poznámky</h3>
                    <p className="text-sm text-gray-600">Různé důležité informace</p>
                  </div>
                  <FileText className="w-6 h-6 text-gray-400" />
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <span className="text-4xl">📖</span>
            Předměty
          </h2>
          <p className="text-gray-600 text-lg">Vyberte předmět pro zobrazení poznámek z hodin</p>
        </div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08 }
            }
          }}
        >
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={`/subject/${subject.id}`}
                className="block group"
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-900 h-full flex flex-col">
                {/* Card Header */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-xs font-bold tracking-wider">{subject.shortName}</span>
                      </div>
                      <BookOpen className="w-7 h-7 opacity-70 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-sm opacity-90 leading-relaxed">{subject.description}</p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col">
                  <h4 className="font-bold text-gray-900 mb-4 text-lg leading-tight">{subject.name}</h4>
                  <div className="mt-auto">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-full">
                        <span className="font-bold text-gray-900">{subject.classes.length}</span>
                        <span>
                          {subject.classes.length === 1 ? 'hodina' : 'hodin'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-900 font-semibold group-hover:text-gray-700 transition-colors">
                      <span>Zobrazit poznámky</span>
                      <svg
                        className="ml-2 w-5 h-5 transform group-hover:translate-x-2 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}

export default Home;
