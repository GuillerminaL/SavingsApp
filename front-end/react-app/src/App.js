import { Route, Routes, Navigate } from 'react-router-dom';

import Layout from './components/layouts/Layout';
import LoginLayout from './components/layouts/LoginLayout';
import HomePage from './pages/Home';
import SavingsPage from './pages/Savings';
import CurrenciesPage from './pages/Currencies';
import TagsPage from './pages/Tags';

function App() {
  return (
    <Routes>
      <Route path="/login" exact element={<LoginLayout/>}></Route>
      <Route path='/home' exact element={<Layout><HomePage /></Layout>}></Route>
      <Route path='/savings' exact element={<Layout><SavingsPage /></Layout>}></Route>
      <Route path='/currencies' exact element={<Layout><CurrenciesPage /></Layout>}></Route>
      <Route path='/tags' exact element={<Layout><TagsPage /></Layout>}></Route>
      <Route path='*' exact element={<Layout><HomePage /></Layout>}></Route>
    </Routes>
  );
}

export default App;
