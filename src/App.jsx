import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/list';
import Detail from './pages/detail';
import Nav from './Navbar/Nav';
import { TeamProvider } from './context/TeamContext';
import Team from './pages/team';
import TeamDetail from './pages/teamDetail';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <TeamProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/detail/:id" element={<Detail />} /> {/* ✅ aangepast */}
          <Route path="/teams" element={<Team />} />
          <Route path="/teams/:id" element={<TeamDetail />} />
        </Routes>
      </TeamProvider>
    </BrowserRouter>
  );
}

export default App;
