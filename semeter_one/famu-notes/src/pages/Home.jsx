import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap } from 'lucide-react';
import { subjects } from '../data/subjects';

const colorMap = {
  blue: 'from-blue-500 to-blue-700',
  purple: 'from-purple-500 to-purple-700',
  green: 'from-green-500 to-green-700',
  red: 'from-red-500 to-red-700',
  orange: 'from-orange-500 to-orange-700',
};

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-10 h-10 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">FAMU Poznámky</h1>
              <p className="text-gray-600">Zimní semestr 2025/26</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Předměty</h2>
          <p className="text-gray-600">Vyberte předmět pro zobrazení poznámek</p>
        </div>

        {/* Subject Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <Link
              key={subject.id}
              to={`/subject/${subject.id}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                {/* Card Header */}
                <div className={`bg-gradient-to-r ${colorMap[subject.color]} p-6 text-white`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{subject.shortName}</h3>
                      <p className="text-sm opacity-90">{subject.description}</p>
                    </div>
                    <BookOpen className="w-8 h-8 opacity-80" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <h4 className="font-semibold text-gray-800 mb-3">{subject.name}</h4>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">{subject.classes.length}</span>
                    <span className="ml-1">
                      {subject.classes.length === 1 ? 'hodina' : 'hodin'}
                    </span>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6">
                  <span className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                    Zobrazit poznámky
                    <svg
                      className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State (if no subjects) */}
        {subjects.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Zatím nejsou žádné poznámky
            </h3>
            <p className="text-gray-600">
              Poznámky se zobrazí, jakmile budou přidány
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600 text-sm">
            © 2025 FAMU Poznámky | Vytvořeno pro osobní studijní účely
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
