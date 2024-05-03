import { Route, Routes } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';

import Layout from './components/layouts/Layout';
import AccessLayout from './components/layouts/AccessLayout';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import SavingsPage from './pages/Savings';
import CurrenciesPage from './pages/Currencies';
import TagsPage from './pages/Tags';
import Error404 from './pages/Error404';

function App() {
  return (
     <Routes>
        <Route path='/' exact element={<AccessLayout><RegisterPage /></AccessLayout>}></Route>
        <Route path='/register' exact element={<AccessLayout><RegisterPage /></AccessLayout>}></Route>
        <Route path='/login' exact element={<AccessLayout><LoginPage /></AccessLayout>}></Route>
        <Route path='/home' exact element={<Layout><HomePage /></Layout>}></Route>
        <Route path='/savings' exact element={<Layout><SavingsPage /></Layout>}></Route>
        <Route path='/currencies' exact element={<Layout><CurrenciesPage /></Layout>}></Route>
        <Route path='/tags' exact element={<Layout><TagsPage /></Layout>}></Route>
        <Route path='*' exact element={<Layout><Error404 /></Layout>}></Route>
      </Routes>
  );
}

export default App;
