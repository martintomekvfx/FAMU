import { Link } from 'react-router-dom';

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
    teacher: 'TBA',
    room: 'TBA',
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
    teacher: 'RADAKULAN V.',
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
  },
  {
    day: 2,
    left: 860, // 18:10 (9.167 hours from 9:00)
    width: 148, // 1h 35min duration
    top: 300,
    height: 59,
    code: '373AS7',
    teacher: 'KLAJBANOVÁ N.',
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
    teacher: 'MALEČKOVÁ D.',
    room: 'LAZ-107',
    time: '17:20 - 19:45',
    color: '#CCEEFF',
    note: 'Sudý týden',
    weeks: 'Týdny: 2, 4, 6, 8, 10, 12',
    link: '/subject/ai',
  },
];

function TimetableWidget() {
  const today = new Date().getDay();
  const todayIndex = today === 0 ? -1 : today - 1;

  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-gray-900 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          📅 Týdenní rozvrh
        </h2>
        <p className="text-sm text-gray-300 mt-1">Zimní semestr 2025/26</p>
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
            {CLASSES.map((classItem, index) => (
              <Link
                key={index}
                to={classItem.link}
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
              </Link>
            ))}
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
    </div>
  );
}

export default TimetableWidget;
