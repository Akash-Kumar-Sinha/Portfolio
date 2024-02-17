import { useState, useMemo } from 'react';
import { PiCirclesThreePlusLight } from 'react-icons/pi';
import MobileSidebar from '../SideBar/MobileBar/MobileSidebar';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useMemo(() => () => {
    setMenuOpen(!menuOpen);
  }, [menuOpen]);

  return (
    <>
      <div className='hidden lg:block lg:py-2 lg:pl-4 tracking-wider'>
        Akash Kumar Sinha | Mern Stack Developer
        <hr className="relative w-full h-1 border bg-gradient-to-r lineColor" />

      </div>

      <div className={`relative lg:hidden flex w-full py-3 pb-2 lg:pl-4 pl-2 gap-4 tracking-wider`}>
        <button className='absolute p-0 z-10' onClick={toggleMenu}>
          <PiCirclesThreePlusLight size={28}/>
          
        </button>
        <hr className="relative w-full h-1 border bg-gradient-to-r mt-8 lineColor" />
        {menuOpen&& <MobileSidebar/>}
      </div>
    </>
  );
};

export default Header;
