import Layout from './components/layouts/Layout';
import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/Home';
import CurrenciesPage from './pages/Currencies';
import TagsPage from './pages/Tags';
import FavoritesPage from './pages/Favorites';


function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' exact element={<HomePage />}></Route>
        <Route path='/currencies' exact element={<CurrenciesPage />}></Route>
        <Route path='/tags' exact element={<TagsPage />}></Route>
        <Route path='/savings/favorites' exact element={<FavoritesPage />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
