import { Link } from 'react-router-dom';
import { useState } from 'react';
import { X } from 'lucide-react';

// Rozvrh z KOS - Grid: 1032px wide, 9:00-20:00 (11 hours), 93.82px per hour
const CLASSES = [
  // Pondělí (Po) - row 0
  {
    day: 0,
    left: 469, // 14:00 (5 hours from 9:00)
    width: 305, // 3h 15min duration
    top: 0,
    height: 119,
    code: '373AVTE1',
    teacher: 'FABUŠ P.',
    room: 'LAZ-423',
    time: '14:00 - 17:15',
    color: '#CCEEFF',
    link: '/subject/av',
  },
  // Úterý (Ut) - row 1
  {
    day: 1,
    left: 78, // 9:50 (0.833 hours from 9:00)
    width: 297, // 3h 10min duration
    top: 120,
    height: 119,
    code: 'Dílna',
    teacher: 'BAGDASAROV G.',
    room: 'Trziste',
    time: '9:50 - 13:00',
    color: '#CCCCCC',
    link: '/subject/general',
  },
  {
    day: 1,
    left: 469, // 14:00 (5 hours from 9:00)
    width: 227, // 2h 25min duration
    top: 120,
    height: 119,
    code: '373PAD1',
    teacher: 'BAGDASAROV G.',
    room: 'LAZ-423',
    time: '14:00 - 16:25',
    color: '#CCCCCC',
    link: '/subject/av',
  },
  {
    day: 1,
    left: 782, // 17:20 (8.333 hours from 9:00)
    width: 148, // 1h 35min duration
    top: 120,
    height: 119,
    code: '373PR',
    teacher: 'LUKÁČOVÁ M.',
    room: 'LAZ-423',
    time: '17:20 - 18:55',
    color: '#CCCCCC',
    link: '/subject/general',
  },
  // Středa (St) - row 2
  {
    day: 2,
    left: 547, // 14:50 (5.833 hours from 9:00)
    width: 305, // 3h 15min duration
    top: 240,
    height: 119,
    code: '303DDF1',
    teacher: 'ČENĚK D.',
    room: 'LAZ-217',
    time: '14:50 - 18:05',
    color: '#CCEEFF',
    link: '/subject/ddf',
    details: {
      fullName: 'Dějiny dokumentárního filmu 1',
      credits: 3,
      completion: 'ZK',
      scope: '4PT',
      language: 'česky',
      department: 'Katedra dokumentární tvorby',
      capacity: 25,
      enrolled: 24,
    },
  },
  {
    day: 2,
    left: 860, // 18:10 (9.167 hours from 9:00)
    width: 148, // 1h 35min duration
    top: 300,
    height: 59,
    code: '373AS7',
    teacher: 'Audiovizuální seminář',
    room: 'LAZ-124',
    time: '18:10 - 19:45',
    color: '#CCEEFF',
    note: 'Lichý týden',
    weeks: 'Týdny: 1, 3, 5, 7, 9, 11, 13',
    link: '/subject/av',
  },
  // Čtvrtek (Ct) - row 3
  {
    day: 3,
    left: 469, // 14:00 (5 hours from 9:00)
    width: 148, // 1h 35min duration
    top: 360,
    height: 119,
    code: '373AVTE1',
    teacher: 'FABUŠ P.',
    room: 'LAZ-423',
    time: '14:00 - 15:35',
    color: '#CCEEFF',
    link: '/subject/av',
  },
  {
    day: 3,
    left: 782, // 17:20 (8.333 hours from 9:00)
    width: 227, // 2h 25min duration
    top: 360,
    height: 59,
    code: '373UI',
    teacher: 'Umělá inteligence',
    room: 'LAZ-107',
    time: '17:20 - 19:45',
    color: '#CCEEFF',
    note: 'Sudý týden',
    weeks: 'Týdny: 2, 4, 6, 8, 10, 12',
    link: '/subject/ai',
  },
];

