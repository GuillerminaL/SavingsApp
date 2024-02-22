import Layout from './components/layouts/Layout';
import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/Home';
import AllSavingsPage from './pages/AllSavings';
import NewSavingPage from './pages/NewSaving';
import FavoritesPage from './pages/Favorites';
import CurrencyDetailPage from './pages/CurrencyDetail';



function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' exact element={<HomePage />}></Route>
        <Route path='/savings' exact element={<AllSavingsPage />}></Route>
        <Route path='/savings/add' exact element={<NewSavingPage />}></Route>
        <Route path='/savings/favorites' exact element={<FavoritesPage />}></Route>
        <Route path='/currencyDetail' exact element={<CurrencyDetailPage />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
