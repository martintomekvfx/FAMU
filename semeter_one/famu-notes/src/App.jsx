import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SubjectPage from './pages/SubjectPage';
import ClassPage from './pages/ClassPage';

function App() {
  return (
    <Router basename="/FAMU">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subject/:subjectId" element={<SubjectPage />} />
        <Route path="/subject/:subjectId/class/:classId" element={<ClassPage />} />
      </Routes>
    </Router>
  );
}

export default App;
