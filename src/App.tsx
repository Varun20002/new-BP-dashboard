import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import AllUsers from './pages/AllUsers';
import Earnings from './pages/Earnings';
import Marketing from './pages/Marketing';
import Terminal from './pages/Terminal';
import ClientView from './pages/ClientView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<AllUsers />} />
          <Route path="earnings" element={<Earnings />} />
          <Route path="marketing" element={<Marketing />} />
          <Route path="terminal" element={<Terminal />} />
          <Route path="client-view/:id" element={<ClientView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
