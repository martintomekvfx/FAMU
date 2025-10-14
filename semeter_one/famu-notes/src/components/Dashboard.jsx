import { useState, useEffect } from 'react';
import { Calendar, Clock, BookOpen } from 'lucide-react';

function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Aktualizuj čas každou sekundu
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Zjisti číslo týdne
  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const weekNumber = getWeekNumber(currentTime);
  const isOddWeek = weekNumber % 2 === 1;

  // Formátování
  const formatTime = currentTime.toLocaleTimeString('cs-CZ', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const formatDate = currentTime.toLocaleDateString('cs-CZ', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const weekInfo = isOddWeek
    ? { type: 'Lichý týden', subject: 'Audiovizuální seminář', emoji: '🎬' }
    : { type: 'Sudý týden', subject: 'Umělá inteligence', emoji: '🤖' };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-2 border-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Aktuální čas */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <Clock className="w-5 h-5 text-gray-900" />
            <span className="text-sm font-semibold text-gray-900">Aktuální čas</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {formatTime}
          </div>
          <div className="text-sm text-gray-700">
            {formatDate}
          </div>
        </div>

        {/* Týden */}
        <div className="text-center md:text-left p-4 rounded-lg bg-gray-100 border-2 border-gray-900">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <Calendar className="w-5 h-5 text-gray-900" />
            <span className="text-sm font-semibold text-gray-900">
              {weekNumber}. týden
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {weekInfo.type}
          </div>
          <div className="text-sm text-gray-800">
            {weekInfo.emoji} {weekInfo.subject}
          </div>
        </div>

        {/* Quick stats */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <BookOpen className="w-5 h-5 text-gray-900" />
            <span className="text-sm font-semibold text-gray-900">Semestr</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            Zimní 2025/26
          </div>
          <div className="text-sm text-gray-700">
            FAMU - Filmová fakulta
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
