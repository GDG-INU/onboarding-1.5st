// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Main from './pages/Main';
import About from './pages/About';
import UserHome from './pages/UserHome';
import Write from './pages/Write';
import ArticlePage from './pages/Article';
import Settings from './pages/Setting';

function App() {
  return (
    <div className="flex flex-col">
      <TopBar />
      <div className=" flex justify-center w-full mt-16">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/userhome" element={<UserHome />} />
          <Route path="/Write" element={<Write />} />
          <Route path="/Article" element={<ArticlePage />} />
          <Route path="Settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
