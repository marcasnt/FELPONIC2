import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import BackgroundPattern from './BackgroundPattern';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-[#0A1128] to-black" role="main">
      <BackgroundPattern />
      <Navbar />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;