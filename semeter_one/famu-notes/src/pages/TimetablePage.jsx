import TimetableWidget from '../components/TimetableWidget';

function TimetablePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8 px-6 shadow-xl">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">📅 Rozvrh</h1>
          <p className="text-gray-300">Zimní semestr 2025/26</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:pl-16">
        <TimetableWidget />
      </main>
    </div>
  );
}

export default TimetablePage;
