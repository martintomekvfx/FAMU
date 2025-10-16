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

        {/* Syllabus for AV subject */}
        {subject.id === 'av' && (
          <div className="mb-12 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg p-8 border-2 border-purple-200">
            <h2 className="text-3xl font-bold text-purple-900 mb-6">📅 Rozpis výuky a deadlines</h2>
            
            {/* Winter Semester */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-purple-800 mb-4">Zimní semestr</h3>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="font-bold text-purple-900">6. 10. a 9. 10.</div>
                  <div className="text-gray-700">Mapa a území (PF)</div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="font-bold text-purple-900">13. 10. a 16. 10.</div>
                  <div className="text-gray-700">Fakta a zájmy vědy (PF)</div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="font-bold text-purple-900">20. 10. a 23. 10.</div>
                  <div className="text-gray-700">Performativita vědy (PF)</div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="font-bold text-purple-900">27. 10. a 30. 10.</div>
                  <div className="text-gray-700">Romantismus v současném umění (NK)</div>
                  <div className="text-sm text-orange-600 mt-1">⚠️ Pondělí - rektorské volno</div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                  <div className="font-bold text-purple-900">3. 11. a 6. 11.</div>
                  <div className="text-gray-700">Politika vizuality (AB)</div>
                  <div className="mt-2 bg-red-100 p-2 rounded text-sm">
                    <span className="font-bold text-red-900">📝 Deadline 2. 11.</span> - Reflexe 1. odevzdaného textu (Anežka) - min 5 ns
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="font-bold text-purple-900">10. 11. a 13. 11.</div>
                  <div className="text-gray-700">Filosofie technologie (PF)</div>
                  <div className="text-sm text-blue-600 mt-1">💡 Vybrat osobní téma ke kritickému představení</div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="font-bold text-purple-900">17. 11. a 20. 11.</div>
                  <div className="text-gray-700">Virtualita (PF)</div>
                  <div className="text-sm text-orange-600 mt-1">⚠️ Pondělí - státní svátek</div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                  <div className="font-bold text-purple-900">24. 11. a 27. 11.</div>
                  <div className="text-gray-700">Kreativita umělé inteligence 1 (PF)</div>
                  <div className="mt-2 bg-red-100 p-2 rounded text-sm">
                    <span className="font-bold text-red-900">📝 Deadline 26. 11.</span> - Reflexe 1,5. odevzdaného textu (Palo) - min 5 ns
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="font-bold text-purple-900">1. 12. a 4. 12.</div>
                  <div className="text-gray-700">Sound ecology (SP)</div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="font-bold text-purple-900">8. 12. a 11. 12.</div>
                  <div className="text-gray-700">Politics of sound (SP)</div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                  <div className="font-bold text-purple-900">15. 12. a 18. 12.</div>
                  <div className="text-gray-700">Kreativita umělé inteligence 2 (PF)</div>
                  <div className="mt-2 bg-red-100 p-2 rounded text-sm">
                    <span className="font-bold text-red-900">📝 Deadline 15. 12.</span> - Reflexe 2. odevzdaného textu (Palo) - min 5 ns
                  </div>
                </div>
              </div>
            </div>

            {/* Summer Semester */}
            <div>
              <h3 className="text-2xl font-bold text-purple-800 mb-4">Letní semestr</h3>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="font-bold text-purple-900">9. 2. a 12. 2.</div>
                  <div className="text-gray-700">Postkolonialismus (AB)</div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="font-bold text-purple-900">16. 2. a 19. 2.</div>
                  <div className="text-gray-700">Open narrative structures (ER)</div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="font-bold text-purple-900">23. 2. a 26. 2.</div>
                  <div className="text-gray-700">Posthumanismus (PF)</div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="font-bold text-purple-900">2. 3. a 5. 3.</div>
                  <div className="text-gray-700">Politika emancipace (NK)</div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="font-bold text-purple-900">9. 3. a 12. 3.</div>
                  <div className="text-gray-700">Mediální specificita (MB)</div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="font-bold text-purple-900">16. 3. a 19. 3.</div>
                  <div className="text-gray-700">Archivní obrat (MB)</div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                  <div className="font-bold text-purple-900">23. 3. a 26. 3.</div>
                  <div className="text-gray-700">Digitální platformy (MB)</div>
                  <div className="mt-2 bg-red-100 p-2 rounded text-sm">
                    <span className="font-bold text-red-900">📝 ZKOUŠKA</span> - Reflexe 3. odevzdaného textu (Anežka + Nela) - min 10 ns
                  </div>
                </div>
              </div>
            </div>

            {/* Important Note */}
            <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
              <p className="font-bold text-yellow-900">⚠️ Povinná docházka: minimálně 80%</p>
            </div>
          </div>
        )}

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