function TimetableWidget() {
  const [selectedClass, setSelectedClass] = useState(null);
  const today = new Date().getDay();
  const todayIndex = today === 0 ? -1 : today - 1;

  // Calculate week number (ISO week)
  const getWeekNumber = (date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  };

  const currentWeek = getWeekNumber(new Date());
  const isOddWeek = currentWeek % 2 === 1;

  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-gray-900 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              📅 Týdenní rozvrh
            </h2>
            <p className="text-sm text-gray-300 mt-1">Zimní semestr 2025/26</p>
          </div>
          <div className="text-right">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold ${
              isOddWeek 
                ? 'bg-blue-500 text-white' 
                : 'bg-green-500 text-white'
            }`}>
              <span className="text-2xl">{currentWeek}</span>
              <div className="text-left">
                <div className="text-xs opacity-90">Týden</div>
                <div className="text-sm">{isOddWeek ? 'Lichý' : 'Sudý'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule - KOS Style */}
      <div className="p-6 overflow-x-auto">
        <div className="relative" style={{ minWidth: '1100px' }}>
          {/* Time axis */}
          <div className="relative" style={{ width: '1000px', height: '20px', marginLeft: '54px' }}>
            {['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'].map((time, index) => (
              <div
                key={time}
                className="absolute text-xs text-gray-600 font-mono"
                style={{
                  left: `${index * 86}px`,
                  top: '-5px',
                  width: '86px',
                  textAlign: 'center',
                }}
              >
                {time}
              </div>
            ))}
          </div>

          {/* Days labels */}
          <div className="absolute left-0 top-0" style={{ width: '50px' }}>
            {['Po', 'Ut', 'St', 'Čt', 'Pá'].map((day, index) => {
              const isToday = index === todayIndex;
              return (
                <div
                  key={day}
                  className={`flex items-center justify-center font-bold text-sm border-b border-black ${
                    isToday ? 'bg-yellow-400 text-gray-900' : 'bg-white text-gray-700'
                  }`}
                  style={{
                    height: index === 0 ? '120px' : '119px',
                    width: '50px',
                  }}
                >
                  {day}
                </div>
              );
            })}
          </div>

          {/* Main schedule grid */}
          <div
            className="relative border border-black"
            style={{
              marginLeft: '53px',
              height: '600px',
              width: '1032px',
              fontSize: '0px',
            }}
          >
            {/* Vertical time lines */}
            {[0, 86, 172, 258, 344, 430, 516, 602, 688, 774, 860, 946].map((left, index) => (
              <div
                key={`vline-${index}`}
                className="absolute"
                style={{
                  top: '0px',
                  height: '602px',
                  width: '1px',
                  left: `${left}px`,
                  backgroundColor: '#E3DFDF',
                }}
              />
            ))}

            {/* Horizontal day lines */}
            {[120, 240, 360, 480].map((top, index) => (
              <div
                key={`hline-${index}`}
                className="absolute"
                style={{
                  top: `${top}px`,
                  left: '0px',
                  width: '1032px',
                  height: '1px',
                  backgroundColor: '#E3DFDF',
                }}
              />
            ))}

            {/* Today highlight */}
            {todayIndex >= 0 && (
              <div
                className="absolute bg-yellow-50 opacity-30"
                style={{
                  top: `${todayIndex * 120}px`,
                  left: '0px',
                  width: '1032px',
                  height: todayIndex === 0 ? '120px' : '119px',
                }}
              />
            )}

            {/* Classes */}
            {CLASSES.map((classItem, index) => {
              const hasDetails = classItem.details;
              const Component = hasDetails ? 'div' : Link;
              const componentProps = hasDetails 
                ? { onClick: () => setSelectedClass(classItem) }
                : { to: classItem.link };
              
              return (
                <Component
                  key={index}
                  {...componentProps}
                  className="absolute border border-black text-center cursor-pointer hover:shadow-xl hover:scale-105 transition-all"
                  style={{
                    position: 'absolute',
                    top: `${classItem.top}px`,
                    left: `${classItem.left}px`,
                    width: `${classItem.width}px`,
                    height: `${classItem.height}px`,
                    backgroundColor: classItem.color,
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    color: '#000000',
                    fontSize: '11px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <div className="p-2">
                    <div className="font-bold">{classItem.code}</div>
                    {classItem.note && (
                      <div className="text-xs font-bold">- {classItem.note} -</div>
                    )}
                    <div className="mt-1">{classItem.teacher}</div>
                    <div className="mt-1">{classItem.room} /</div>
                    <div className="mt-1">{classItem.time}</div>
                    {classItem.weeks && (
                      <div className="text-xs mt-1 italic">{classItem.weeks}</div>
                    )}
                  </div>
                </Component>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 border border-black p-3" style={{ width: '1085px', marginLeft: '53px' }}>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4 text-xs">
                <span className="font-bold">Legenda:</span>
                <div className="flex items-center gap-2">
                  <span>Přednáška:</span>
                  <div className="w-8 h-4 border border-black" style={{ backgroundColor: '#DDEEFF' }}></div>
                </div>
                <div className="flex items-center gap-2">
                  <span>Cvičení:</span>
                  <div className="w-8 h-4 border border-black" style={{ backgroundColor: '#CCCCCC' }}></div>
                </div>
              </div>
              <div className="text-xs text-gray-600">
                <span className="font-semibold">Poznámka:</span> Předměty s označením "Lichý týden" probíhají v lichých týdnech (1, 3, 5...), předměty s označením "Sudý týden" v sudých týdnech (2, 4, 6...)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for class details */}
      {selectedClass && selectedClass.details && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedClass(null)}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 rounded-t-xl">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedClass.details.fullName}</h2>
                  <p className="text-gray-300 text-sm">Kód předmětu: {selectedClass.code}</p>
                </div>
                <button
                  onClick={() => setSelectedClass(null)}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Basic Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                  <div className="text-sm text-blue-600 font-semibold mb-1">Způsob zakončení</div>
                  <div className="text-2xl font-bold text-gray-900">{selectedClass.details.completion}</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                  <div className="text-sm text-green-600 font-semibold mb-1">Počet kreditů</div>
                  <div className="text-2xl font-bold text-gray-900">{selectedClass.details.credits}</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
                  <div className="text-sm text-purple-600 font-semibold mb-1">Rozsah</div>
                  <div className="text-2xl font-bold text-gray-900">{selectedClass.details.scope}</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-200">
                  <div className="text-sm text-orange-600 font-semibold mb-1">Jazyk výuky</div>
                  <div className="text-2xl font-bold text-gray-900">{selectedClass.details.language}</div>
                </div>
              </div>

              {/* Department */}
              <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                <div className="text-sm text-gray-600 font-semibold mb-2">Katedra</div>
                <div className="text-lg font-bold text-gray-900">{selectedClass.details.department}</div>
              </div>

              {/* Teacher & Schedule */}
              <div className="bg-indigo-50 rounded-lg p-4 border-2 border-indigo-200">
                <div className="text-sm text-indigo-600 font-semibold mb-2">Vyučující & Rozvrh</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">Vyučující:</span>
                    <span className="text-gray-900">{selectedClass.teacher}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">Místnost:</span>
                    <span className="text-gray-900">{selectedClass.room}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">Čas:</span>
                    <span className="text-gray-900">{selectedClass.time}</span>
                  </div>
                </div>
              </div>

              {/* Capacity */}
              <div className="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-200">
                <div className="text-sm text-yellow-600 font-semibold mb-2">Kapacita</div>
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-3xl font-bold text-gray-900">{selectedClass.details.enrolled}</span>
                    <span className="text-gray-600 text-lg"> / {selectedClass.details.capacity}</span>
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className="bg-yellow-500 h-4 rounded-full transition-all"
                        style={{ width: `${(selectedClass.details.enrolled / selectedClass.details.capacity) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {Math.round((selectedClass.details.enrolled / selectedClass.details.capacity) * 100)}% obsazeno
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TimetableWidget;
