import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { getSubjectById, getClassById } from '../data/subjects';
import DDF1Content from '../content/ddf/class-01';
import DDF2Content from '../content/ddf/class-02';
import DDF3Content from '../content/ddf/class-03';
import AV1Content from '../content/av/av1';
import AV2Content from '../content/av/av2';
import AV3Content from '../content/av/av3';
import AV4Content from '../content/av/av4';
import AV5Content from '../content/av/av5';
import AI1Content from '../content/ai/ai1';
import General1Content from '../content/general/general1';
import PR1Content from '../content/pr/pr1';
import NoteTaker from '../components/NoteTaker';

// Map of content components
const contentMap = {
  'ddf-1': DDF1Content,
  'ddf-2': DDF2Content,
  'ddf-3': DDF3Content,
  'av-1': AV1Content,
  'av-2': AV2Content,
  'av-3': AV3Content,
  'av-4': AV4Content,
  'av-5': AV5Content,
  'ai-1': AI1Content,
  'general-1': General1Content,
  'pr-1': PR1Content,
};

const colorMap = {
  blue: 'from-gray-800 to-gray-900',
  purple: 'from-gray-800 to-gray-900',
  green: 'from-gray-800 to-gray-900',
  red: 'from-gray-800 to-gray-900',
  orange: 'from-gray-800 to-gray-900',
};

function ClassPage() {
  const { subjectId, classId } = useParams();
  const subject = getSubjectById(subjectId);
  const classItem = getClassById(subjectId, classId);

  if (!subject || !classItem) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Poznámky nenalezeny</h1>
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

  // Get content component
  const ContentComponent = contentMap[`${subjectId}-${classId}`];

  // Find previous and next class
  const currentIndex = subject.classes.findIndex((c) => c.id === parseInt(classId));
  const prevClass = currentIndex > 0 ? subject.classes[currentIndex - 1] : null;
  const nextClass = currentIndex < subject.classes.length - 1 ? subject.classes[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className={`bg-gradient-to-r ${colorMap[subject.color]} text-white shadow-lg`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to={`/subject/${subject.id}`}
            className="inline-flex items-center text-white hover:text-gray-100 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Zpět na {subject.shortName}
          </Link>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-white bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center">
                  <span className="font-bold">{classItem.id}</span>
                </div>
                <div className="flex flex-wrap gap-3 text-sm">
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
              <h1 className="text-2xl md:text-3xl font-bold">{classItem.title}</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {classItem.isNoteTaker ? (
          <NoteTaker />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 md:p-10">
            {ContentComponent ? (
              <div className="prose-custom">
                <ContentComponent />
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">
                  Poznámky k této hodině ještě nejsou k dispozici.
                </p>
                <p className="text-sm text-gray-500">
                  Poznámky budou přidány během semestru.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center gap-4">
          {prevClass ? (
            <Link
              to={`/subject/${subject.id}/class/${prevClass.id}`}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <div className="text-left">
                <div className="text-xs text-gray-500">Předchozí</div>
                <div className="line-clamp-1">{prevClass.title}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextClass ? (
            <Link
              to={`/subject/${subject.id}/class/${nextClass.id}`}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium group text-right"
            >
              <div className="text-right">
                <div className="text-xs text-gray-500">Následující</div>
                <div className="line-clamp-1">{nextClass.title}</div>
              </div>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </main>
    </div>
  );
}

export default ClassPage;
