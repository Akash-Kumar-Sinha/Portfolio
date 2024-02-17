import React from 'react';
import DesktopSidebar from './SideBar/DesktopSidebar/DesktopSidebar';
import Header from './Header/Header';

const Home = () => {
  return (
    <div>
      <Header/>
        <DesktopSidebar/>
      <div className="lg:ml-32 border border-black p-2 m-2 h-full">
        name akash Kumar Sinha
      </div>
    </div>
  );
}

export default Home;
