import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, User, BookOpen, Network } from 'lucide-react';
import { getSubjectById } from '../data/subjects';
import NotionSyncButton from '../components/NotionSyncButton';

const colorMap = {
  blue: 'from-gray-800 to-gray-900',
  purple: 'from-gray-800 to-gray-900',
  green: 'from-gray-800 to-gray-900',
  red: 'from-gray-800 to-gray-900',
  orange: 'from-gray-800 to-gray-900',
};

function SubjectPage() {
  const { subjectId } = useParams();
  const subject = getSubjectById(subjectId);

  if (!subject) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Předmět nenalezen</h1>
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Zpět na hlavní stránku
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className={`bg-gradient-to-r ${colorMap[subject.color]} text-white shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/"
            className="inline-flex items-center text-white hover:text-gray-100 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Zpět na přehled předmětů
          </Link>
          <div className="flex items-center gap-3">
            <BookOpen className="w-12 h-12" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{subject.name}</h1>
              <p className="text-lg opacity-90 mt-1">{subject.description}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:pl-16">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Link
            to={`/subject/${subject.id}/mindmap`}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg transition-all duration-300 hover:shadow-2xl hover:from-purple-700 hover:to-blue-700 hover:-translate-y-1"
          >
            <Network className="w-6 h-6 flex-shrink-0" />
            <div className="text-left">
              <div className="text-lg">🧠 Zobrazit Mind Map</div>
              <div className="text-xs opacity-90">Interaktivní vizualizace předmětu</div>
            </div>
          </Link>

          <NotionSyncButton 
            subject={subject}
            onSuccess={() => alert('Předmět synchronizován do Notion!')}
          />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Přehled hodin</h2>
          <p className="text-gray-600">Klikněte na hodinu pro zobrazení poznámek</p>
        </div>

        {/* Class List */}
        <div className="space-y-4">
          {subject.classes.map((classItem) => (
            <Link
              key={classItem.id}
              to={`/subject/${subject.id}/class/${classItem.id}`}
              className="block group"
            >
              <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                {/* Class Header */}
                <div className={`bg-gradient-to-r ${colorMap[subject.color]} px-6 py-4 flex items-center gap-4`}>
                  <div className="bg-white bg-opacity-20 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">{classItem.id}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 text-white text-sm mb-1">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {classItem.date}
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {classItem.lecturer}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Class Content */}
                <div className="px-6 py-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {classItem.title}
                  </h3>
                  {classItem.description && (
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {classItem.description}
                    </p>
                  )}
                  <div className="mt-4 inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700">
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
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Links Section */}
        {subject.links && subject.links.length > 0 && (
          <div className="mt-12 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Užitečné odkazy</h3>
            <ul className="space-y-2">
              {subject.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 hover:underline flex items-center"
                  >
                    {link.name}
                    <svg
                      className="ml-1 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}

export default SubjectPage;
