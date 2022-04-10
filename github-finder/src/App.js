import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import { GithubProvider } from './context/github/GithubContext';
import UserSearch from './components/users/UserSearch';
import User from './components/users/User';

function App() {
  return (
    <GithubProvider>
      <div className=''>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<UserSearch />} />
          <Route path="/users/:login" element={<User />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </GithubProvider>
  );
}

export default App;
