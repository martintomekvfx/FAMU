import { Calendar } from 'lucide-react';

function WeekInfo() {
  // Zjisti číslo týdne v roce
  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const currentDate = new Date();
  const weekNumber = getWeekNumber(currentDate);
  const isOddWeek = weekNumber % 2 === 1;

  const weekInfo = isOddWeek
    ? {
        type: 'Lichý týden',
        subject: 'Audiovizuální seminář',
        color: 'bg-purple-100 border-purple-300 text-purple-800',
        emoji: '🎬',
      }
    : {
        type: 'Sudý týden',
        subject: 'Umělá inteligence',
        color: 'bg-green-100 border-green-300 text-green-800',
        emoji: '🤖',
      };

  return (
    <div className={`mb-4 p-3 rounded-lg border-2 ${weekInfo.color}`}>
      <div className="flex items-start gap-2">
        <Calendar className="w-5 h-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm mb-1">
            {weekInfo.type} ({weekNumber}. týden)
          </div>
          <div className="text-xs flex items-center gap-1">
            <span>{weekInfo.emoji}</span>
            <span className="font-medium">{weekInfo.subject}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeekInfo;
