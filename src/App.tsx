import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Welcome } from './pages/Welcome';
import { Home } from './pages/Home';
import { MenuCategory } from './pages/MenuCategory';
import { ProductDetail } from './pages/ProductDetail';
import { Search } from './pages/Search';
import { Specials } from './pages/Specials';
import { Combos } from './pages/Combos';
import { Info } from './pages/Info';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { MenuProvider } from './context/MenuContext';

// Admin imports
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminItemForm } from './pages/admin/AdminItemForm';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const hideHeaderPaths = ['/product', '/search', '/specials', '/combos', '/info', '/admin'];
  const hideBottomNavPaths = ['/product', '/admin'];
  
  const hideHeader = location.pathname === '/' || hideHeaderPaths.some(path => location.pathname.startsWith(path));
  const hideBottomNav = location.pathname === '/' || hideBottomNavPaths.some(path => location.pathname.startsWith(path));

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans relative overflow-hidden w-full">
      {!hideHeader && <Header />}
      <main className="flex-1 w-full overflow-y-auto">
        {children}
      </main>
      {!hideBottomNav && <BottomNav />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MenuProvider>
        <div className="bg-background min-h-screen flex w-full">
          <Layout>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/menu" element={<Home />} />
              <Route path="/menu/:categoryId" element={<MenuCategory />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/search" element={<Search />} />
              <Route path="/specials" element={<Specials />} />
              <Route path="/combos" element={<Combos />} />
              <Route path="/info" element={<Info />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/items/new" element={<AdminItemForm />} />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </div>
      </MenuProvider>
    </BrowserRouter>
  );
};

export default App;