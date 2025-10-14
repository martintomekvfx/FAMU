import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import BeerButton from './components/BeerButton';
import Home from './pages/Home';
import SubjectPage from './pages/SubjectPage';
import ClassPage from './pages/ClassPage';
import ChatPage from './pages/ChatPage';
import TimetablePage from './pages/TimetablePage';
import CalendarPage from './pages/CalendarPage';
import DeadlinePage from './pages/DeadlinePage';
import GamePage from './pages/GamePage';
import BulletinBoardPage from './pages/BulletinBoardPage';
import MindMapPage from './pages/MindMapPage';

function App() {
  return (
    <Router basename="/FAMU">
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 lg:ml-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bulletin-board" element={<BulletinBoardPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/timetable" element={<TimetablePage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/deadlines" element={<DeadlinePage />} />
            <Route path="/secret-game" element={<GamePage />} />
            <Route path="/subject/:subjectId" element={<SubjectPage />} />
            <Route path="/subject/:subjectId/mindmap" element={<MindMapPage />} />
            <Route path="/subject/:subjectId/class/:classId" element={<ClassPage />} />
          </Routes>
        </main>
        <BeerButton />
      </div>
    </Router>
  );
}

export default App;
