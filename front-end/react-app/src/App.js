import Layout from './components/layouts/Layout';
import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/Home';
import SavingsPage from './pages/Savings';
import CurrenciesPage from './pages/Currencies';
import TagsPage from './pages/Tags';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' exact element={<HomePage />}></Route>
        <Route path='/savings' exact element={<SavingsPage />}></Route>
        <Route path='/currencies' exact element={<CurrenciesPage />}></Route>
        <Route path='/tags' exact element={<TagsPage />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
