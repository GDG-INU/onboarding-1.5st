// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <>
      <TopBar />
      <div className=" flex justify-center w-full mt-20">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* 추후 / (홈), /about, /contact 등 추가 가능 */}
        </Routes>
      </div>
    </>
  );
}

export default App;
