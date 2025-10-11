import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, RefreshCw } from 'lucide-react';
import { getSubjectById, getClassById } from '../data/subjects';

function NotionClassPage() {
  const { subjectId, classId } = useParams();
  const subject = getSubjectById(subjectId);
  const classItem = getClassById(subjectId, classId);

  if (!subject || !classItem) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Třída nenalezena</h1>
          <Link to={`/subject/${subjectId}`} className="text-blue-600 hover:text-blue-700">
            ← Zpět na předmět
          </Link>
        </div>
      </div>
    );
  }

  // Get Notion page ID (will be set after publishing)
  const notionPageId = classItem.notionPageId;
  const notionUrl = notionPageId 
    ? `https://notion.so/${notionPageId.replace(/-/g, '')}`
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to={`/subject/${subjectId}`}
            className="inline-flex items-center text-white hover:text-gray-100 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Zpět na {subject.shortName}
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                  {classItem.date}
                </span>
                <span className="px-3 py-1 bg-purple-500/50 rounded-full text-sm font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  Notion Integration
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-2">{classItem.title}</h1>
              <p className="text-gray-100">{classItem.lecturer}</p>
            </div>

            {notionUrl && (
              <a
                href={notionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                Otevřít v Notion
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {notionUrl ? (
          // Display Notion page in iframe
          <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-900 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 px-6 py-4 border-b-2 border-gray-900 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                <span className="font-semibold text-gray-900">📝 Notion Document</span>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
            
            <div className="w-full h-[calc(100vh-280px)]">
              <iframe
                src={notionUrl}
                className="w-full h-full border-0"
                allowFullScreen
                title="Notion Content"
              />
            </div>
          </div>
        ) : (
          // Show instructions for publishing
          <div className="bg-white rounded-2xl shadow-xl border-2 border-purple-600 p-12 text-center">
            <div className="text-6xl mb-6">📝</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Publish to Notion
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              This class uses the Markdown → Notion workflow. Write your notes in Markdown,
              then publish them to Notion to see them here.
            </p>

            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8 max-w-3xl mx-auto text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🚀 How to publish:</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Write Markdown</p>
                    <p className="text-sm text-gray-600">
                      Edit <code className="bg-gray-200 px-2 py-1 rounded">src/content/{subjectId}/test-class-{classId.padStart(2, '0')}.md</code>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Run publish script</p>
                    <code className="block bg-gray-900 text-green-400 px-4 py-2 rounded mt-2 text-sm">
                      cd scripts<br/>
                      node publish-to-notion.js {subjectId} {classId}
                    </code>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Update Page ID</p>
                    <p className="text-sm text-gray-600">
                      Copy the Notion page ID from output and update <code className="bg-gray-200 px-2 py-1 rounded">notionPageId</code> in subjects.js
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                    ✓
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Refresh this page</p>
                    <p className="text-sm text-gray-600">
                      Your Notion document will appear here!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t-2 border-gray-200">
              <p className="text-sm text-gray-500">
                📚 Markdown file location: <br/>
                <code className="text-purple-600">src/content/{subjectId}/test-class-{classId.padStart(2, '0')}.md</code>
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default NotionClassPage;
