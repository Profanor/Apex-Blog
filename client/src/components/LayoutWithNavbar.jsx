import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const LayoutWithNavbar = ({ searchQuery, setSearchQuery }) => (
  <>
    <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    <Outlet />
  </>
);

export default LayoutWithNavbar;
